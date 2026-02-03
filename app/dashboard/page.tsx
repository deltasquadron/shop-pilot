'use client';

import { DashboardLayout } from './components/Layout';
import { Card, Badge } from '@/components';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Products',
    value: '1,284',
    change: '+12%',
    trend: 'up',
    icon: Package,
    color: 'blue',
  },
  {
    title: 'Total Orders',
    value: '856',
    change: '+8%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'green',
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: '+23%',
    trend: 'up',
    icon: TrendingUp,
    color: 'purple',
  },
  {
    title: 'Active Users',
    value: '2,420',
    change: '-5%',
    trend: 'down',
    icon: Users,
    color: 'orange',
  },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', amount: '$120.00', status: 'completed', date: '2024-02-03' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: '$85.50', status: 'processing', date: '2024-02-03' },
  { id: 'ORD-003', customer: 'Bob Johnson', amount: '$234.00', status: 'pending', date: '2024-02-02' },
  { id: 'ORD-004', customer: 'Alice Brown', amount: '$67.25', status: 'completed', date: '2024-02-02' },
  { id: 'ORD-005', customer: 'Charlie Wilson', amount: '$189.99', status: 'shipped', date: '2024-02-01' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard Overview">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-[var(--text-secondary)] mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[var(--text)]">{stat.value}</h3>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">vs last month</span>
                </div>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  stat.color === 'blue'
                    ? 'bg-blue-100 text-blue-600'
                    : stat.color === 'green'
                    ? 'bg-green-100 text-green-600'
                    : stat.color === 'purple'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-orange-100 text-orange-600'
                }`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--text)]">Recent Orders</h2>
          <a
            href="/orders"
            className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium"
          >
            View All
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--text-secondary)]">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--text-secondary)]">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--text-secondary)]">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--text-secondary)]">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[var(--text-secondary)]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 px-4 text-sm font-medium text-[var(--text)]">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">
                    {order.customer}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-[var(--text)]">
                    {order.amount}
                  </td>
                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        order.status === 'completed'
                          ? 'success'
                          : order.status === 'processing'
                          ? 'warning'
                          : order.status === 'shipped'
                          ? 'info'
                          : 'primary'
                      }
                      size="sm"
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--text-muted)]">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
