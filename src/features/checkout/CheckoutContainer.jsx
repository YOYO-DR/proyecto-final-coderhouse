import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutView from "./components/CheckoutView";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CheckoutContainer = () => {
  const { cartItems, clearCart, getTotalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCreateOrder = (buyerData) => {
    // Aquí es donde usualmente iría la lógica de Firebase
    const order = {
      email: buyerData.email,
      name: buyerData.name,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
     , 
      total: getTotalPrice(),
      date: new Date().toISOString()
    };
    
    console.log("Orden procesada:", order);
    
    // Simulación de éxito
    toast.success(`¡Gracias ${buyerData.name}! Tu orden ha sido creada con éxito.`, {
        duration: 5000,
        icon: '🚀',
    });
    
    clearCart();
    navigate('/');
  };

  return (
    <CheckoutView 
      cartItems={cartItems} 
      getTotalPrice={getTotalPrice}
      onCreateOrder={handleCreateOrder}
    />
  );
};

export default CheckoutContainer;
