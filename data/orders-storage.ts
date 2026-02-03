import { mockOrders } from '@/data/orders';
import type { Order } from '@/types';

declare global {
  var _orders: Order[] | undefined;
}

export const orders: Order[] = global._orders || [...mockOrders];

if (process.env.NODE_ENV !== 'production') {
  global._orders = orders;
}
