
// create reducer 

import { TAG_FAIL, TAG_REQUEST, TAG_SUCCESS } from "./actionType.js";
import { initialState } from "./initialState";

export const tagReducer = (state=initialState,{type, payload})=>{
    switch (type) {
        case TAG_REQUEST:
            return ({
                ...state,
                skeleton:true
            })
        case TAG_SUCCESS:
            return ({
                ...state,
                skeleton: false,
                tags:payload
            })
        case TAG_FAIL:
            return ({
                ...state,
                skeleton: false,
                error:payload
            })
        default:
            return state
    }
}