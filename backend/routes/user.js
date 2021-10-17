import express from 'express'
import { 
    login,
    signup,
    authenticateGoogle
 } from '../controllers/user.js'


const router = express.Router()

router.route('/login')
    .post(login)

router.route('/signup')
    .post(signup)

router.route('/google')
    .post(authenticateGoogle)

export default router;