import NavbarContainer from './features/layout/components/NavBar/NavbarContainer'
import ItemListContainer from './features/products/ItemListContainer'
import ItemDetailContainer from './features/detail_product/ItemDetailContainer'
import { BrowserRouter, Routes, Route } from 'react-router'
import NotFoundContainer from './components/NotFoundContainer'
import CartContainer from './features/cart/CartContainer'
import CheckoutContainer from './features/checkout/CheckoutContainer'

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <NavbarContainer />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/categories/:slug' element={<ItemListContainer />} />
        <Route path='/cart' element={<CartContainer />} />
        <Route path='/checkout' element={<CheckoutContainer />} />
        <Route path='/product/:id' element={<ItemDetailContainer />} />
        <Route path='*' element={<NotFoundContainer />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  )
}

export default App

