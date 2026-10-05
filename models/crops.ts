import mongoose, { Schema, model, models } from 'mongoose';

const CropSchema = new Schema(
  {
    farmerName: { type: String, required: true },
    cropName: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    unitPrice: { type: Number, required: true },
    location: { type: String, required: true },
    isOrganic: { type: Boolean, default: false },
    images: [{ type: String }],
    description: { type: String, default: '' },
    harvestDate: { type: String },
  },
  { timestamps: true }
);

// Next.js hot-reloading এ যাতে বারবার মডেল রিক্রিয়েট না হয়
const Crop = models.Crop || model('Crop', CropSchema);

export default Crop;