import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Navbar from '../../../components/navbar'
import { Detail } from '../../../components/product/detail'
import { getProductById, likeProduct, unLikeProduct } from '../../../data/products'

const Ratings = dynamic(() => import('../../../components/rating/detail').then(m => m.Ratings), { ssr: false })

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState({})

  const refresh = () => {
    getProductById(id).then(productData => {
      if (productData) {
        setProduct(productData)
      }
    })
  }

  const like = () => {
    likeProduct(id).then(refresh)
  }

  const unlike = () => {
    unLikeProduct(id).then(refresh)
  }

  useEffect(() => {
    if (id) {
      refresh()
    }
  }, [id])

  return (
    <div className="columns is-centered">
      <div className="column">
        <Detail product={product} like={like} unlike={unlike}/>
        <Ratings
          refresh={refresh}
          number_purchased={product.number_purchased}
          ratings={product.ratings}
          average_rating={product.average_rating}
          likes={product.likes}
        />
      </div>
    </div>
  )
}

ProductDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
