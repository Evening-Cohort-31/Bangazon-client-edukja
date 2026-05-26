import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/state'

export default function Navbar() {
  const { token, profile, setToken } = useAppContext()
  const [navActive, setNavActive] = useState(false)
  const hamburger = useRef()
  const navbar = useRef()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true)
    }
  }, [token])
  

  const showMobileNavbar = () => {
    setNavActive(true)
    hamburger.current.classList.add('is-active')
    navbar.current.classList.add('is-active')
    navbar.current.focus()
  }

  const hideMobileNavbar = () => {
    setNavActive(false)
    hamburger.current.classList.remove("is-active")
    navbar.current.classList.remove("is-active")
    navbar.current.blur()
  }

  const getLoggedInButtons = () => {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          <span className="icon">
            <i className="fas fa-user-circle is-medium"></i>
          </span>
        </a>
        <div className="navbar-dropdown is-right">
          <Link href="/cart" className="navbar-item" onClick={hideMobileNavbar}>Cart</Link>
          <Link href="/my-orders" className="navbar-item" onClick={hideMobileNavbar}>My Orders</Link>
          <Link href="/payments" className="navbar-item" onClick={hideMobileNavbar}>Payment Methods</Link>
          <Link href="/profile" className="navbar-item" onClick={hideMobileNavbar}>Profile</Link>
          {
            profile.store ?
              <>
                <Link href={`/stores/${profile.store.id}`} onClick={hideMobileNavbar} className="navbar-item">View Your Store</Link>
                <Link href="/products/new" onClick={hideMobileNavbar} className="navbar-item">Add a new Product</Link>
              </>
              :
              <Link href="/stores/new" className="navbar-item" onClick={hideMobileNavbar}>Interested in selling?</Link>
          }
          <hr className="navbar-divider"></hr>
          <Link className="navbar-item" 
          href={"/login"}
          onClick={
            () => {
              localStorage.removeItem('token')
              setToken(null)
              setIsLoggedIn(false)
              hideMobileNavbar
            }}
          >
            Log out
          </Link>
        </div>
      </div>
    )
  }

  const getLoggedOutButtons = () => {
    return (
      <div className="navbar-item">
        <div className="buttons">
          <Link href="/register" className="button is-primary" onClick={hideMobileNavbar}>
              <strong>Sign up</strong>
          </Link>
          <Link href="/login" className="button is-light" onClick={hideMobileNavbar}>
              Log in
          </Link>
        </div>
      </div>
    )
  }

  return (

    <nav className="navbar mb-3 is-warning px-5 is-fixed-top is-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

          <Link href="/">
            <img src="/images/logo.png" alt="Logo" style={{ width:"4rem", height: "4rem"}} className="relative" />
          </Link>


        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" ref={hamburger} tabIndex={0} onClick={navActive ? hideMobileNavbar : showMobileNavbar}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar} tabIndex={-1} onBlur={(e) => {
        if (navbar.current.contains(e.relatedTarget) || e.relatedTarget === hamburger.current) {
          return
        }
        hideMobileNavbar()
      }}>
        <div className="navbar-start">
          <Link href="/products" className="navbar-item" onClick={hideMobileNavbar}>Products</Link>
          <Link href="/stores" className="navbar-item" onClick={hideMobileNavbar}>Stores</Link>
        </div>
        <div className="navbar-end">
          {
            isLoggedIn ? getLoggedInButtons() : getLoggedOutButtons()
          }
        </div>
      </div>
    </nav>
  )
}
