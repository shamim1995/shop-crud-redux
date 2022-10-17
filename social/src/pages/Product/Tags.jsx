import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import Header from '../../components/Header/Header';
import ModalComponents from '../../components/ModalComponents';
import { tagDeleted } from '../../Redux/tags/action';

const Tags = () => {


    const dispatch = useDispatch()

    // get all tags with reducer 

    const {tags} = useSelector(state=>state.tags)
    
  const [showtag, setShowTag] = useState(false);
  const handleTagModalShow = () => setShowTag(true); 
  const handleTagModalHide = () => setShowTag(false); 
  // tag delete 

    const handleTagDelete = (id)=>{
        return swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            dispatch(tagDeleted(id));
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

    <ModalComponents type='tag' show={showtag} hide={handleTagModalHide} />

    <div className="container my-5">
        <div className="row">
             <div className="col-md-2">
                <Header/>
            </div>
            <div className="col-md-10">
                
                <div className="card">
                    <button className='btn btn-secondary w-25 btn-sm m-auto mt-3' onClick={handleTagModalShow} >Add new Tag</button>
                    <div className="card-body">
                        <table className='table table-hover table-dark text-center align-middle'>
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tags.map((data, index)=>
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{data.name}</td>
                                        
                                        <td>
                                            <button className='btn btn-info btn-sm mx-2'><AiOutlineEdit/> </button>
                                            
                                            <button onClick={()=>handleTagDelete(data._id)} className='btn btn-danger btn-sm'><BsFillTrashFill/> </button>
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

export default Tags;