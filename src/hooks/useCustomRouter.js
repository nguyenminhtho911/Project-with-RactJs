import { useNavigate, useLocation } from "react-router-dom";

const useCustomRouter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation(); // pathname: "/"

  const pushQuery = ({ page, sort }) => {
    // nhận vào query từ Sorting.js truyền qua mỗi khi khởi tạo và gọi hàm (#12)

    // #22
    // Tạo 1 {} rỗng set điều kiện có giá trị(true) thì add {} -> mục đích loại bỏ `page` ở trang Search
    const query = {};

    if(page) query.page = page;
    if(sort) query.sort = sort;
    // console.log(query)
    
    const newQuery = new URLSearchParams(query).toString(); // nhận vào object query convert sang string
    navigate(`${pathname}?${newQuery}`) // push lên URL



  };

  return { pushQuery };
};

export default useCustomRouter;