import ItemCounter from '../../../components/ItemCounter';
import { useState, useContext } from 'react';
import DetailReview from './DetailReview';
import { CartContext } from '../../../context/CartContext';

const ItemDetail = ({ product }) => {
  // Llamar el contexto para agregar al carrito
  const { addItem, isInCart } = useContext(CartContext);
  
  const [ itemInCart, setItemInCart ] = useState(isInCart(product.id));
  
  const {
    name,
    description,
    price,
    discount_percentage,
    rating,
    stock,

    dimensions,
    warranty,
    shipment,
    availabilityStatus,
    comments,
    returns,
    url
  } = product;

  const [seleCantidad, setSeleCantidad] = useState(1);

  const handleAgregarCarrito = () => {
    addItem(product, seleCantidad);
    setItemInCart(true);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección de Imagen */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg bg-white border border-gray-200 mb-4 p-4 flex items-center justify-center">
            <img
              src={url}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Sección de Detalles */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>

          <div className="flex items-center mb-6">
            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-yellow-700 mr-3">
              <span className="text-lg font-bold mr-1">{rating}</span>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <span className="text-sm text-gray-500 underline cursor-pointer">
              {comments ? comments.length : 0} reseñas
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-gray-900">${price}</span>
              {discount_percentage > 0 && (
                <span className="mb-1 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                  -{discount_percentage}% OFF
                </span>
              )}
            </div>
            <p className={`text-sm font-medium mt-2 ${availabilityStatus === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
              {availabilityStatus === 'In Stock' ? 'Disponible' : availabilityStatus}
              <span className="text-gray-500 font-normal ml-1">({stock} unidades)</span>
            </p>
          </div>
          {!itemInCart ? (
            <div className="mb-6 max-w-xs">
            <ItemCounter
              max={stock}
              min={1}
              count={seleCantidad}
              setCount={setSeleCantidad}
              buttonTitle={"Agregar al carrito"}
              handleButtonTitle={handleAgregarCarrito}
            />
          </div>
          ) : (
              <div className="mb-6">
                <span className="text-green-600 font-semibold">Producto agregado al carrito</span>
              </div>
          )}
          

          <p className="text-gray-700 leading-relaxed mb-8">{description}</p>

          <div className="border-t border-gray-200 pt-6 mt-auto">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Información Adicional</h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 text-sm">
              {warranty && (
                <div className="sm:col-span-1">
                  <dt className="font-medium text-gray-500">Garantía</dt>
                  <dd className="mt-1 text-gray-900">{warranty}</dd>
                </div>
              )}
              {shipment && (
                <div className="sm:col-span-1">
                  <dt className="font-medium text-gray-500">Envío</dt>
                  <dd className="mt-1 text-gray-900">{shipment}</dd>
                </div>
              )}
              {returns && (
                <div className="sm:col-span-1">
                  <dt className="font-medium text-gray-500">Devoluciones</dt>
                  <dd className="mt-1 text-gray-900">{returns}</dd>
                </div>
              )}
              {dimensions && (
                <div className="sm:col-span-1">
                  <dt className="font-medium text-gray-500">Dimensiones</dt>
                  <dd className="mt-1 text-gray-900">
                    {dimensions}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      {/* Sección de Reseñas */}
      {comments && comments.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Opiniones de los usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comments.map((review, index) => (
              <DetailReview key={index} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
