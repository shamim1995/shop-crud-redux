import React from 'react'
import { Link } from 'react-router-dom';
import './Header.scss'

const Header = () => {
  return (
    <>
    <div className="siteHeader_Wrapper">
       <div className="container">
       
        <div className="row">
          <div className="col-md-12 mt-4">
               <ul className='siteMenuBar'>
                    <li><Link to={'/'}>Shop</Link></li>
                    <li> <Link to={'/admin/product'}>Product</Link></li>
                    <li > <Link to={'/admin/category'}>Category</Link></li>
                    <li> <Link to={'/admin/tags'}>Tags</Link></li>
              </ul>
        </div>
        
        </div>
    </div>
    </div>
   
    </>
  )
}

export default Header;