import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Modal from './Modal'
import ProductForm from './ProductForm'
import axios from "axios";
import useMutation from "../hooks/useMutation";

const ProductsCard = ({ product }) => {
  const [openProduct, setOpenProduct] = useState(false)

  // dùng useMutation nhận về loading, mutate từ sever res về
  const {mutate, loadding} = useMutation()

  // ---- DELETE ----
  const handleDelete = (id) => {
    if(window.confirm("Bạn có muốn xóa cái này không?")){
      mutate(() => axios.delete(`products/${id}`)); // mutate là function nhận vào callback
    }
  }

  // format Price to VNĐ
  const priceVnd = useMemo( () => {
    const price = product.price
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
  }, [product.price])

  return (
    <div className="card">
      <img src={product.image} alt={product.image} />

      <div className="box">

        <h3>
          <Link to={`/products/${product._id}`}>
            <span />
            {product.title}
          </Link>
        </h3>

        {/* <h4>${product.price}</h4> */}
        <h4>{priceVnd}</h4>

        <div className="btn_div">
          <button className="btn_edit" 
            onClick={() => setOpenProduct(true)}
            disabled={loadding}>
            { loadding ? "loadding" : "Sửa"}
          </button>

          <button className="btn_delete" 
            onClick={() => handleDelete(product._id)}
            disabled={loadding}>
            { loadding ? "loadding" : "Xóa"}
          </button>
        </div>

      </div>

      {/*--------------- Product Form--------- */}
      {openProduct && (
        <Modal titleTxt="Cập nhật Sản phẩm" setOpen={setOpenProduct}>
          <ProductForm btnTxt="Cập nhật" data={product} />
        </Modal>
      )}
    </div>
  );
};

export default ProductsCard;
