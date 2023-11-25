import express from 'express';
import authController from '../controllers/user/authController.js';
const router = express.Router();


router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/logout', authController.logout);
router.get('/register', authController.register);
router.post('/register', authController.registerPost);

export default router;