
import { combineReducers } from 'redux';
import { categoryReducer } from './category/categoryReducer.js';
import { modalView } from './modal/modalReducer.js';
import productReducer from './product/productReducer.js';
import { tagReducer } from './tags/tagReducer.js';

// combine reducer
const rootReducer = combineReducers({
    products:productReducer,
    category:categoryReducer,
    tags:tagReducer,
    eidt_modal: modalView
    
    
})


// export 

export default rootReducer;