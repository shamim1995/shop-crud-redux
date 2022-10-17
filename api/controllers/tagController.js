import Tag from "../models/Tag.js"
import createError from "./errorHandlerController.js";




/**
 * @access public
 * @route /api/v1/shop
 * @method GEt
 */

export const getAllTag = async(req, res, next)=>{

    try {
        const tag = await Tag.find();
        res.status(200).json(tag)
        
    } catch (error) {
        console.log(error);
    }

}
/**
 * @access public
 * @route /api/v1/shop
 * @method GEt single 
 */

export const getSingleTag = async (req, res, next) => {
    const {id} =  req.params
    try {
        const tag = await Tag.findById(id);
       if (!tag) {
        next(createError(404, 'Product Not Found'))
       }else{
        res.status(200).json(tag)
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


export const createTag = async(req, res, next)=>{

try {
    await Tag.create({
        ...req.body
    });
    res.status(201).json({
        message:'Created Successfully'
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


export const updateTag = async (req, res, next) => {
    const {id}=req.params
    try {
        await Tag.findByIdAndUpdate(id, req.body);
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


export const deleteTag = async (req, res, next) => {
    const {id}=req.params
    try {
        await Tag.findByIdAndDelete(id);
        res.status(201).json({
            message: 'delete Successfully'
        })
    } catch (error) {
        console.log(error);
    }

}