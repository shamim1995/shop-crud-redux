import axios from "axios"
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, SINGLE_PRODUCT } from "./actionType"

import { swalAlert } from "../../utility/swal"


// product request 
export const productRequest = ()=>({
    type:PRODUCT_REQUEST
}) 

// product get success 

export const productSuccess = (payload)=>({
    type:PRODUCT_SUCCESS,
    payload
})

// product get faill 

export const productFail=(payload)=>({
    type:PRODUCT_FAIL,
    payload:payload.error
})

// single product get 

export const singleProduct = (payload)=>{
return({
  type: SINGLE_PRODUCT,
    payload
})
}




// make slug 

export const createSlug=(data)=>{
    let slug = data.split(' ')
    return slug.join('-').toLowerCase()
}


// get all products 


export const getAllProducts = ()=>(dispatch)=>{

 try {
       dispatch(productRequest())
       setTimeout(() => {
        axios.get('http://localhost:5050/api/v1/product').then(res => {

          dispatch(productSuccess(res.data))

        }).catch(error=>{
        dispatch(productFail(error.message))
      })
       },1000)

 } catch (error) {
    dispatch(productFail(error.message))
 }


}

// create product 

export const createProducts = (data)=>async(dispatch)=>{

 try {
       
     await axios.post('http://localhost:5050/api/v1/product',data).then(res => {

        dispatch(getAllProducts())
        
        swalAlert('Product Created','Successfully done', 'success')
        
      }).catch(error=>{
         
        dispatch(productFail(error.message))
        
       
      })

 } catch (error) {
    dispatch(productFail(error.message))
 }


}

// edit product 

export const editProducts = (id,data)=>async(dispatch)=>{
  
 try {
       
     await axios.put(`http://localhost:5050/api/v1/product/${id}`,data).then(res => {
      
        dispatch(getAllProducts())
        
        swalAlert('Product updated','Successfully done', 'success')
        
      }).catch(error=>{
         
        dispatch(productFail(error.message))
        
       
      })

 } catch (error) {
    dispatch(productFail(error.message))
 }


}

// single product get
export const getSingleProduct = (id) => async(dispatch)=>{
  
  
  dispatch(singleProduct(id))

  
}


// delete product 


export const productDeleted=(id)=>(dispatch)=>{

   try {
       
       
        axios.delete(`http://localhost:5050/api/v1/product/${id}`).then(res => {

          dispatch(getAllProducts())
         

        }).catch(error=>{
        dispatch(productFail(error.message))
      })
     

 } catch (error) {
    dispatch(productFail(error.message))
 }


}