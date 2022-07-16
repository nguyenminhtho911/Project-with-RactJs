import React, { useContext, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const Store = React.createContext(); //tạo đối tượng Context gán vào Store nhận vào giá trị là default

//gọi hook: useMyContext() thay cho useContext(Store) khi muốn lấy context 
export const useMyContext = () => useContext(Store)


// ContextProvider là React component
export const ContextProvider = ({ children }) => {
  
  const { search } = useLocation() // return object {search: link_url,....}. vd: ở đang ở &page=2 -> { search: "?page=2", .....}

  // ---- Caching #19
  const cache = useRef({}); // cache (1-1)

  // ---- #21 (1)
  const [refetching, setRefetching] = useState(false) // khởi tạo false

  //Code phân trang   và sort (#12)
  const { page, sort } = useMemo(() => {
    const page = new URLSearchParams(search).get("page") || 1; // get page trên URL. Nếu page ko tồn tại lấy mặc định là 1. Đang là dạng chuỗi
    const sort = new URLSearchParams(search).get("sort") || "-createdAt"; // get sort trên URL xuống. Nếu ko tồn tại lấy -createdAt

    return {
      page: Number(page), // Number() chuyển thành dạng number
      sort: sort,
    };
  }, [search]);

  const value = { page, sort, cache, refetching, setRefetching }
  // nhận vào context -> cung cấp context {page,sort,...} cho các comp con thông qua value={value}


  return (
    <Store.Provider value={value}>
        {children}
    </Store.Provider>
  );

};
