import express from 'express';

import { protect } from '../controllers/authController.js';
import {
  createCart,
  deleteCart,
  getAllCarts,
} from '../controllers/cartController.js';
const router = express.Router();

router.use(protect);
router.route('/').get(getAllCarts).post(createCart);
router.route('/:id').delete(deleteCart);
export default router;
