import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ItemDetail from "./components/ItemDetail"
import ItemDetailLoading from "./components/ItemDetailLoading"
import { getProductById } from "../../firebase/db";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id).then((product) => {
      setProduct(product);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <ItemDetailLoading />;
  }

  return (
    <ItemDetail product={product} />
  )
}

export default ItemDetailContainer;