import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      select: false,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

cartSchema.pre(/^find/, function (next) {
  this.populate('product');
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
