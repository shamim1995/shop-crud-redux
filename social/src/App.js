import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/Product/Category";
import Product from "./pages/Product/Product";
import Tags from "./pages/Product/Tags";
import Shop from "./pages/Shop/Shop";
import { getAllCategoreis } from "./Redux/category/action";
import { getAllProducts } from "./Redux/product/action";
import { getAllTags } from "./Redux/tags/action";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home/Home";



function App() {

const dispatch=useDispatch()
  

  useEffect(()=>{
  dispatch(getAllTags())
  dispatch(getAllProducts())
  dispatch(getAllCategoreis())
  
  },[dispatch])
  

  return (
    <>


   <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
      />
    <Routes>

      
      <Route path="/" element={<Shop/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/admin/product" element={<Product/>}/>
      <Route path="/admin/category" element={<Category/>}/>
      <Route path="/admin/tags" element={<Tags/>}/>
      
      
    </Routes>
    
    </>
  );
}

export default App;
