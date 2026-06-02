import { useRef } from "react"
import { Input } from "../form-elements"
import Modal from "../modal"
import {NewPayment} from "../../pages/payments"

interface AddPaymentModalProps {
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  addNewPayment: (payment: NewPayment) => void
}

export default function AddPaymentModal({ showModal, setShowModal, addNewPayment }: AddPaymentModalProps): React.JSX.Element {
  const merchantNameInput = useRef<HTMLInputElement>(null)
  const acctNumInput = useRef<HTMLInputElement>(null)
  const expDateInput = useRef<HTMLInputElement>(null)
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
