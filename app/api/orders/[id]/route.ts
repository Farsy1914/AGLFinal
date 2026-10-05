import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/orders';

// Next.js Route Context Type Definition
type RouteContext = {
  params: Promise<{ id: string }>;
};

// 1. GET Single Order
export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 2. PATCH Update Order
export async function PATCH(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;

    const body = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedOrder });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// 3. DELETE Order
export async function DELETE(
  req: NextRequest,
  context: RouteContext
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}