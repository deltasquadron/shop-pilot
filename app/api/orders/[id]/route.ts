import { NextRequest, NextResponse } from 'next/server';
import { mockOrders } from '@/data/orders';
import type { ApiResponse, Order } from '@/types';

// In-memory storage reference
let orders = [...mockOrders];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const order = orders.find(o => o.id === id);
  
  if (!order) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Order not found',
      data: null,
    };
    return NextResponse.json(response, { status: 404 });
  }
  
  const response: ApiResponse<Order> = {
    success: true,
    data: order,
  };
  
  return NextResponse.json(response);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if (orderIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Order not found',
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }
    
    // Update order (mainly status for MVP)
    const updatedOrder: Order = {
      ...orders[orderIndex],
      status: body.status || orders[orderIndex].status,
      updatedAt: new Date().toISOString(),
    };
    
    orders[orderIndex] = updatedOrder;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const response: ApiResponse<Order> = {
      success: true,
      data: updatedOrder,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update order',
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}