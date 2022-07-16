import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useQuery from '../hooks/useQuery'
import Products from '../components/Products'

const Filter = () => {
  const { option, value } = useParams()
  const [products, setProducts] = useState([])

  const { 
    data, loading, error 
  } = useQuery(`products?price[${option}]=${value}`)

  useEffect(() => {
    if(data?.products) setProducts(data.products)
  }, [data?.products])

  return (
    <>
      <Products products={products} />
      { loading && <h2>Loading...</h2> }
      { error && <h2>{error}</h2> }
    </>
  )
}

export default Filter