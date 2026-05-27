import { fetchWithResponse } from './fetcher'

export function getCart() {
  return fetchWithResponse('cart', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getOrders() {
  return fetchWithResponse('orders', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export async function completeCurrentOrder({orderId, paymentTypeId}) {
  const res = await fetchWithResponse(`orders/${orderId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ payment_type: paymentTypeId })
  })
  if (res?.message) throw new Error(res.message)
  return res
}
