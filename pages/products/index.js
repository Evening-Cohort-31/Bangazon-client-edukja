import { useEffect, useState } from 'react'
import Filter from '../../components/filter'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { ProductCard } from '../../components/product/card'
import { getCategories, getProducts } from '../../data/products'

export default function Products() {
  const [products, setProducts] = useState([])
  const [productCategories, setProductCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState("Loading products...")
  const [locations, setLocations] = useState([])
  const [ isFilter, setIsFilter] = useState(false)

  useEffect(() => {
    getProducts("order_by=-created_date").then(data => {
      if (data) {
        const locationData = [...new Set(data.map(product => product.location))]
        const locationObjects = locationData.map(location => ({
          id: location,
          name: location
        }))

        setProducts(data)
        setIsLoading(false)
        setLocations(locationObjects)
      }
    })
    .catch(err => {
      setLoadingMessage(`Unable to retrieve products. Status code ${err.message} on response.`)
    })
    getCategories().then(data => {
      if (data) {
        setProductCategories(data)
      }
    })
  }, [])

  const searchProducts = (event) => {
    getProducts(event).then(productsData => {
      if (productsData) {
        setIsFilter(true)
        setProducts(productsData)
      }
    })
  }

  const resetSearch = () => {
    setIsFilter(false)
    getProducts("order_by=-created_date").then(res => {
      if (res) {
        setProducts(res)
      }
    })
  }

  if (isLoading) return <p>{loadingMessage}</p>

  return (
    <>
      <Filter productCount={products.length} onSearch={searchProducts} locations={locations} categories={productCategories} onClear={resetSearch} />
      {
      !isFilter 
      ?
      productCategories.map((c) => (
        <div className="section" key={c.name}>
          <h1 className='title'>{c.name}</h1>
          <div className="columns is-multiline">
          {products.filter(p => {
            return p.category.name === c.name
          }).slice(0,5).map((p) => (
            <ProductCard product={p} key={p.id}/>
          ))}
          </div>
        </div>
      ))
      :
      <div className="section">
        <h1 className="title">Products matching filters</h1>
        <div className="columns is-multiline">
          {products.map(p => (
            <ProductCard product={p} key={p.id}/>
          ))}
        </div>
      </div>
    }
    </>
  )
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
