import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import Crop from '@/models/crops';

// GET: Fetch all crops from MongoDB
export async function GET() {
  try {
    await connectToDatabase();
    const crops = await Crop.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: crops });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Add new crop to MongoDB
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newCrop = await Crop.create(body);
    return NextResponse.json({ success: true, data: newCrop }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}