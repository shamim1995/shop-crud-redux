import React from 'react'
import { useState } from 'react';
import { AiFillEye, AiOutlineEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import ModalComponents from '../../components/ModalComponents';
import { categoryDelete } from '../../Redux/category/action';

const Category = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector((state) => state.category);

    const [category, setCategory]= useState(false)

    const handleCatModalShow = ()=> setCategory(true)
    const handleCatModalHide = ()=> setCategory(false)

    // category delete 

    const handleCategoryDelete =(id)=>{
         return swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            
            if (willDelete) {
                dispatch(categoryDelete(id));
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
        
    }

  return (

    <>
    <ModalComponents type='category' show={category} hide={handleCatModalHide} />
    <div className="container my-5">
        <div className="row">
             <div className="col-md-2">
                <Header/>
            </div>
            <div className="col-md-10">
                
                <div className="card">
                    <button onClick={handleCatModalShow} className='btn btn-secondary w-25 btn-sm m-auto mt-3'>Add new Category</button>
                    <div className="card-body">
                        <table className='table table-hover table-dark text-center align-middle'>
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Slug</th>                                   
                                    <th>Photo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    categories.map((data, index)=>
                                    <tr>
                                    <td>{index+1}</td>
                                    <td>{data.name}</td>
                                    <td>{data.slug}</td>
                                    <td>
                                        <img style={{width:'50px'}} src={`http://localhost:5050/images/products/${data.photo}`} alt="" />
                                    </td>
                                    <td>
                                        <button className='btn btn-info btn-sm'><AiOutlineEdit/> </button>
                                        <button className='btn btn-primary mx-2 btn-sm'><AiFillEye/> </button>
                                        <button onClick={()=>handleCategoryDelete(data._id)} className='btn btn-danger btn-sm'><BsFillTrashFill/> </button>
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

export default Category;