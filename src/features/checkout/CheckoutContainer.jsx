import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutView from "./components/CheckoutView";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { createOrder } from "../../firebase/db";
import { useState } from "react";

const CheckoutContainer = () => {
  const { cartItems, clearCart, getTotalPrice } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateOrder = (buyerData) => {
    setIsLoading(true);
    const order = {
      email: buyerData.email,
      name: buyerData.name,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: getTotalPrice(),
      date: new Date().toISOString(),
    };

    createOrder(order).then((orderId) =>{
      toast.success(
        `¡Gracias ${buyerData.name}! Tu orden '${orderId}' ha sido creada con éxito.`,
        {
          duration: 5000,
          icon: "🚀",
        },
      );
      clearCart();
      navigate("/");

    }).finally(() => setIsLoading(false));
  };

  return (
    <CheckoutView
      cartItems={cartItems}
      getTotalPrice={getTotalPrice}
      onCreateOrder={handleCreateOrder}
      isLoading={isLoading}
    />
  );
};

export default CheckoutContainer;
