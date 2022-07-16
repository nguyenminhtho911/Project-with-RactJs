import React from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import useQuery from "../hooks/useQuery";

const ProductDetail = () => {
  const { id } = useParams(); // {id="288772_value_động",....... } -> có id `req` sever lấy product về
  const { data: product, loading, error } = useQuery(`/products/${id}`, { saveCache: true } )// bật cache lên);

  return (
    <main>
      {product && <ProductInfo product={product} />}
      {loading && <h2>Loading...</h2>} {/* đang loading */}
      {error && <h2>{error}</h2>}
    </main>
  );
};

export default ProductDetail;
