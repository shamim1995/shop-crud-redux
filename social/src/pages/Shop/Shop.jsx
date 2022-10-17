import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSingleProduct } from '../../Redux/product/action';
import './../Shop/Shop.css';
import SingleProduct from './SingleProduct';
import SkeletonLoading from '../../components/Skeleton/Skeleton';


const Shop = () => { 
    const dispatch = useDispatch()

    // get all product 

    const {products,skeleton, error} = useSelector(state=>state.products)
    
   const {tags}= useSelector(state=>state.tags)
   const {categories}= useSelector(state=>state.category)

    const [single, setSingle] = useState(false);
    
    const handleSingleShow = (id) =>{
        dispatch(getSingleProduct(id))
        setSingle(true);
    } 
    const handleSingleHide = () => setSingle(false);
   
 
  return (
    <>

       
        <SingleProduct single={  single } handleSingleHide =  { handleSingleHide }  />
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link to="/">
                            <img src="https://i.etsystatic.com/9677300/r/il/edb9a9/1988747599/il_fullxfull.1988747599_4ory.jpg" alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        <div className="menu">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="menu-list">
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><a href="#">Blog</a></li>
                                <li><Link to="/">Shop</Link></li>
                                <li><Link to="/admin/product">Admin</Link></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container my-5 shop'>
            <div className="row">
                <div className="col-md-3 widgetMe">
                    <div className="widget">
                        <h2>Serch</h2>
                        <input className='form-control' type="text" />
                    </div>

                    <div className="widget">
                        <h2>Category</h2>
                        <ul className='list-group'>
                            {
                                categories.map(data=>
                                    <li className='list-group-item'><a href="#">{data.name}</a></li>
                                    )
                            }
                            
                            
                        </ul>
                    </div>

                    <div className="widget">
                        <h2>Tags</h2>
                        <div className="tags">
                        
                            {
                                
                               tags.map(data=>
                                
                                <a href="#">{data.name}</a>
                                
                                ) 
                             }
                            
                          </div>
                        
                    </div>

                    <div className="widget my-2">
                        <h2>Price Search</h2>
                        <div className="search">
                            <input type="range" min={10} max={ 10000 } />
                            <input type="range" min={10} max={ 10000 } />
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row shop-area">
                        <h2>Our Products</h2>
                       

                        {
                          !skeleton ? products.map(data=>
                            <div className="col-md-4 shop-item mb-5">
                                    <div className="card">
                                        <img className='card-img' src={`http://localhost:5050/images/products/${data.photo}`} alt="" />
                                        <div className="card-body">
                                            <h3>{data.name}</h3>                                
                                        </div>
                                        <div className="card-footer">
                                            {
                                                data.sale_price===''?<p style={{color:'red', fontSize:'22px'}}>{data.regular_price}$</p>:<>
                                                <span style={{textDecoration:'line-through', display:'inline-block', marginRight:'10px'}}>{data.regular_price}$</span><span style={{color:'red', fontSize:'22px'}}>{data.sale_price}$</span>
                                                </>
                                            }
                                            <br />
                                            <button onClick={()=>handleSingleShow(data._id)} className='btn btn-sm btn-info'>Quick View</button>
                                        </div>
                                    </div>
                            </div>
                                
                                ):[1,2,3,4,5,6,7,8].map(loading=>
                                    <SkeletonLoading/>
                                    
                                )
                        }
                      

                    </div>
                </div>
            </div>
        </div>


    </>
  )
};

export default Shop;