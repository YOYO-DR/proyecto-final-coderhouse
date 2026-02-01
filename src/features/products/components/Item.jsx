import { Link } from 'react-router';

const Item = ({ product }) => {
  
  console.log(product);

  return (
    <div
      className="flex bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="w-1/3 bg-gray-50">
        <img
          src={product.url}
          alt={product.name}
          className="w-full object-cover mix-blend-multiply p-4"
        />
      </div>

      {/* Content Container */}
      <div className="w-2/3 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
          </div>
          <p className="text-gray-500 text-sm mt-1 pr-4">
            {product.description}
          </p>
        </div>

        <div className="flex items-center mt-4 text-sm">
          <span className="text-gray-500">Rating: <span className="text-gray-700">{product.rating}</span></span>
          <span className="ml-auto font-bold text-lg text-gray-900">{product.price}$</span>
        </div>
        <Link to={`/product/${product.id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 w-50">
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}

export default Item;