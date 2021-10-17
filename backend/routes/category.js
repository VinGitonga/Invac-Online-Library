import express from 'express'
import {
    createCategory,
    removeCategory,
    categoryByID,
    listCategories,
} from '../controllers/category.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.route('/create_cat')
    .post(protect, createCategory)

router.route('/list')
    .get(listCategories)

router.route('/:catId')
    .delete(protect, removeCategory)

router.param('catId', categoryByID)

export default router;
