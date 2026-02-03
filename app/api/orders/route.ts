import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { orders } from '@/data/orders-storage';
import type { ApiResponse, PaginatedResponse, Order, PaginationParams } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredOrders = [...orders];
  
  // Apply search filter (search by customer name or order ID)
  if (search) {
    const searchLower = search.toLowerCase();
    filteredOrders = filteredOrders.filter(o => 
      o.customerName.toLowerCase().includes(searchLower) ||
      o.id.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply status filter
  if (status) {
    filteredOrders = filteredOrders.filter(o => o.status === status);
  }
  
  // Calculate pagination
  const total = filteredOrders.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
  
  const response: ApiResponse<PaginatedResponse<Order>> = {
    success: true,
    data: {
      data: paginatedOrders,
      total,
      page,
      limit,
      totalPages,
    },
  };
  
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.customerName || !body.customerEmail || !body.items || body.items.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required fields: customerName, customerEmail, items',
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    // Calculate total
    const total = body.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    // Generate new ID
    const maxId = orders.reduce((max, o) => {
      const num = parseInt(o.id.replace('ord-', ''), 10);
      return num > max ? num : max;
    }, 0);
    const newId = `ord-${String(maxId + 1).padStart(3, '0')}`;
    
    // Create new order
    const newOrder: Order = {
      id: newId,
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      items: body.items,
      total,
      status: body.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to storage
    orders.push(newOrder);
    
    // Revalidate cache
    revalidatePath('/api/orders');
    revalidatePath('/orders');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const response: ApiResponse<Order> = {
      success: true,
      data: newOrder,
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create order',
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}