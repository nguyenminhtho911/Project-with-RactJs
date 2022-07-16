import React, { useRef } from 'react'
import ProductsCard from './ProductsCard'

const Products = React.memo(({ products }) => {
  // const ref = useRef(0) // kiểm tra số lần render

  return (
    <div className='products'>
      {/* <h2>Render: {ref.current++}</h2> */}

      {
        products.map(product => (
          <ProductsCard key={product._id} product={product} />
        ))
      }
    </div>
  )
})

export default Products