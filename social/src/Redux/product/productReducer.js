
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, SINGLE_PRODUCT } from "./actionType";
import initialState from "./initialState";

// create reducer 
const productReducer = (state=initialState,{type, payload})=>{

    switch (type) {
        case PRODUCT_REQUEST:
            
            return {
                ...state,
                skeleton:true
            }
        case PRODUCT_SUCCESS:

            return {
                ...state,
                skeleton: false,
                products:payload
            }
         case PRODUCT_FAIL:

             return {
                 ...state,
                 skeleton: false,
                 error: payload
             }
        case SINGLE_PRODUCT:

            return {
                ...state,
                singleProduct: state.products.find(data=> data._id===payload)
            }
           
        default:
            return state
    }

}

// export 

export default productReducer;