import express from 'express';

import {
  signup,
  login,
  protect,
  resetPassword,
  forgotPassword,
  getMe,
  getUser,
} from '../controllers/authController.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.use(protect);
router.get('/me', getMe, getUser);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

export default router;
