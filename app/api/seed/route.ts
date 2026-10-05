import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import mongoose, { Schema, model, models } from 'mongoose';

const RegionalDataSchema = new Schema({
  region: String,
  cropName: String,
  avgYieldPerAcreKg: Number,
  avgMarketPricePerKg: Number,
});
const RegionalData = models.RegionalData || model('RegionalData', RegionalDataSchema);

export async function GET() {
  try {
    await connectToDatabase();

    await RegionalData.deleteMany({});

    // 🌾 All supported Regions & Crops in Farmer Form
    const benchmarkData = [
      // Bogura
      { region: 'Bogura', cropName: 'Potato', avgYieldPerAcreKg: 8000, avgMarketPricePerKg: 25 },
      { region: 'Bogura', cropName: 'Aman Rice', avgYieldPerAcreKg: 2000, avgMarketPricePerKg: 36 },
      { region: 'Bogura', cropName: 'Tomato', avgYieldPerAcreKg: 10000, avgMarketPricePerKg: 22 },
      { region: 'Bogura', cropName: 'Maize', avgYieldPerAcreKg: 3800, avgMarketPricePerKg: 26 },

      // Dinajpur
      { region: 'Dinajpur', cropName: 'Potato', avgYieldPerAcreKg: 7500, avgMarketPricePerKg: 24 },
      { region: 'Dinajpur', cropName: 'Aman Rice', avgYieldPerAcreKg: 2200, avgMarketPricePerKg: 38 },
      { region: 'Dinajpur', cropName: 'Tomato', avgYieldPerAcreKg: 9500, avgMarketPricePerKg: 20 },
      { region: 'Dinajpur', cropName: 'Maize', avgYieldPerAcreKg: 4200, avgMarketPricePerKg: 27 },

      // Jashore
      { region: 'Jashore', cropName: 'Potato', avgYieldPerAcreKg: 7000, avgMarketPricePerKg: 26 },
      { region: 'Jashore', cropName: 'Aman Rice', avgYieldPerAcreKg: 2100, avgMarketPricePerKg: 37 },
      { region: 'Jashore', cropName: 'Tomato', avgYieldPerAcreKg: 12000, avgMarketPricePerKg: 20 },
      { region: 'Jashore', cropName: 'Maize', avgYieldPerAcreKg: 3900, avgMarketPricePerKg: 28 },

      // Mymensingh
      { region: 'Mymensingh', cropName: 'Potato', avgYieldPerAcreKg: 7200, avgMarketPricePerKg: 25 },
      { region: 'Mymensingh', cropName: 'Aman Rice', avgYieldPerAcreKg: 2300, avgMarketPricePerKg: 37 },
      { region: 'Mymensingh', cropName: 'Tomato', avgYieldPerAcreKg: 11000, avgMarketPricePerKg: 21 },
      { region: 'Mymensingh', cropName: 'Maize', avgYieldPerAcreKg: 4000, avgMarketPricePerKg: 28 },
    ];

    await RegionalData.insertMany(benchmarkData);

    return NextResponse.json({ success: true, message: '🌱 All Regional Crop Data Seeded Successfully!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}