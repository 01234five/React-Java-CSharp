import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
    const [click, setClick] = useState(false)
    function handleClick (){
        setClick(!click);
        console.log("Test");

    }
  return (
    <>
    <nav className='navbar'>
        <div className="navBar-container">
            <Link to="/" className="navbar-logo">
                TRVL <i className='fa fa-car'></i>
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fa fa-battery-full' : 'fa fa-battery-empty'}></i>
            </div>            
        </div>
    </nav>
    </>
  )
}

export default NavBar