import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const CartWidget = () => {
  // usar el contexto del carrito para obtener la cantidad de items
  const { getQuantity } = useContext(CartContext);
  const quantity = getQuantity();

  return (
    <Link to="/cart" className="relative flex items-center text-gray-400 hover:text-white">
      <ShoppingCartIcon className="size-6" />
      {quantity > 0 && (
        <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-blue-600 rounded-full">
          {quantity}
        </span>
      )}
    </Link>
  )
}

export default CartWidget
