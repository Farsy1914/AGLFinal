import { NextResponse } from 'next/server';
import mongoose, { Schema, model, models } from 'mongoose';
import { connectToDatabase } from '../../../lib/mongodb';

const InvestmentSchema = new Schema(
  {
    farmerName: String,
    farmerPhone: String,
    title: String,
    cropName: String,
    region: String,
    landAreaAcres: Number,
    targetAmount: Number,
    raisedAmount: { type: Number, default: 0 },
    durationMonths: Number,
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Funded', 'Completed'], default: 'Pending' },
    calculatedYieldKg: Number,
    expectedRevenue: Number,
    roiPercentage: Number,
    analystNotes: String,
  },
  { timestamps: true }
);

const Investment = models.Investment || model('Investment', InvestmentSchema);

export async function GET() {
  try {
    await connectToDatabase();
    const proposals = await Investment.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: proposals });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // If _id exists, UPDATE existing investment document
    if (body._id && mongoose.Types.ObjectId.isValid(body._id)) {
      const updatedInvestment = await Investment.findByIdAndUpdate(
        body._id,
        {
          raisedAmount: body.raisedAmount,
          status: body.status,
        },
        { new: true }
      );
      return NextResponse.json({ success: true, data: updatedInvestment });
    }

    // Otherwise CREATE new investment application
    const newInvestment = await Investment.create({
      ...body,
      status: 'Pending',
    });

    return NextResponse.json({ success: true, data: newInvestment }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}