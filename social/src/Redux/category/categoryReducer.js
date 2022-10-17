
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "./actionType";
import { initialState } from "./initialState";


export const categoryReducer = (state= initialState,{type,payload})=>{

    switch (type) {
        case CATEGORY_REQUEST:
            return{
                ...state,
                skeleton:true
            }
        case CATEGORY_SUCCESS:
            return {
                ...state,
                skeleton:false,
                categories:payload
            }
         case CATEGORY_FAIL:
             return {
                 ...state,
                 skeleton: false,
                 error: payload
             }
        default:
            return state
    }

}