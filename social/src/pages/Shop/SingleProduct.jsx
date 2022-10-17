import React from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';



const SingleProduct = ({ single, handleSingleHide }) => {
   
// get single product 

const {singleProduct}=useSelector(state=>state.products)

  return (

        <Modal show={ single } onHide={ handleSingleHide } animation={ true } centered size='lg'> 
            <Modal.Header closeButton >
                
            </Modal.Header>
            <Modal.Body>
               
                <div className="single-product">
                    
                    <div className="row">
                        
                        <div className="col-md-6">
                            <img src={`http://localhost:5050/images/products/${singleProduct.photo}`} alt="" />
                        </div>
                        <div className="col-md-6">
                            <div className="single my-5">
                                <h2>{singleProduct.name}</h2>
                                <h3> {
                                                singleProduct.sale_price===''?<p style={{color:'red', fontSize:'22px'}}>{singleProduct.regular_price}$</p>:<>
                                                <span style={{textDecoration:'line-through', display:'inline-block', marginRight:'10px'}}>{singleProduct.regular_price}$</span><span style={{color:'red', fontSize:'22px'}}>{singleProduct.sale_price}$</span>
                                                </>
                                     }
                                </h3>
                                
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste recusandae ipsa earum! Optio, placeat eum.</p>
                                <button className='btn btn-lg btn-dark'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>


  )
};

export default SingleProduct;