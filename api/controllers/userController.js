import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import createError from "./errorHandlerController.js";
import jwt from 'jsonwebtoken'

/**
 * @access public
 * @route /api/user
 * @method GEt
 */



export const getAllUser = async (req, res, next) => {

    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

/**
 * @access public
 * @route /api/user
 * @method GEt Single user
 */

export const getSingleUser= async (req, res, next) => {

   const { id } = req.params
    try {
        const user = await User.findById(id);

        if (!user) {
            return next(createError(404, "ID No availble here"))
        }
        if (user) {
            res.status(200).json(user)
        }


    } catch (error) {
        next(error)
    }

}

/**
 * @access public
 * @route /api/user
 * @method POST
 */

export const createUser = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt)

    try {
        const user = await User.create({
            ...req.body,
            password: hash_pass
        })
        res.status(200).json({
            message: 'Create Successfully'
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @access public
 * @route /api/user
 * @method PUT/PATCH
 */

export const updateUser = async (req, res, next) => {

    const { id } = req.params

    try {
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json({
            message: 'Updated Successfully'
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @access public
 * @route /api/student
 * @method DELETE
 */

export const deleteUser = async (req, res, next) => {
   const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            message: 'Delete Successfully'
        })
    } catch (error) {
        next(error)
    }
}


//login and register 


/**
 * @access public
 * @route /api/user/login
 * @method POST
 */

export const userLogin = async (req, res, next) => {

    
  try {
   
    // email check
    const userEmail = await User.findOne({email:req.body.email})

    if(!userEmail){
        next(createError(404, "User Not Found"))
    }

    //password check 

    const userPwd = await bcrypt.compare(req.body.password, userEmail.password)

    if(!userPwd){
        next(createError(404, "Wrong Password"))
    }


    //create token 

    const token = jwt.sign({id:userEmail._id, isAdmin:userEmail.isAdmin}, process.env.TOKEN_SECRET )

    const {password, isAdmin, ...user_info}=userEmail._doc

    res.cookie("access_token", token).status(200).json({
        token: token,
        user: user_info
       
    })


  } catch (error) {
    
  }
   
}
/**
 * @access public
 * @route /api/user/register
 * @method POST
 */

export const userRegister = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt)

    try {
        const userRegister = await User.create({...req.body, password: hash_pass })
        res.status(200).json(userRegister)
    } catch (error) {
        next(error)
    }
}