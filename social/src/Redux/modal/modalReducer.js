import { HIDE, SHOW } from "./actionType";
import { initialState } from "./initialState";



export const modalView = (state= initialState,{type, payload})=>{

switch (type) {
    case SHOW:
        return true
    case HIDE:
        return false
    default:
        return state
}

}