import { NextRequest, NextResponse } from 'next/server';
import { Schema, model, models } from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

const InvestmentSchema = new Schema({}, { strict: false });
const Investment = models.Investment || model('Investment', InvestmentSchema);

const RegionalDataSchema = new Schema({}, { strict: false });
const RegionalData = models.RegionalData || model('RegionalData', RegionalDataSchema);

// Next.js Route Context Type Definition (Promise based)
type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    
    // Await context.params properly
    const { id } = await context.params;
    const { analystNotes } = await req.json();

    // Fetch investment proposal
    const proposal = await Investment.findById(id);
    if (!proposal) {
      return NextResponse.json(
        { success: false, error: 'Proposal not found' },
        { status: 404 }
      );
    }

    // Fetch historical data for this region and crop
    const regData = await RegionalData.findOne({
      region: proposal.region,
      cropName: proposal.cropName,
    });

    if (!regData) {
      return NextResponse.json(
        { success: false, error: 'No regional yield data found for this region/crop' },
        { status: 400 }
      );
    }

    // Analyst ROI Calculation
    const calculatedYieldKg = proposal.landAreaAcres * regData.avgYieldPerAcreKg;
    const expectedRevenue = calculatedYieldKg * regData.avgMarketPricePerKg;
    const netProfit = expectedRevenue - proposal.targetAmount;
    const roiPercentage = Number(((netProfit / proposal.targetAmount) * 100).toFixed(2));

    // Update Project Status to Approved
    const updatedProposal = await Investment.findByIdAndUpdate(
      id,
      {
        status: 'Approved',
        calculatedYieldKg,
        expectedRevenue,
        roiPercentage,
        analystNotes: analystNotes || 'Verified based on regional historical crop yield data.',
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