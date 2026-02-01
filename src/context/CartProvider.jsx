import { CartContext } from "./CartContext";
import { useState } from "react";
import toast from "react-hot-toast";

const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState([]);

  const getQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  const addItem = (item, quantity) => {
    // Validar si el item ya está en el carrito
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex >= 0) {
      // Actualizar la cantidad del item existente
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Agregar el nuevo item al carrito
      setCartItems([...cartItems, { ...item, quantity }]);
    }
    toast(`${quantity} ${item.name} agregado(s) al carrito.`);
  }

  const removeItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  const clearCart = () => {
    setCartItems([]);
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  }

  return (
    <CartContext.Provider value={{ getQuantity, addItem, removeItem, updateQuantity, clearCart, getTotalPrice, isInCart, cartItems }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;