import React from "react";
import { useMyContext } from "../context/store";
import useCustomRouter from "../hooks/useCustomRouter";

const Sorting = React.memo(({page}) => {

  const { sort } = useMyContext()

  const { pushQuery } = useCustomRouter(); //khởi tạo useCustomRouter, lấy hàm pushQuery

  const handleSort = (e) => {
    const { value } = e.target;
    pushQuery({ page, sort: value }); // gọi hàm pushQuery đến useCustomRouter

  };

  return (
    <div className="sorting">
      <select onChange={handleSort} value={sort}>
        <option value="-createdAt">Mới nhất</option>
        <option value="createdAt">Cũ nhất</option>
        <option value="-price">Giá: Cao-Thấp</option>
        <option value="price">Giá: Thấp-Cao</option>
      </select>
      <h2>&#8678;Sắp xếp</h2>
    </div>
  );
});

export default Sorting;
