import { Link } from 'react-router';
import CartItemList from './CartItemList';

const CartView = ({ cartItems, removeItem, clearCart, getTotalPrice }) => {
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-8">Parece que aún no has agregado productos a tu carrito.</p>
        <Link 
          to="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Listado de Productos */}
        <CartItemList 
          cartItems={cartItems} 
          removeItem={removeItem} 
          clearCart={clearCart} 
        />

        {/* Resumen */}
        <div className="bg-gray-50 p-6 rounded-2xl h-fit border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${getTotalPrice()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Envío</span>
              <span className="text-green-600">Gratis</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl text-gray-900">
              <span>Total</span>
              <span>${getTotalPrice()}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            Terminar Compra
          </Link>
          <Link
            to="/"
            className="block w-full text-center text-blue-600 font-medium py-3 mt-2 hover:underline transition-all"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartView;
