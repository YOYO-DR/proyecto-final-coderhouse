import { Link } from 'react-router';

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
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <div className="ml-4 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Cantidad: {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
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
          ))}
          
          <button 
            onClick={clearCart}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
          >
            Vaciar Carrito
          </button>
        </div>

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
