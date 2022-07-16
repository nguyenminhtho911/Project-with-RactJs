import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMyContext } from "../context/store";

// sửa cache để seting dễ dàng hơn
const DEFAULT_OPTION = { 
  sizeCache: 100,
  saveCache: false, // mặc định tắt cache
  //refetchInterval: 1000 // khi mạng yếu mà người dùng click spam làm sever fetching data ko kịp -> sẽ hiện thị ra chậm => viết hàm khắc phục nếu click quá nhanh thì chỉ fetching data trang cuối
}

const useQuery = (url, opt) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const option = {...DEFAULT_OPTION, ...opt}

  // * cache (1-2)
  const { cache } = useMyContext()

  // kiểm tra Clear cache
  const clearCache = useCallback(() => {
    // console.log('render clearChace')
    if(Object.keys(cache.current).length >= option.sizeCache)
    return cache.current = {}
  }, [cache, option.sizeCache]);

  // clearCache() -> Cách gọi hàm trong javascript thế này ko TỐI ƯU. Vì mỗi lần comp render hàm sẽ bị gọi lại
  // Trong React thường sẽ dùng useEffect or useMemo nhưng cần [deps] mà nó mỗi lần render lại khác nhau nên hàm vẫn bị gọi như trên.
  // ==> Dùng useCallBack() bọc hàm lại để khắc phục. -> Gọi useCallback() thì mới chạy
  
  useEffect(() => {
    clearCache()
  }, [clearCache, url])
  // cho [deps] là url để mỗi khi chuyển trang sẽ chạy lại hàm useCallback


  // fetching data từ sever
  useEffect(() => {
    let here = true;

    // * cache (3) 
    // Kiểm tra biến cache có dữ liệu mà chúng ta cần chưa.
    // Nếu có -> return setData() -> Đoạn phía dưới axios fetch data sẽ ko chạy nữa
    if(cache.current[url]) {
      setData(cache.current[url]) 
      // bỏ return -> khi mạng chậm lấy dữ liệu cũ trong cache ra -> tiếp tục chạy axios fetch data bên dưới và cập nhật lại dữ liệu mới (chạy ngầm: nên cập nhật chậm hơn 1 chút)
    }

    if(!cache.current[url]) setLoading(true); 
    // Nếu đang lấy dữ liệu từ cache thì ko hiện loading ra nữa (cảm giác người thấy dữ liệu load tức thời)

    // * Khắc phục click spam


    axios
      .get(url)
      .then((res) => {
        if (!here) return; // true thì setData
        setData(res.data);
        
        // Nếu option.saveCache là true thì bật lưu cache lên
        if (option.saveCache) {
          // * cache (2)
          cache.current[url] = res.data; 
          // cache là object nên lưu trữ kiểu key/value (key là url, value là dữ liệu nhận từ sever)
        }
        
      })
      .catch((err) => {
        if (!here) return; // false thì setError
        setError(err.response.data.msg);
        toast.error(err.response.data.msg);
      })
      // res từ sever
      .finally(() => {
        if (!here) return;
        setLoading(false); // đổi thành false > tắt Loading.., khi res thành công
      });

      // Cleanup function
      return () => {
        here = false;
      }

  }, [url, cache, option.saveCache, option.refetching,  option.setRefetching]);
  return { data, loading, error }; // trả ra các biến để sử dụng
};

export default useQuery;


// Khắc phục lỗi người dùng click spam, gửi yêu cầu lên sever quá nhanh
// const delayFetchData = setTimeout(() => {
//   fetchData(url, here) // code axios fetch data ở đây
// }, cache.current[url] ? option.refetchInterval : 0)
//............
// cleanup function
// clearTimeout(delayDebounce)
