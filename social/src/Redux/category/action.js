
import axios from 'axios'
import{CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS} from'./actionType'

// category request 
export const categoryRequest = ()=> ({
    type:CATEGORY_REQUEST
})


// category get success 

export const categorySuccess = (payload)=>({
    type:CATEGORY_SUCCESS,
    payload
})

// category get faill 


export const categoryFail = (payload)=>({
    type:CATEGORY_FAIL,
    payload:payload.error
}) 


// get all categories 


export const getAllCategoreis = ()=>(dispatch)=>{

   try {
     dispatch(categoryRequest())

     axios.get('http://localhost:5050/api/v1/category').then(res => {
        dispatch(categorySuccess(res.data))
     }).catch(error => {
        dispatch(categoryFail(error.message))
     })

   } catch (error) {
    dispatch(categoryFail(error.message))
   }

}

export const createCategory = (data)=>async(dispatch)=>{

   try {
     
     await axios.post('http://localhost:5050/api/v1/category',data).then(res => {
        dispatch(getAllCategoreis())
     }).catch(error => {
        dispatch(categoryFail(error.message))
     })

   } catch (error) {
    dispatch(categoryFail(error.message))
   }

}


export const categoryDelete =(id)=> async(dispatch)=>{

   try {
    
     await axios.delete(`http://localhost:5050/api/v1/category/${id}`).then(res => {
        dispatch(getAllCategoreis())
     }).catch(error => {
        dispatch(categoryFail(error.message))
     })

   } catch (error) {
    dispatch(categoryFail(error.message))
   }
}