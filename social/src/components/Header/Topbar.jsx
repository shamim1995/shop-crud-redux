import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = () => {
  return (
    <>
    <div className="topbar_menu">
        <div className="container">
            <div className="row">
                <div className="col">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Shop</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><Link to={'/admin'}>Admin</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Topbar