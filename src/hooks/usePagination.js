import { useMemo } from 'react'
import { useMyContext } from '../context/store';
import useCustomRouter from './useCustomRouter';

const usePagination = (totalPages) => {
  const { page, sort } = useMyContext()

  // const navigate = useNavigate(); // hàm giúp set page trên thanh URL
  const { pushQuery } = useCustomRouter(); // chuyển useNavigate -> useCustomRouter (B12)


  const { firstArr, lastArr } = useMemo(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1); // vd: totalPages = 5 -> array=[1,2,3,4]
    // Trường hợp totalPages < 4
    if (totalPages < 4)
      return {
        firstArr: newArr,
        lastArr: []
      }

    if (totalPages - page >= 4) {
      return {
        firstArr: newArr.slice(page - 1, page + 2),
        lastArr: newArr.slice(totalPages - 1) // cắt vị trí cuối cùng của arr
      }
    } else {
      return {
        firstArr: newArr.slice(totalPages - 4, totalPages),
        lastArr: []
      }
    }
  }, [totalPages, page]);


  const isActive = (index) => {
    if (index === page) return "active";
    return "";
  };

  const prev = () => {
    const newPage = Math.max(page - 1, 1); // page - 1 > 1 => newPage = page -1,  page - 1 < 1 => newPage = 1
    // navigate(`?page=${newPage}`); (B12)
    pushQuery({ page: newPage, sort})
  };

  const next = () => {
    const newPage = Math.min(page + 1, totalPages); // page + 1 < totalPages => newPage = page + 1, page + 1 > totalPages => newPage = totalPages
    // navigate(`?page=${newPage}`);
    pushQuery({ page: newPage, sort})
  };

  const jump = (num) => {
    // navigate(`?page=${num}`);
    pushQuery({ page: num, sort })
  };

  return { firstArr, lastArr, isActive, prev, next, jump }; // xóa navigate (B12)
};

export default usePagination;