import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import { addStore } from '../../data/stores'
import { useAppContext } from '../../context/state'
import StoreForm from '../../components/store/form'

export default function NewStore() {
  const { setProfile, profile } = useAppContext()
  const [showMessage, setShowMessage] = useState(false)

  const nameEl = useRef()
  const descriptionEl = useRef()
  const router = useRouter()
  const messageEl = useRef()

  const saveStore = () => {
    addStore({
      name: nameEl.current.value,
      description: descriptionEl.current.value
    }).then((res) => {
      setProfile({
        ...profile,
        store: res
      })
      router.push(`/stores/${res.id}`)
    })
  }

  useEffect(() => {
    profile.store && setShowMessage(true)
  }, [profile])


  return (
    <>
    {showMessage &&     
    <article className='message is-danger' ref={messageEl}>
      <div className='message-header'>
        <p>You already have a store</p>
        <button className='delete' aria-label='delete' onClick={() => setShowMessage(false)}></button>
      </div>
      <div className='message-body'>
        There is a store already associated with your profile, {profile.store.name}. 
        If you believe this to be an error, please contact our customer service team. 
      </div>
    </article>}
    <StoreForm nameEl={nameEl} descriptionEl={descriptionEl} saveEvent={saveStore} router={router} title="Create your store" disabled={profile?.store ? true : false}>
      <p>Give your new store a name and description. Then add products on the next page</p>
    </StoreForm>
    </>
  )
}

NewStore.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
