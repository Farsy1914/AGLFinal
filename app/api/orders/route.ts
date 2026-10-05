import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '../../../lib/mongodb';
import Order from '@/models/orders';
import Crop from '@/models/crops';

export async function GET() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const orderNumber = `AGL-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Create New Order
    const newOrder = await Order.create({
      ...body,
      orderNumber,
    });

    // 2. Reduce Stock in MongoDB Crop Document
    let cropToUpdate = null;

    if (body.cropId && mongoose.Types.ObjectId.isValid(body.cropId)) {
      cropToUpdate = await Crop.findById(body.cropId);
    }

    // Fallback: If cropId is not ObjectId, find by Crop Name
    if (!cropToUpdate && body.cropName) {
      cropToUpdate = await Crop.findOne({ cropName: body.cropName });
    }

    if (cropToUpdate) {
      const updatedQuantity = Math.max(0, Number(cropToUpdate.quantity) - Number(body.quantity));
      await Crop.findByIdAndUpdate(cropToUpdate._id, { quantity: updatedQuantity });
    }

    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error('Order POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}