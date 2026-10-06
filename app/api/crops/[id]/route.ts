import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Crop from '@/models/crops';

// Next.js Route Context Type Definition (Promise based for Next.js 15+)
type RouteContext = {
  params: Promise<{ id: string }>;
};

// DELETE: Remove a crop listing by ID
export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    
    // Await context.params properly
    const { id } = await context.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing Crop ID' },
        { status: 400 }
      );
    }

    const deletedCrop = await Crop.findByIdAndDelete(id);

    if (!deletedCrop) {
      return NextResponse.json(
        { success: false, error: 'Crop not found in database' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Crop deleted successfully' });
  } catch (error: any) {
    console.error('Delete Crop Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}