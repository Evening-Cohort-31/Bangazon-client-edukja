import { useRef } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"

export default function AddPaymentModal({ showModal, setShowModal, addNewPayment }) {
  const merchantNameInput = useRef()
  const acctNumInput = useRef()
  const expDateInput = useRef()
  return (
    <Modal showModal={showModal} setShowModal={setShowModal} title="Add New Payment Method">
      <>
        <Input
          id="merchant_name"
          type="text"
          label="Merchant Name"
          refEl={merchantNameInput}
        />
        <Input
          id="account_number"
          type="text"
          label="Account Number"
          refEl={acctNumInput}
        />
        <Input
          id="expiration_date"
          type="date"
          label="Expiration Date"
          refEl={expDateInput}
        />
      </>
      <>
        <button
          className="button is-success"
          onClick={() => addNewPayment({
            account_number: acctNumInput.current.value,
            merchant_name: merchantNameInput.current.value,
            expiration_date: expDateInput.current.value,
            create_date: new Date().toISOString().slice(0,10)
          })}
        >Add Payment Method</button>
        <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
      </>
    </Modal>
  )
}
