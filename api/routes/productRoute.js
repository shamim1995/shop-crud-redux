import express from 'express'
import path, { resolve } from 'path'
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from '../controllers/productController.js'
import uploadImage from '../middleware/multerMiddleware.js';

// initial route

const router = express.Router();
const __dirname = resolve()

// router manage 

router.route('/').get(getAllProducts).post(uploadImage({
    fields: [{
            name: 'photo',
            maxCount: 1
        },
        {
            name: 'gallery',
            maxCount: 10
        }
    ]
}), createProduct)
router.route('/:id').get(getSingleProduct).put(updateProduct).patch(updateProduct).delete(deleteProduct)

// export default 

export default router