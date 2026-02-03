import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { products } from '@/data/products-storage';
import type { ApiResponse, PaginatedResponse, Product, PaginationParams } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filteredProducts = [...products];
  
  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Apply status filter
  if (status) {
    filteredProducts = filteredProducts.filter(p => p.status === status);
  }
  
  // Calculate pagination
  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  const response: ApiResponse<PaginatedResponse<Product>> = {
    success: true,
    data: {
      data: paginatedProducts,
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
    if (!body.name || !body.price || !body.category) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required fields: name, price, category',
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }
    
    // Generate new ID
    const maxId = products.reduce((max, p) => {
      const num = parseInt(p.id.replace('prod-', ''), 10);
      return num > max ? num : max;
    }, 0);
    const newId = `prod-${String(maxId + 1).padStart(3, '0')}`;
    
    // Create new product
    const newProduct: Product = {
      id: newId,
      name: body.name,
      price: parseFloat(body.price),
      description: body.description || '',
      category: body.category,
      status: body.status || 'active',
      images: body.images || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Add to storage
    products.push(newProduct);
    
    // Revalidate cache
    revalidatePath('/api/products');
    revalidatePath('/products');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const response: ApiResponse<Product> = {
      success: true,
      data: newProduct,
    };
    
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create product',
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}