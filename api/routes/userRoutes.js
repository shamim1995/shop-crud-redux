import express from "express";
import { createUser, deleteUser, getAllUser, getSingleUser, updateUser, userLogin, userRegister } from "../controllers/userController.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { userMiddleware } from "../middleware/userMiddleware.js";


// router init 

const router = express.Router();

//route manage

router.route('/').get(authMiddleware, adminMiddleware, getAllUser).post(authMiddleware, createUser)
router.route('/:id').get(authMiddleware, getSingleUser).put(authMiddleware, userMiddleware, updateUser).patch(authMiddleware, updateUser).delete(authMiddleware, userMiddleware, deleteUser)


// user login and registration 

router.post('/login', userLogin)
router.post('/register', userRegister)

//export router 

export default router;