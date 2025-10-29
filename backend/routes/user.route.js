import express from 'express';
import { register, login, logout, updateProfile, getUserProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.get('/profile', isAuthenticated, getUserProfile);
router.put('/profile/update', isAuthenticated, updateProfile);

export default router;

