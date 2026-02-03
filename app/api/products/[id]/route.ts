import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { products } from '@/data/products-storage';
import type { ApiResponse, Product } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Product not found',
      data: null,
    };
    return NextResponse.json(response, { status: 404 });
  }
  
  const response: ApiResponse<Product> = {
    success: true,
    data: product,
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
    
    const productIndex = products.findIndex(p => p.id === id);
    
    if (productIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found',
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }
    
    // Update product
    const updatedProduct: Product = {
      ...products[productIndex],
      name: body.name || products[productIndex].name,
      price: body.price !== undefined ? parseFloat(body.price) : products[productIndex].price,
      description: body.description !== undefined ? body.description : products[productIndex].description,
      category: body.category || products[productIndex].category,
      status: body.status || products[productIndex].status,
      images: body.images || products[productIndex].images,
      updatedAt: new Date().toISOString(),
    };
    
    products[productIndex] = updatedProduct;
    
    // Revalidate cache
    revalidatePath('/api/products');
    revalidatePath('/products');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const response: ApiResponse<Product> = {
      success: true,
      data: updatedProduct,
    };
    
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update product',
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const productIndex = products.findIndex(p => p.id === id);
  
  if (productIndex === -1) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Product not found',
      data: null,
    };
    return NextResponse.json(response, { status: 404 });
  }
  
  // Remove product
  products.splice(productIndex, 1);
  
  // Revalidate cache
  revalidatePath('/api/products');
  revalidatePath('/products');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const response: ApiResponse<null> = {
    success: true,
    data: null,
  };
  
  return NextResponse.json(response);
}