import Product from "../models/Product.js"
import createError from "./errorHandlerController.js";




/**
 * @access public
 * @route /api/v1/shop
 * @method GEt
 */

export const getAllProducts = async(req, res, next)=>{

    try {
        const products = await Product.find();
        res.status(200).json(products)
        
    } catch (error) {
        console.log(error);
    }

}
/**
 * @access public
 * @route /api/v1/shop
 * @method GEt single 
 */

export const getSingleProduct = async (req, res, next) => {
    const {id} =  req.params
    try {
        const product = await Product.findById(id);
       if(!product){
        next(createError(404, 'Product Not Found'))
       }else{
        res.status(200).json(product)
       }

    } catch (error) {
        console.log(error);
    }

}

/**
 * @access private
 * @route /api/v1/shop
 * @method post
 */


export const createProduct = async(req, res, next)=>{

try {
    
    let gallery=[]
    for (let i = 0; i<req.files.gallery.length; i++) {
        gallery.push(req.files.gallery[i].filename)
         
    }
   
    const product= await Product.create({
        ...req.body,
        photo:req.files.photo[0].filename,
        gallery: gallery,
        category: req.body.category.split(','),
        tags: req.body.tags.split(',')
    });
    if(product){
        res.status(201).json({
            message: 'Created Successfully'
        })
    }else{
        next(createError(401, 'product created failled'))
    }
    
} catch (error) {
    console.log(error);
}

}
/**
 * @access private
 * @route /api/v1/shop
 * @method post
 */


export const updateProduct = async (req, res, next) => {
    const {id}=req.params
    try {
        const product= await Product.findByIdAndUpdate(id, req.body);
        res.status(201).json({
            message: 'Updated Successfully',
            product
            
            
        })
    } catch (error) {
        console.log(error);
    }

}
/**
 * @access private
 * @route /api/v1/shop
 * @method post
 */


export const deleteProduct = async (req, res, next) => {
    const {id}=req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(201).json({
            message: 'delete Successfully'
        })
    } catch (error) {
        console.log(error);
    }

}