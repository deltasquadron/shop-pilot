import type { Order } from "../types";

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    items: [
      {
        productId: 'prod-001',
        name: 'Wireless Headphones',
        quantity: 1,
        price: 79.99
      }
    ],
    total: 79.99,
    status: 'processing',
    createdAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z'
  },
  {
    id: 'ord-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane.smith@example.com',
    items: [
      {
        productId: 'prod-002',
        name: 'Laptop Stand',
        quantity: 2,
        price: 45.99
      },
      {
        productId: 'prod-005',
        name: 'Desk Organizer',
        quantity: 1,
        price: 24.99
      }
    ],
    total: 116.97,
    status: 'shipped',
    createdAt: '2024-01-26T11:30:00Z',
    updatedAt: '2024-01-27T14:20:00Z'
  },
  {
    id: 'ord-003',
    customerName: 'Mike Johnson',
    customerEmail: 'mike.j@example.com',
    items: [
      {
        productId: 'prod-003',
        name: 'Mechanical Keyboard',
        quantity: 1,
        price: 129.99
      },
      {
        productId: 'prod-004',
        name: 'Wireless Mouse',
        quantity: 1,
        price: 29.99
      }
    ],
    total: 159.98,
    status: 'completed',
    createdAt: '2024-01-27T15:45:00Z',
    updatedAt: '2024-01-28T10:30:00Z'
  },
  {
    id: 'ord-004',
    customerName: 'Sarah Wilson',
    customerEmail: 'sarah.wilson@example.com',
    items: [
      {
        productId: 'prod-006',
        name: 'USB-C Hub',
        quantity: 3,
        price: 39.99
      }
    ],
    total: 119.97,
    status: 'pending',
    createdAt: '2024-01-28T13:20:00Z',
    updatedAt: '2024-01-28T13:20:00Z'
  },
  {
    id: 'ord-005',
    customerName: 'Tom Brown',
    customerEmail: 'tom.brown@example.com',
    items: [
      {
        productId: 'prod-007',
        name: 'Monitor Stand',
        quantity: 1,
        price: 59.99
      },
      {
        productId: 'prod-009',
        name: 'Desk Lamp',
        quantity: 2,
        price: 34.99
      }
    ],
    total: 129.97,
    status: 'processing',
    createdAt: '2024-01-29T16:10:00Z',
    updatedAt: '2024-01-30T09:15:00Z'
  },
  {
    id: 'ord-006',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@example.com',
    items: [
      {
        productId: 'prod-008',
        name: 'Webcam',
        quantity: 1,
        price: 89.99
      },
      {
        productId: 'prod-010',
        name: 'Bluetooth Speaker',
        quantity: 1,
        price: 54.99
      }
    ],
    total: 144.98,
    status: 'completed',
    createdAt: '2024-01-30T11:25:00Z',
    updatedAt: '2024-01-31T14:30:00Z'
  },
  {
    id: 'ord-007',
    customerName: 'David Miller',
    customerEmail: 'david.miller@example.com',
    items: [
      {
        productId: 'prod-001',
        name: 'Wireless Headphones',
        quantity: 2,
        price: 79.99
      }
    ],
    total: 159.98,
    status: 'cancelled',
    createdAt: '2024-01-31T14:40:00Z',
    updatedAt: '2024-02-01T10:20:00Z'
  },
  {
    id: 'ord-008',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.a@example.com',
    items: [
      {
        productId: 'prod-002',
        name: 'Laptop Stand',
        quantity: 1,
        price: 45.99
      },
      {
        productId: 'prod-005',
        name: 'Desk Organizer',
        quantity: 2,
        price: 24.99
      }
    ],
    total: 95.97,
    status: 'shipped',
    createdAt: '2024-02-01T09:30:00Z',
    updatedAt: '2024-02-02T13:15:00Z'
  },
  {
    id: 'ord-009',
    customerName: 'Robert Taylor',
    customerEmail: 'robert.t@example.com',
    items: [
      {
        productId: 'prod-003',
        name: 'Mechanical Keyboard',
        quantity: 1,
        price: 129.99
      }
    ],
    total: 129.99,
    status: 'pending',
    createdAt: '2024-02-02T12:45:00Z',
    updatedAt: '2024-02-02T12:45:00Z'
  },
  {
    id: 'ord-010',
    customerName: 'Anna White',
    customerEmail: 'anna.white@example.com',
    items: [
      {
        productId: 'prod-004',
        name: 'Wireless Mouse',
        quantity: 1,
        price: 29.99
      },
      {
        productId: 'prod-006',
        name: 'USB-C Hub',
        quantity: 1,
        price: 39.99
      }
    ],
    total: 69.98,
    status: 'processing',
    createdAt: '2024-02-03T10:15:00Z',
    updatedAt: '2024-02-03T10:15:00Z'
  }
];