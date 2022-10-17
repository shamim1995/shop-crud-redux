
import axios from "axios";
import { TAG_FAIL, TAG_REQUEST, TAG_SUCCESS } from "./actionType.js";

// tag request 

export const tagRequest = ()=>({
    type:TAG_REQUEST
}) 

// tag get success 

export const tagSuccess = (payload)=>({
    type:TAG_SUCCESS,
    payload
})

// tag get faill 


export const tagFaill = (payload)=>({
    type:TAG_FAIL,
    payload:payload.error
})

// get all tags 

export const getAllTags = ()=>(dispatch)=>{

   try {
     dispatch(tagRequest())

     axios.get('http://localhost:5050/api/v1/tag').then(res => {
     dispatch(tagSuccess(res.data))
     }).catch(error => {
        dispatch(tagFaill(error.message))
     })
   }catch(error) {
    dispatch(tagFaill(error.message))
   }

}
// create tags
export const createTag=(data)=>(dispatch)=>{
    try {
     
    axios.post('http://localhost:5050/api/v1/tag',data).then(res =>{

        dispatch(getAllTags())
     }).catch(error => {
        dispatch(tagFaill(error.message))
     })
   }catch (error) {
    dispatch(tagFaill(error.message))
   }
}



// delete tag


export const tagDeleted=(id)=>(dispatch)=>{

   try {
       
       
        axios.delete(`http://localhost:5050/api/v1/tag/${id}`).then(res => {

          dispatch(getAllTags())
         

        }).catch(error=>{
        dispatch(tagFaill(error.message))
      })
     

 } catch (error) {
    dispatch(tagFaill(error.message))
 }


}

