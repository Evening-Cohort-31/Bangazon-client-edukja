import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import CartDetail from '../components/order/detail'
import CompleteFormModal from '../components/order/form-modal'
import { completeCurrentOrder, getCart } from '../data/orders'
import { getPaymentTypes } from '../data/payment-types'
import { removeProductFromOrder } from '../data/products'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query"

export default function Cart() {
  const [showCompleteForm, setShowCompleteForm] = useState(false)
  const router = useRouter()

  const queryClient = useQueryClient()

  const { isLoading, isError, data: cart, error } = useQuery({ queryKey: ['cart'], queryFn: getCart})
  const { isLoading: paymentIsLoading, isError: paymentIsError, data: paymentTypes, error: paymentError} = useQuery({ queryKey: ['payment_types'], queryFn: getPaymentTypes})

  const productMutation = useMutation({
    mutationFn: removeProductFromOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"]})
    },
  })

  const { isPending: submitLoading, isError: submitIsError, isSuccess, error: submitError, mutate: submitOrder } = useMutation({
    mutationFn: completeCurrentOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"]})
      router.push("/my-orders")
    },
    onError: () => {
      setShowCompleteForm(false)
    }
  })

  return (
    <>
    {paymentTypes &&
      <CompleteFormModal
        showModal={showCompleteForm}
        setShowModal={setShowCompleteForm}
        paymentTypes={paymentTypes}
        completeOrder={(id) => {
          submitOrder({orderId: cart.id, paymentTypeId: id})
        }}
      />}
      {submitIsError && 
      <article className="message is-danger">
        <div className="message-header">
          <p>{submitError.header}</p>
        </div>
        <div className="message-body">
          {submitError.message}
        </div>
      </article>}
      {cart && 
      <CardLayout title="Your Current Order">
        <CartDetail cart={cart} removeProduct={(id) => {productMutation.mutate(id)}} />
        <>
          <button className="card-footer-item button" onClick={() => setShowCompleteForm(true)} disabled={!cart.products.length === 0}>Complete Order</button>
          <button className="card-footer-item button">Delete Order</button>
        </>
      </CardLayout>}
    </>
  )
}

Cart.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
