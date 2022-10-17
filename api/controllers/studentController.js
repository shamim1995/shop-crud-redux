
import Student from "../models/Student.js"
import bcrypt from 'bcryptjs'
import createError from "./errorHandlerController.js";

/**
 * @access public
 * @route /api/student
 * @method GEt
 */



export const getAllStudents = async (req, res, next) =>{

    try {
        const students= await Student.find();
        res.status(200).json(students)
    } catch (error) {
        next(error)
    }
}

/**
 * @access public
 * @route /api/student
 * @method GEt Single Student
 */

export const getSingleStudent = async (req, res, next) => {

    const {id}= req.params

    try {
        const student = await Student.findById(id);

        if (!student){
           return next(createError(404, "ID No availble here"))
        }
        if(student){
            res.status(200).json(student)
        }

        
    } catch (error) {
       next(error)
    }
    
}

/**
 * @access public
 * @route /api/student
 * @method POST
 */

export const createStudent = async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt)

    try {
        const student = await Student.create({ ...req.body, password:hash_pass })
        res.status(200).json({
            message:'Create Successfully'
        })
    } catch (error) {
        next(error)
    }
}

/**
 * @access public
 * @route /api/student
 * @method PUT/PATCH
 */

export const updateStudent = async (req, res, next) => {

    const {id}= req.params

    try {
        const student = await Student.findByIdAndUpdate(id, req.body, { new:true })
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

export const deleteStudent = async (req, res, next) => {
 const {id}= req.params;
 try {
    const student = await Student.findByIdAndDelete(id);
    res.status(200).json({
        message: 'Delete Successfully'
    })
 } catch (error) {
     next(error)
 }
}