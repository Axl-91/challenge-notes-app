import express from 'express';
import * as authController from '../controllers/authController.js'

const router = express.Router();

router.get('/me', authController.getSession)
router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

export default router;
