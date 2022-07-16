import React,  { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// let count = 0;

const FilterForm = () => {
  // const ref = useRef(0)
  const inputRef = useRef()
  const selectRef = useRef('lt')

  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = inputRef.current.value;
    const option = selectRef.current.value;
    if(!value.trim()) return;
    return navigate(`/filter/${option}/${value}`)
  }

  return (
    <div className='filter_form' title='Enter to filter'>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text"
          placeholder="0" required
          ref={inputRef}
          />

          <select ref={selectRef}>
            <option value="lt" title='nhỏ hơn'>nhỏ hơn</option>
            <option value="lte" title='nhỏ hơn hoặc bằng'>nhỏ hơn hoặc bằng</option>
            <option value="gt" title='lớn hơn'>lớn hơn</option>
            <option value="gte" title='lớn hơn hoặc bằng'>lớn hơn hoặc bằng</option>
          </select>
        </div>
        <button>Lọc</button>
      </form>
      
    </div>
  )
}

export default FilterForm