import { useEffect, useState } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Table from '../components/table'
import { getOrders } from '../data/orders'
import { getOrderPayment} from "../data/payment-types"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const headers = ['Order Date', 'Total', 'Payment Method']

  useEffect(() => {
    getOrders().then(ordersData => {
      if (ordersData) {
        ordersData.map(o => {
          const pt = getOrderPayment(o.payment_type).then(res => {
            if (res) {
              o.payment_type = res
            }
          })
        })
        setOrders(ordersData)
      }
    })
  }, [])

  return (
    <>
      <CardLayout title="Your Orders">
        <Table headers={headers}>
          {
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.created_date}</td>
                <td>${order.total}</td>
                <td>{order.payment_type?.obscured_num}</td>
              </tr>
            ))
          }
        </Table>
        <></>
      </CardLayout>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
