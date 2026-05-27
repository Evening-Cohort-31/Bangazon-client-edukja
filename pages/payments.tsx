import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import CardLayout from '../components/card-layout'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import AddPaymentModal from '../components/payments/payment-modal'
import Table from '../components/table'
import { addPaymentType, getPaymentTypes, deletePaymentType } from '../data/payment-types'

//The 
export interface NewPayment {
  merchant_name: string,
  account_number: string,
  expiration_date: string,
  create_date: string,
}

export interface Payment extends Omit<NewPayment, 'account_number'> {
  id: number,
  obscured_num: string,
  url: string
}

export default function Payments(): React.JSX.Element {
  const headers: string[] = ['Merchant Name', 'Card Number', '']
  const [payments, setPayments] = useState<Payment[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const refresh = (): Promise<void> => getPaymentTypes().then((data: Payment[] | undefined) => {
    if (data) {
      setPayments(data)
    }
  })

  useEffect(() => {
    refresh()
  }, [])

  const addNewPayment = (payment : NewPayment): void => {
    addPaymentType(payment).then(() => {
      setShowModal(false)
      refresh()
    })
  }

  const removePayment = (paymentId : number): void => {
    deletePaymentType(paymentId).then(() => {
      refresh()
    })
  }

  return (
    <>
      <AddPaymentModal showModal={showModal} setShowModal={setShowModal} addNewPayment={addNewPayment} />
      <CardLayout title="Your Payment Methods">
        <Table headers={headers}>
          {
            payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.merchant_name}</td>
                <td>{payment.obscured_num}</td>
                <td>
                  <span className="icon is-clickable" onClick={() => removePayment(payment.id)}>
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))
          }
        </Table>
        <>
          <a className="card-footer-item" onClick={() => setShowModal(true)}>Add new Payment Method</a>
        </>
      </CardLayout>
    </>
  )
}

Payments.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
