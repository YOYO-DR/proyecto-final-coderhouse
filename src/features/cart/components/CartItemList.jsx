import CartItem from "./CartItem";

const CartItemList = ({ cartItems, removeItem, clearCart }) => {
  return (
    <div className="lg:col-span-2 space-y-4">
      {cartItems.map((item) => (
        <CartItem 
          key={item.id} 
          item={item} 
          removeItem={removeItem} 
        />
      ))}
      
      <button 
        onClick={clearCart}
        className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
      >
        Vaciar Carrito
      </button>
    </div>
  );
};

export default CartItemList;
