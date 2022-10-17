import Category from "../models/Category.js"
import createError from "./errorHandlerController.js";




/**
 * @access public
 * @route /api/v1/shop
 * @method GEt
 */

export const getAllCategory = async(req, res, next)=>{

    try {
        const category = await Category.find();
        res.status(200).json(category)
        
    } catch (error) {
        console.log(error);
    }

}
/**
 * @access public
 * @route /api/v1/shop
 * @method GEt single 
 */

export const getSingleCategory = async (req, res, next) => {
    const {id} =  req.params
    try {
        const category = await Category.findById(id);
       if (!category) {
        next(createError(404, 'Product Not Found'))
       }else{
        res.status(200).json(category)
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


export const createCategory = async(req, res, next)=>{

try {
    await Category.create({
        ...req.body,
        photo:req.files.photo[0].filename
    });
    res.status(201).json({
        message:'Created Successfully'
    })
} catch (error) {
    console.log(next(error));
}

}
/**
 * @access private
 * @route /api/v1/shop
 * @method post
 */


export const updateCategory = async (req, res, next) => {
    const {id}=req.params
    try {
        await Category.findByIdAndUpdate(id, req.body);
        res.status(201).json({
            message: 'Updated Successfully'
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


export const deleteCategory = async (req, res, next) => {
    const {id}=req.params
    try {
        await Category.findByIdAndDelete(id);
        res.status(201).json({
            message: 'delete Successfully'
        })
    } catch (error) {
        console.log(error);
    }

}