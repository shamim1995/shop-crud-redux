
import React from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { createProducts, createSlug } from '../Redux/product/action'
import { createToastify } from '../utility/toastify'
import { createCategory } from '../Redux/category/action.js'
import { createTag } from '../Redux/tags/action'
import { swalAlert } from '../utility/swal'



const ModalComponents = ({type, show, hide}) => {
  
const dispatch = useDispatch();
  // product form manage with state 

  const [productInput, setProductInput]=useState({
    name:'',
    regular_price:'',
    sale_price:'',
    stock:'',
    file:'',
    gall:'',
    photo:'',
    gallery:[],
   category:[],
    tags:[]
  })


  const handleAddProduct=(e)=>{

    setProductInput((prev) => ({
      ...prev,
      [e.target.name]:e.target.value

    }));
  }
  //photo single upload 

  const handleProductPhoto = (e)=>{
    setProductInput((prev)=>({
      ...prev,
      file: e.target.files[0]
    }))
  }

// upload gallery photo

const handleProductGallery = (e) =>{
  setProductInput((prev)=>({
    ...prev,
    gall: e.target.files
  }))
}

  //product form manage

  const handleProductFrom = async(e)=>{
    e.preventDefault();

    

    const data = new FormData()
    data.append('name', productInput.name)
    data.append('regular_price', productInput.regular_price)
    data.append('sale_price', productInput.sale_price)
    data.append('stock', productInput.stock)
    data.append('photo', productInput.file)
    data.append('category', productInput.category)
    data.append('tags', productInput.tags)
   

    for (let i = 0; i<productInput.gall.length; i++) {
      
      data.append('gallery', productInput.gall[i])
      
      
    }

    // create products 

    if(productInput.name || productInput.regular_price){
       dispatch(createProducts(data));
      
      e.target.reset()
      setProductInput({
        name: "",
        regular_price: "",
        sale_price: "",
        stock: "",
        file: "",
        gall: "",
        photo: "",
      });
      
    }else{
      createToastify('All Fields Required')
      
    }
    
    

  }

  // category photo 

  const handleCategoryPhoto =(e)=>{
    setCategoryInput((prev)=>({
      ...prev,
      file:e.target.files[0]
    }))
  }

// category form manage with state

const [categoryInput, setCategoryInput]=useState({
  name:'',
  slug:'',
  photo:'',
  file:''
})

const handleCategoryInput = (e)=>{

  setCategoryInput((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
  }))

}
// category form submit 

const handleCategoryForm = async(e)=>{
  e.preventDefault()
  let makeSlug = categoryInput.slug ? createSlug(categoryInput.slug):createSlug(categoryInput.name)

  const data = new FormData()
  data.append('name',categoryInput.name)
  data.append('slug',makeSlug)
  data.append('photo',categoryInput.file)

  dispatch(createCategory(data))
  e.target.reset()
  setCategoryInput({
    name: "",
    slug: ""
  });


}
// category checked or unchecked 

const handleCategoryChange = (e)=>{

  if(e.target.checked){
    let cat =productInput.category
    
    cat.push(e.target.value)
    setProductInput((prev)=>({
      ...prev,
      category:cat
    }))
  }else{
    let cat= productInput.category
    let newCat =cat.filter(data=>data !== e.target.value) 
    setProductInput((prev)=>({
      ...prev,
      category:newCat
    })) 
  }

}

//tag checked unchecked 

const handleTagChange = (e)=>{
  if(e.target.checked){
    let tag = productInput.tags
    tag.push(e.target.value)

    setProductInput((prev)=>({
      ...prev,
      tags:tag
    }))

  }else{
    let tag = productInput.tags
    let newTags = tag.filter(data=>data !== e.target.value )
    setProductInput((prev)=>({
      ...prev,
      tags:newTags
    }))
  }

}


// tag stage manage  

const [tagInput, setTagInput] = useState({
  name:''
})

const handleTagInput = (e)=>{

  setTagInput((prev)=>({
    ...prev,
    [e.target.name]:e.target.value
  }))

}

// tag form manage 

const handleTagForm = async(e)=>{
  e.preventDefault();

 if(tagInput.name){
  dispatch(createTag({
  name:tagInput.name,
  
 }));
  swalAlert("Tag Created sucessfully done", "", "success");
  setTagInput({
    name: "",
  });
 }else{
  createToastify('Fields is required')
  
 }
 
}

// category get with reducer
const { categories } = useSelector((state) => state.category);
// tag get with reducer 

const {tags}= useSelector(state=>state.tags)



  if(type==='tag'){
    return (
    <>
    <div className="container my-5">
       
        <div className="row">
        
        <div className="col-md-5 m-auto">

          <Modal animation={true} show={show} onHide={hide}>
            <Modal.Header closeButton>
              <Modal.Title>Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleTagForm}>
            <div className="my-2">
              <label>Tags Name</label>
              <input name='name' value={tagInput.name} onChange={handleTagInput} className='form-control' type="text" />
            </div>
            
            <div className="mt-3">
              <button type='submit' className='btn btn-primary w-100'>Create</button>
            </div>
            
          </form>

            </Modal.Body>
          </Modal>
          
        </div>
        </div>
    </div>
    </>
  )
  }else if(type==='product'|| type==='edit'){

      return (
    <>
    <div className="container my-5">
      
        <div className="row">
        
        <div className="col-md-5 m-auto">
          <Modal animation={true} show={show} onHide={hide}>
            <Modal.Header closeButton>
             {
              type==='product'? <Modal.Title>Update Product</Modal.Title>: <Modal.Title> Create Product</Modal.Title>
             }
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleProductFrom} >
            <div className="my-2">
              <label>Product Name</label>
              <input name='name' value={productInput.name} onChange={handleAddProduct} className='form-control' type="text" />
            </div>
            <div className="my-2">
              <label>Regular-Price</label>
              <input name='regular_price' value={productInput.regular_price} onChange={handleAddProduct} className='form-control' type="text" />
            </div>
             <div className="my-2">
              <label>Sale-Price</label>
              <input name='sale_price' value={productInput.sale_price} onChange={handleAddProduct} className='form-control' type="text" />
            </div>
             <div className="my-2">
              <label>Stock</label>
              <input name='stock' value={productInput.stock} onChange={handleAddProduct} className='form-control' type="text" />
            </div>
             <div className="my-2">
              <label>Photo</label>
              <input name='photo' onChange={handleProductPhoto} className='form-control' type="file"  />
            </div>
            <div className="my-2">
              <label>Gallery</label>
              <input name='gallery' onChange={handleProductGallery} className='form-control' type="file" multiple />
            </div>
            <span>Select Category</span><br />
            {
              categories.map((data, index)=>
              <div className="my-2">
              
              <input name='category' className='' value={data.name} onChange={handleCategoryChange} type='checkbox'/>{data.name} <br />            
              
              </div>
              
              )
            }
            <span>Select Tag</span>
            {
              tags.map((data, index)=>
                <div className="my-2">
              
              <input name='tags' className='' value={data.name} onChange={handleTagChange} type='checkbox'/> {data.name}<br />            
              
              </div>
              )
            }
           
            <div className="mt-3">
              {
                type==='product'?<button type='submit' onClick={hide} className='btn btn-primary w-100'>updated</button>:<button type='submit' onClick={hide} className='btn btn-primary w-100'>create</button>
              }
            </div>

          </form>
                
            </Modal.Body>
          </Modal>
          

        </div>
        </div>
    </div>
    </>
  )
  }else if(type==='category'){
     return (
    <>
    <div className="container my-5">
       
        <div className="row">
        
        <div className="col-md-5 m-auto">
          <Modal animation={true} show={show} onHide={hide}>
            <Modal.Header closeButton>
              <Modal.Title> Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form action="" onSubmit={handleCategoryForm} >
            <div className="my-2">
              <label>Category Name</label>
              <input name='name' value={categoryInput.name} onChange={handleCategoryInput} className='form-control' type="text"/>
            </div>
            <div className="my-2">
              <label>Category Slug</label>
              <input name='slug' value={categoryInput.slug} onChange={handleCategoryInput} className='form-control' type="text" />
            </div>
             
             <div className="my-2">
              <label>Photo</label>
              <input name='photo' onChange={handleCategoryPhoto} className='form-control' type="file" />
            </div>
            <div className="mt-3">
              <button type='submit' onClick={hide} className='btn btn-primary w-100'>Create</button>
            </div>
            
          </form>

            </Modal.Body>
          </Modal>
          

        </div>
        </div>
    </div>
    </>
  )
  }

 
}

export default ModalComponents;