import express from "express";
import { createStudent, deleteStudent, getAllStudents, getSingleStudent, updateStudent } from "../controllers/studentController.js";

// router init 

const router = express.Router();

//route manage

router.route('/').get(getAllStudents).post(createStudent)
router.route('/:id').get(getSingleStudent).put(updateStudent).patch(updateStudent).delete(deleteStudent)

//export router 

export default router;