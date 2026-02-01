import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartView from "./components/CartView";

const CartContainer = () => {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useContext(CartContext);

  return (
    <CartView 
      cartItems={cartItems} 
      removeItem={removeItem} 
      clearCart={clearCart} 
      getTotalPrice={getTotalPrice}
    />
  );
};

export default CartContainer;
