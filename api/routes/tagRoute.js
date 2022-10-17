import express from 'express'
import { createTag, deleteTag, getAllTag, getSingleTag, updateTag } from '../controllers/tagController.js'


// initial 

const router = express.Router()

// router manage 

router.route('/').get(getAllTag).post(createTag)
router.route('/:id').get(getSingleTag).put(updateTag).patch(updateTag).delete(deleteTag)

// export default 

export default router