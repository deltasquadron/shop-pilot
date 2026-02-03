import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
    category: 'Electronics',
    status: 'active',
    images: [
      'https://picsum.photos/seed/headphones1/300/200.jpg',
      'https://picsum.photos/seed/headphones2/300/200.jpg'
    ],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:22:00Z'
  },
  {
    id: 'prod-002',
    name: 'Laptop Stand',
    price: 45.99,
    description: 'Ergonomic aluminum laptop stand with adjustable height',
    category: 'Office',
    status: 'active',
    images: [
      'https://picsum.photos/seed/laptopstand1/300/200.jpg',
      'https://picsum.photos/seed/laptopstand2/300/200.jpg'
    ],
    createdAt: '2024-01-16T09:15:00Z',
    updatedAt: '2024-01-18T11:45:00Z'
  },
  {
    id: 'prod-003',
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'RGB mechanical keyboard with customizable switches',
    category: 'Electronics',
    status: 'active',
    images: [
      'https://picsum.photos/seed/keyboard1/300/200.jpg',
      'https://picsum.photos/seed/keyboard2/300/200.jpg'
    ],
    createdAt: '2024-01-17T14:30:00Z',
    updatedAt: '2024-01-19T16:20:00Z'
  },
  {
    id: 'prod-004',
    name: 'Wireless Mouse',
    price: 29.99,
    description: 'Ergonomic wireless mouse with precision tracking',
    category: 'Electronics',
    status: 'inactive',
    images: [
      'https://picsum.photos/seed/mouse1/300/200.jpg',
      'https://picsum.photos/seed/mouse2/300/200.jpg'
    ],
    createdAt: '2024-01-18T11:00:00Z',
    updatedAt: '2024-01-20T10:15:00Z'
  },
  {
    id: 'prod-005',
    name: 'Desk Organizer',
    price: 24.99,
    description: 'Multi-compartment desk organizer for office supplies',
    category: 'Office',
    status: 'active',
    images: [
      'https://picsum.photos/seed/organizer1/300/200.jpg',
      'https://picsum.photos/seed/organizer2/300/200.jpg'
    ],
    createdAt: '2024-01-19T13:45:00Z',
    updatedAt: '2024-01-21T12:30:00Z'
  },
  {
    id: 'prod-006',
    name: 'USB-C Hub',
    price: 39.99,
    description: '7-in-1 USB-C hub with HDMI, USB-A, and SD card reader',
    category: 'Electronics',
    status: 'active',
    images: [
      'https://picsum.photos/seed/hub1/300/200.jpg',
      'https://picsum.photos/seed/hub2/300/200.jpg'
    ],
    createdAt: '2024-01-20T16:20:00Z',
    updatedAt: '2024-01-22T15:10:00Z'
  },
  {
    id: 'prod-007',
    name: 'Monitor Stand',
    price: 59.99,
    description: 'Adjustable monitor stand with storage drawer',
    category: 'Office',
    status: 'active',
    images: [
      'https://picsum.photos/seed/monitor1/300/200.jpg',
      'https://picsum.photos/seed/monitor2/300/200.jpg'
    ],
    createdAt: '2024-01-21T10:30:00Z',
    updatedAt: '2024-01-23T14:40:00Z'
  },
  {
    id: 'prod-008',
    name: 'Webcam',
    price: 89.99,
    description: '1080p HD webcam with built-in microphone',
    category: 'Electronics',
    status: 'active',
    images: [
      'https://picsum.photos/seed/webcam1/300/200.jpg',
      'https://picsum.photos/seed/webcam2/300/200.jpg'
    ],
    createdAt: '2024-01-22T14:15:00Z',
    updatedAt: '2024-01-24T13:20:00Z'
  },
  {
    id: 'prod-009',
    name: 'Desk Lamp',
    price: 34.99,
    description: 'LED desk lamp with adjustable brightness and color temperature',
    category: 'Office',
    status: 'active',
    images: [
      'https://picsum.photos/seed/lamp1/300/200.jpg',
      'https://picsum.photos/seed/lamp2/300/200.jpg'
    ],
    createdAt: '2024-01-23T09:45:00Z',
    updatedAt: '2024-01-25T11:30:00Z'
  },
  {
    id: 'prod-010',
    name: 'Bluetooth Speaker',
    price: 54.99,
    description: 'Portable Bluetooth speaker with 20-hour battery life',
    category: 'Electronics',
    status: 'active',
    images: [
      'https://picsum.photos/seed/speaker1/300/200.jpg',
      'https://picsum.photos/seed/speaker2/300/200.jpg'
    ],
    createdAt: '2024-01-24T12:20:00Z',
    updatedAt: '2024-01-26T13:10:00Z'
  }
];