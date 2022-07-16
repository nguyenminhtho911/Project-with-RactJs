import { useMemo, useRef } from "react";
import Pagination from '../components/Pagination'
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import useQuery from "../hooks/useQuery";
import { useMyContext } from "../context/store";

const Home = () => {
  // const [products, setProducts] = useState([]);

  // const [limit, setLimit] = useState(5); ko dùng useState nữa thì ko cần setLimit tại giá trị này
  const limit = 5;
  

  // const ref = useRef(0) // kiểm tra số lần render

  const { page, sort, refetching } = useMyContext() // khai báo nhận vào context value từ Store truyền xuống

  // Thực hiện req lền sever
  const { data, loading, error } = useQuery(
    `/products?limit=${limit}&page=${page}&sort=${sort}`,
    { saveCache: true, refetching } // bật cache lên,  #21 đổi refetching true/false thì cập nhật dữ liệu
  ); // - Sửa đường dẫn tạo phân trang limit=so_san_pham_trong_1_trang, page=so_page_hien_tai
  // - Thêm sort vào url -> chạy chức năng sắp xếp


  // useEffect(() => {
  //   if (data?.products) setProducts(data?.products);
  //   // ban đầu data undefine -> ko đọc products. Sau khi data có giá trị -> setProducts
  // }, [data?.products]);

  const products = useMemo(() => { // Thay cho useEffect ở trên tối ưu component
    if (!data?.products) return [] // nếu ko tồn tại trả về []. Vì useMemo bắt buộc trả về giá trị
    return data?.products //ban đầu data là undefine(chưa trả data về) -> ko đọc property products. Sau khi data có giá trị mới lấy
  }, [data?.products])


  // Tính tổng page dùng useMemo
  const totalPages = useMemo(() => {
    if(!data?.count) return 0; // nếu ko tồn tại trả về 0. Vì useMemo bắt buộc trả về giá trị
    return Math.ceil(data.count / limit)
  }, [data?.count, limit])


  return (
    <div>
      {/* <h2>Render: {ref.current++}</h2> */}
      
      <Sorting page={page} />

      <Products products={products} />
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default Home;
