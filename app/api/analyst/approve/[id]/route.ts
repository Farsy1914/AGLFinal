import { NextRequest, NextResponse } from 'next/server';
import { Schema, model, models } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

const InvestmentSchema = new Schema({}, { strict: false });
const Investment = models.Investment || model('Investment', InvestmentSchema);

const RegionalDataSchema = new Schema({}, { strict: false });
const RegionalData = models.RegionalData || model('RegionalData', RegionalDataSchema);

// Next.js Route Context Type Definition
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    
    // Await context.params
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));
    const analystNotes = body.analystNotes;

    // Fetch investment proposal
    const proposal = await Investment.findById(id);
    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Case-insensitive Search for historical regional data
    let regData = await RegionalData.findOne({
      region: { $regex: new RegExp(`^${proposal.region}$`, 'i') },
      cropName: { $regex: new RegExp(`^${proposal.cropName}$`, 'i') },
    });

    // Fallback logic if exact region/crop data isn't found in DB
    if (!regData) {
      regData = {
        avgYieldPerAcreKg: 2500, // Default benchmark yield (kg per acre)
        avgMarketPricePerKg: 45,  // Default market price per kg
      };
    }

    const landArea = proposal.landAreaAcres || 1;
    const targetAmount = proposal.targetAmount || 100000;

    // Analyst ROI Calculation using matched or fallback benchmark data
    const calculatedYieldKg = landArea * regData.avgYieldPerAcreKg;
    const expectedRevenue = calculatedYieldKg * regData.avgMarketPricePerKg;
    const netProfit = expectedRevenue - targetAmount;
    const roiPercentage = Number(((netProfit / targetAmount) * 100).toFixed(2));

    // Update Project Status to Approved
    const updatedProposal = await Investment.findByIdAndUpdate(
      id,
      {
        status: 'Approved',
        calculatedYieldKg,
        expectedRevenue,
        roiPercentage,
        analystNotes: analystNotes || 'Verified based on regional historical crop yield benchmarks.',
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedProposal });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}