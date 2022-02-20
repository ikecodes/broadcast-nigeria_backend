import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Product from '../model/productModel.js';
import cloudinary from '../utils/cloudinary.js';

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'successfull',
    products,
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }
  res.status(200).json({
    status: 'successfull',
    message: 'Product successfully create',
    product,
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const fileStr = req.body.photo;
  const { secure_url, public_id } = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'product_images',
  });
  // await cloudinary.uploader.destroy(user.cloudinary_id);
  const newProduct = await Product.create({
    name: req.body.name,
    category: req.body.category,
    photo: secure_url,
    public_id: public_id,
    price: req.body.price,
    description: req.body.description,
  });
  res.status(200).json({
    status: 'successfull',
    message: 'Product successfully create',
    newProduct,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.deleteOne({ _id: req.params.id });
  if (!product) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'successfull',
    message: 'Product successfully deleted',
  });
});
