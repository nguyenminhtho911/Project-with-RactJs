import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";

const Search = () => {
  const { value } = useParams();
  // console.log(useParams()) // Object {value: "aopolo"} get value nhập vào từ input lên URL của SearchForm push lên
  const [products, setProducts] = useState([]);

  //#12 (2)
  const { sort } = useMyContext();

  // Chức năng <Load more>
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [stop, setStop] = useState(false);

  const { data, loading, error } = useQuery(
    `/products?search=${value}&sort=${sort}&limit=${limit}&page=${page}`
  ); // link lấy từ api. value get từ url qua useParams()

  // useEffect(() => {
  //   if(data?.products) setProducts(data.products)
  // }, [data?.products])

  // Load more
  useEffect(() => {
    if (data?.products) {
      setProducts((prev) => [...prev, ...data.products]);
      if (data.products.length < limit) setStop(true);
    }
  }, [data?.products, limit]);

  // data?.products: data là undefined -> ko đọc property products. Sau khi data có giá trị mới lấy


  // Khắc phục lỗi ghi trùng vào sản phẩm cũ khi sắp xếp
  useEffect(() => {
    setProducts([])
    setPage(1)
    setStop(false)
  }, [value, sort]) // khi value, sort thay đổi(value khi tìm, sort khi lọc) thì gán các state = giá trị ban đầu

  return (
    <>
      <Sorting />
      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      <button
        className="btn-load_more"
        onClick={() => setPage((prev) => prev + 1)}
        disabled={stop}
      >
        Load more
      </button>
    </>
  );
};

export default Search;
