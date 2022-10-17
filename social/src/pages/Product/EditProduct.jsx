
import React, { useEffect, useState } from 'react'
import {Modal} from 'react-bootstrap'
import { useSelector } from 'react-redux'

const EditProduct = (props) => {
      const [productEditInput, setProductEditInput] = useState({
        name: "",
        regular_price: "",
        sale_price: "",
        stock: "",
        file: "",
        gall: "",
        photo: "",
        gallery: [],
        category: [],
        tags: [],
      });

const {products} = useSelector(state => state.products)

useEffect(() => {
  const editProduct = products.filter(
    (product) => product._id === props.edit.editProductId
  )[0];

  setProductEditInput({ ...editProduct });
}, [props.edit.editProductId, products]);





const handleEditProduct=(e)=>{

    setProductEditInput((prev) => ({
      ...prev,
      [e.target.name]:e.target.value

    }));
  }
  //photo single upload 

  const handleProductEditPhoto = (e)=>{
    setProductEditInput((prev)=>({
      ...prev,
      file: e.target.files[0]
    }))
  }

// upload gallery photo

const handleProductEditGallery = (e) => {
  setProductEditInput((prev) => ({
    ...prev,
    gall: e.target.files,
  }));
};

const {name, regular_price, sale_price, stock, category , tags}=productEditInput

  //product form manage

  const handleProductEditFrom = async(e)=>{
    e.preventDefault();

    
    const data = new FormData()
    data.append('name', name)
    data.append('regular_price',regular_price)
    data.append('sale_price', sale_price)
    data.append('stock', stock)
    data.append('photo',productEditInput.file)
    data.append('category',category)
    data.append('tags',productEditInput.tags)
   

    for (let i = 0; i<productEditInput.gall.length; i++) {
      
      data.append('gallery', productEditInput.gall[i])
      
      
    }





  }
    const {categories} = useSelector(state=>state.category)
    const {tags : storedTags}= useSelector(state=>state.tags)
// category checked or unchecked 

const handleCategoryChange = (e)=>{

  if(e.target.checked){
    let cat =productEditInput.category
    
    cat.push(e.target.value)
    setProductEditInput((prev)=>({
      ...prev,
      category:cat
    }))
  }else{
    let cat= productEditInput.category
    let newCat =cat.filter(data=>data !== e.target.value) 
    setProductEditInput((prev)=>({
      ...prev,
      category:newCat
    })) 
  }

}

//tag checked unchecked 

const handleTagChange = (e)=>{
  if(e.target.checked){
    let tag = [...tags]
    tag.push(e.target.value)

    setProductEditInput((prev)=>({
      ...prev,
      tags:tag
    }))

  }else{
    let tag = productEditInput.tags
    let newTags = tag.filter(data=>data !== e.target.value )
    setProductEditInput((prev)=>({
      ...prev,
      tags:newTags
    }))
  }

}


 return (
   <>
     <div className="container my-5">
       <div className="row">
         <div className="col-md-5 m-auto">
           <Modal animation={true} show={props.edit.status} onHide={props.hide}>
             <Modal.Header closeButton>
               <Modal.Title>Update Product</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               <form onSubmit={handleProductEditFrom}>
                 <div className="my-2">
                   <label>Product Name</label>
                   <input
                     name="name"
                     value={productEditInput.name}
                     onChange={handleEditProduct}
                     className="form-control"
                     type="text"
                   />
                 </div>
                 <div className="my-2">
                   <label>Regular-Price</label>
                   <input
                     name="regular_price"
                     value={productEditInput.regular_price}
                     onChange={handleEditProduct}
                     className="form-control"
                     type="text"
                   />
                 </div>
                 <div className="my-2">
                   <label>Sale-Price</label>
                   <input
                     name="sale_price"
                     value={productEditInput.sale_price}
                     onChange={handleEditProduct}
                     className="form-control"
                     type="text"
                   />
                 </div>
                 <div className="my-2">
                   <label>Stock</label>
                   <input
                     name="stock"
                     value={productEditInput.stock}
                     onChange={handleEditProduct}
                     className="form-control"
                     type="text"
                   />
                 </div>
                 <div className="my-2">
                   <label>Photo</label>
                   <input
                     name="photo"
                     onChange={handleProductEditPhoto}
                     className="form-control"
                     type="file"
                   />
                 </div>
                 <div className="my-2">
                   <label>Gallery</label>
                   <input
                     name="gallery"
                     onChange={handleProductEditGallery}
                     className="form-control"
                     type="file"
                     multiple
                   />
                 </div>
                 <span>Select Category</span>
                 <br />
                 {categories.map((data, index) => (
                   <div className="my-2">
                     <input
                       name="category"
                       className=""
                       value={data.name}
                       onChange={handleCategoryChange}
                       type="checkbox"
                     />
                     {data.name} <br />
                   </div>
                 ))}
                 <span>Select Tag</span>
                 {storedTags.map((data, index) => (
                   <div className="my-2">
                     <input
                       name="tags"
                       className=""
                       value={data.name}
                       onChange={handleTagChange}
                       type="checkbox"
                     />{" "}
                     {data.name}
                     <br />
                   </div>
                 ))}

                 <div className="mt-3">
                   <button
                     type="submit"
                     onClick={props.hide}
                     className="btn btn-primary w-100"
                   >
                     updated
                   </button>
                 </div>
               </form>
             </Modal.Body>
           </Modal>
         </div>
       </div>
     </div>
   </>
 );
}

export default EditProduct
