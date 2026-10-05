import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { 
      type: String, 
      enum: ['farmer', 'buyer', 'investor', 'admin', 'analyst'], 
      required: true 
    },
    location: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    nidNo: { type: String, default: '' },
    tradeLicenseNo: { type: String, default: '' },
    tinNo: { type: String, default: '' },
    payoutMethod: { type: String, default: 'bKash' },
    payoutAccount: { type: String, default: '' },
  },
  { timestamps: true }
);

export default models.User || model('User', UserSchema);