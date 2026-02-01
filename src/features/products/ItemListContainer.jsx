import { useState } from 'react';
import ItemList from './components/ItemList'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import ItemListContainerLoading from './components/ItemListContainerLoading';
import { getProductByCategory, getProducts } from '../../firebase/db';

const ItemListContainer = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const executeFecth = async () => {
      setLoading(true);
      if (slug) {
        getProductByCategory(slug).then((products) => {
          setProducts(products);
          setLoading(false);
        })
      } else {
        getProducts(slug).then((products) => {
          setProducts(products);
          setLoading(false);
        })
      }
    }
    executeFecth();

  }, [slug])

  if (loading) {
    return <ItemListContainerLoading />
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
        <p className="text-gray-500">{slug && `Productos de la categoria ${slug}`}</p>
      </div>

      <ItemList products={products} isLoading={loading} />
    </div>
  );
}

export default ItemListContainer;
