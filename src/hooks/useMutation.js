import { useState } from 'react'
import { toast } from 'react-toastify'
import { useMyContext } from '../context/store'

const useMutation = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  // #21 (2)
  const { setRefetching } = useMyContext() // gọi Mycontext nhận dữ liệu cần

  // xử lý các req đến sever
  const mutate = (callback) => {

    // Trước khi gửi req lên sever
    // đổi trạng thái Loading true > chạy. Khi sever res thì đổi thành false > Tắt
    setLoading(true)

    // Dùng callback đại diện cho các hàm(thêm, sửa) để req sever
    callback()
      .then((res) => {
        setData(res.data);
        toast.success("Success!");
        setRefetching(prev => !prev) // khi req đến sever thành công set lại thành true ngược lại false -> dựa vào đó request lại cái dữ liệu
      })

      // thất bại
      .catch((err) => {
        setError(err.response.data.msg);
        toast.error(err.response.data.msg);
      })

      // phản hồi từ sever
      .finally(() => {
        setLoading(false); // đổi Loading: false
      });

  }

  return { mutate, data, loading, error }
}

export default useMutation