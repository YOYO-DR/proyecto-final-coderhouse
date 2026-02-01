import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import ItemCounter from "../../../components/ItemCounter";

const CartItem = ({ item, removeItem }) => {
  const { updateQuantity } = useContext(CartContext);

  return (
    <div className="flex bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
        <img 
          src={item.url} 
          alt={item.name} 
          className="w-full h-full object-cover mix-blend-multiply" 
        />
      </div>
      <div className="ml-4 flex-grow flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
            <div className="mt-2">
              <ItemCounter 
                max={item.stock || 100} // Usar stock si existe, sino un default
                count={item.quantity}
                setCount={(newCount) => updateQuantity(item.id, newCount)}
              />
            </div>
          </div>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
          >
            Eliminar
          </button>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-gray-900 font-bold">${item.price * item.quantity}</span>
          <span className="text-gray-400 text-xs">${item.price} c/u</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
