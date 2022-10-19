import React from 'react'
import { AiOutlineEdit, AiFillEye } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import ModalComponents from '../../components/ModalComponents';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import './../Product/product.css'
import SingleProduct from '../Shop/SingleProduct';
import { getSingleProduct, productDeleted } from '../../Redux/product/action';
import swal from 'sweetalert';
import EditProduct from './EditProduct';





const Product = () => {
const dispatch = useDispatch();
    // get all product with reducer 

    const { products } = useSelector(state=>state.products)

    // state manage for product form 

    const [product, setPorduct] = useState(false)

    const handleProductShow=()=>setPorduct(true)
    const handleProductHide=()=>setPorduct(false)

    // single product modal 
    const [single, setSingle] = useState(false);
    
    const handleSingleShow = (id) =>{
        
        dispatch(getSingleProduct(id))
        setSingle(true);
    } 
    // for single product
    const handleSingleHide = () => setSingle(false);


    // delete product 

    const handleProductDelete = (id) => {
       
         return swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            
            if (willDelete) {
                dispatch(productDeleted(id));
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
        
      
    };

// eidt form 


const [show, setEdit] = useState(false)


const handleProductEditShow = (id)=>{
   dispatch(getSingleProduct(id));
   setEdit(true)
}

const handleEditProductHide = () => setEdit(false)

    

  return (
    
    <>
    <ModalComponents type='product' show={product} hide={handleProductHide}/>
    <SingleProduct single={  single } handleSingleHide =  { handleSingleHide }  />
    <EditProduct show={show} hide = {handleEditProductHide} />
    
    <div className="container my-5">
        <div className="row">
            <div className="col-md-2">
                <Header/>
            </div>
            <div className="col-md-10">
                
                <div className="card">
                    <button onClick={handleProductShow} className='btn btn-secondary w-25 btn-sm m-auto mt-3'>Add new product</button>
                    <div className="card-body">
                        <table className='table table-hover table-dark text-center align-middle'>
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Regular Price</th>
                                    <th>Sale Price</th>
                                    <th>Stock</th>
                                    <th>Category</th>
                                    <th>Tags</th>
                                    <th>Photo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='productTbody'>

                                {
                                    products.map(( data,index ) =>
                                    
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.regular_price}</td>
                                    <td>{data.sale_price}</td>
                                    <td>{data.stock}</td>
                                    <td>{data.category +' '}</td>
                                    <td> { data.tags +' ' }</td>
                                    <td>
                                        <img style={{width:'50px'}} src={`http://localhost:5050/images/products/${data.photo}`} alt="" />
                                    </td>
                                    <td colSpan={4}>
                                        <a href="#"><i onClick={()=>handleProductEditShow(data._id)} className='text-info'><AiOutlineEdit/> </i></a>
                                       <a href="#"> <i onClick={()=>handleSingleShow(data._id)} className='text-primary mx-2'><AiFillEye/> </i></a>
                                        <a href="#"><i onClick={()=>handleProductDelete(data._id)} className='text-danger'><BsFillTrashFill/> </i></a>
                                        
                                    </td>
                                
                                </tr>
                                    )
                                }
                                
                             
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Product