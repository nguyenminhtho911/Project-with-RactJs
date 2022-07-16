import axios from "axios";
import React, { useRef } from "react";
import useMutation from "../hooks/useMutation";

const ProductForm = ({ btnTxt, data }) => {
  const multiRef = useRef(); // {current: "form"}

  const {mutate, loading} = useMutation() // B21 Dùng mutate req lên sever để lấy dữ liệu

  const handleSubmit = (e) => {
    e.preventDefault();

    const children = multiRef.current.children; // HTMLCollection(6) chứa 6 input

    // *** Convert children này thành array

    // ** Dùng forEach
    let newData = {};
    [...children].forEach((child) => {
      // loại bỏ button trong form
      if (child.name) {
        newData = { ...newData, [child.name]: child.value };
      }
    });
    //console.log(newData) // get được Oject value từ all input trong form

    // ** Dùng reduce
    // const newData = [...children].reduce((obj, child) => {
    //   if(!child.name) return obj;
    //   return {...obj, [child.name]:child.value}
    // }, {})

    if (data) {

      // --- UPDATE ---
      const newArr = {...newData, price: Number(newData.price)} 
      const result = ssDataOldNew(newArr, data)

      if (result) return; // nếu true(giống) thì thoát. flase(khác) thì gửi req put lên sever cập nhật
      
      // * mutate nhận vào callback khi dùng useMutation
      mutate(
        () => axios.put(`products/${data._id}`, newData)
      )

    } else {
      // --- POST ---
      mutate(
        () => axios.post(`products`, newData) // gửi dữ liệu này đến sever -> tạo mới 1 sản phẩm dùng phương thức post và địa chỉ api là products
      )

    }

  }; // end handlehandleSubmit

  // So sánh data cũ và data mới
  function ssDataOldNew(obj1, obj2) {
    const keys = Object.keys(obj1);

    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        return false; // khác
      }
    }
    return true; // giống
  }

  return (
    <div className="product_form">
      <form ref={multiRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Tiêu đề sản phẩm"
          required
          //   defaultValue={data ? data.title ? ''} // có 3 cách
          //   defaultValue={data && data.title}
          defaultValue={data?.title}
        />

        <input
          type="text"
          name="description"
          placeholder="Mô tả Sản phẩm"
          required
          defaultValue={data?.description}
        />

        <input
          type="text"
          name="price"
          placeholder="Giá sản phẩm"
          required
          defaultValue={data?.price}
        />

        <input
          type="text"
          name="category"
          placeholder="Danh mục sản phẩm"
          required
          defaultValue={data?.category}
        />

        <input
          type="text"
          name="image"
          placeholder="Hình ảnh sản phẩm"
          required
          defaultValue={data?.image}
        />

        <button disabled={loading}>{ loading ? "Loading..." : btnTxt }</button>
      </form>
    </div>
  );
};

export default ProductForm;
