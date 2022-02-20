import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'A product must have a category'],
    },
    photo: {
      type: 'String',
      required: [true, 'A product must have a photo'],
    },
    public_id: {
      type: 'String',
      required: [true, 'A product must have a public id'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
