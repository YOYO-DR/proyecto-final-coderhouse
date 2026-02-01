import { useState } from 'react';
import { Link } from 'react-router';

const CheckoutView = ({ cartItems, getTotalPrice, onCreateOrder, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== formData.emailConfirm) {
      alert("Los correos electrónicos no coinciden");
      return;
    }
    onCreateOrder(formData);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No hay productos para procesar</h2>
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Formulario de Datos */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Datos de Envío</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Ej: Juan Pérez"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="emailConfirm" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Email</label>
                <input
                  type="email"
                  id="emailConfirm"
                  name="emailConfirm"
                  required
                  value={formData.emailConfirm}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Repite tu email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="+54 11 1234 5678"
              />
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                disabled={isLoading}
              >
                {isLoading ? 'Procesando...' : 'Confirmar y Crear Orden'}
              </button>
            </div>
          </form>
        </div>

        {/* Resumen de Productos */}
        <div className="bg-gray-50 p-8 rounded-2xl h-fit border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>
          
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 border border-gray-100 overflow-hidden">
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover p-1" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-gray-500 text-xs">Cant: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-600 font-medium">
              <span>Subtotal</span>
              <span>${getTotalPrice()}</span>
            </div>
            <div className="flex justify-between font-extrabold text-2xl text-gray-900 pt-2">
              <span>Total</span>
              <span>${getTotalPrice()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
