import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // set to true if users must be logged in
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: String,
      photo: String,
      size: String,
      price: Number,
      quantity: Number,
    },
  ],
  shippingInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'upi', 'card', 'netbanking'],
    required: true,
  },
  itemsPrice: { type: Number, required: true },
  totalQuantity: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing',
  },
  deliveredAt: { type: Date },
}, { timestamps: true });

export default orderSchema
