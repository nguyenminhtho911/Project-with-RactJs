import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"

// let count = 0; // khai báo kiểu javascript

const SearchForm = () => {
  // const ref = useRef(0); // kiểm tra render

  const inputRef = useRef(); // khai báo giá trị mặc định là: undefined

  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    //console.log(value); // {current: input}
    
    if(!value.trim()) return // ko có giá trị được nhập vào thì return
    return navigate(`/search/${value}`) // push value lên URL -> chuyển đến trang Search

  };

  return (
    <div className="search_form">
      {/* <h2>Renders: {ref.current++}</h2> Kiểm tra số lần render của 2 kiểu khai báo */}
      {/* <h2>Count: {count++}</h2> */}

      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Tìm</button>
      </form>
    </div>
  );
};

export default SearchForm;
