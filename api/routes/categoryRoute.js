import express from 'express'
import { createCategory, deleteCategory, getAllCategory, getSingleCategory, updateCategory } from '../controllers/categoryController.js'
import uploadImage from '../middleware/multerMiddleware.js'


// initial 

const router = express.Router()

// router manage 

router.route('/').get(getAllCategory).post(uploadImage({
    fields:[
        {
            name:'photo',
            maxCoutn:1
        }
    ]
}), createCategory)
router.route('/:id').get(getSingleCategory).put(updateCategory).patch(updateCategory).delete(deleteCategory)

// export default 

export default router