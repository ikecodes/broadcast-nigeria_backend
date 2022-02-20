import Cart from '../model/cartModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllCarts = catchAsync(async (req, res, next) => {
  const carts = await Cart.find({ user: req.user });
  res.status(200).json({
    status: 'success',
    message: 'successfully created',
    carts,
  });
});
export const createCart = catchAsync(async (req, res, next) => {
  const alreadyCart = await Cart.findOne({ product: req.body.prodId });
  if (alreadyCart) return next(new AppError('Product already in cart', 403));
  const cart = await Cart.create({
    user: req.user,
    product: req.body.prodId,
  });
  const newCart = await Cart.findById(cart._id);
  res.status(200).json({
    status: 'success',
    message: 'successfully created',
    newCart,
  });
});

export const deleteCart = catchAsync(async (req, res, next) => {
  await Cart.deleteOne({ _id: req.params.id, user: req.user });
  res.status(204).json({
    status: 'success',
    message: 'successfully removed cart',
  });
});
