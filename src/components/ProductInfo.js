import React, {useMemo} from 'react'

const ProductInfo = ({ product }) => {

    // format Price to VNĐ
    const priceVnd = useMemo( () => {
      const price = product.price
      return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
    }, [product.price])

  return (
    <div className='product_info'>
      <img src={product.image} alt={product.image} />
      <div className='box'>
        <h2>{product.title}</h2>
        {/* <h3>${product.price}</h3> */}
        <h3>{priceVnd}</h3>
        <p>{product.description}</p>
        <h4>Category: {product.category}</h4>
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export default ProductInfo