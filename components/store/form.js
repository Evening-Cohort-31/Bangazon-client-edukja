import { Input } from '../../components/form-elements'
import CardLayout from '../card-layout'

export default function StoreForm({ nameEl, descriptionEl, saveEvent, title, router, children, disabled=false }) {
  return (
    <CardLayout title={title}>
      <>
        {children}
        <Input
          id="name"
          refEl={nameEl}
          type="text"
          placeholder="Store Name"
        />
        <textarea placeholder="Add a Description..." className="textarea" ref={descriptionEl}></textarea>
      </>
      <>
        <button className="card-footer-item button" onClick={saveEvent} disabled={disabled}>Save</button>
        <button className="card-footer-item button" onClick={() => router.back()}>Cancel</button>
      </>
    </CardLayout>
  )
}


