import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
  {
    orderNumber: { type: String },
    cropId: { type: String },
    buyerId: { type: String, default: 'buyer-guest-101' },
    farmerName: { type: String, required: true },
    cropName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: 'Paid' },
    deliveryStatus: { type: String, default: 'Processing' },
    paymentMethod: { type: String, default: 'bKash Escrow' },
  },
  { timestamps: true }
);

export default models.Order || model('Order', OrderSchema);