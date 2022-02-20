import express from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
} from '../controllers/productController.js';
const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(protect, restrictTo('admin'), createProduct);

router.use(protect, restrictTo('admin'));
router.route('/:id').get(getProduct).delete(deleteProduct);

export default router;
