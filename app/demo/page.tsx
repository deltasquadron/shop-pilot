'use client';

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeader, 
  TableCell 
} from "@/components/ui/Table";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { Pagination } from "@/components/common/Pagination";
import { EmptyState } from "@/components/common/EmptyState";

export default function ComponentDemo() {
  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold mb-8">UI Components Demo</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Buttons</h2>
        <div className="space-y-4">
          <div className="space-x-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="space-x-4">
            <Button size="sm">Small</Button>
            <Button>Medium (Default)</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="space-x-4">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Inputs</h2>
        <div className="space-y-4 max-w-md">
          <Input placeholder="Default input" />
          <Input variant="search" placeholder="Search..." />
          <Input error="This field is required" placeholder="Error state" />
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Select</h2>
        <div className="max-w-md">
          <Select>
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
          </Select>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Badges</h2>
        <div className="space-x-2">
          <Badge>Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge size="md">Large Badge</Badge>
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Table</h2>
        <Card className="p-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader sortable sortDirection="asc">Name</TableHeader>
                <TableHeader sortable>Email</TableHeader>
                <TableHeader sortable>Role</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>john@example.com</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell><Badge variant="success">Active</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jane Smith</TableCell>
                <TableCell>jane@example.com</TableCell>
                <TableCell>Editor</TableCell>
                <TableCell><Badge variant="success">Active</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob Wilson</TableCell>
                <TableCell>bob@example.com</TableCell>
                <TableCell>User</TableCell>
                <TableCell><Badge variant="warning">Pending</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Card</h2>
        <Card className="p-6 max-w-md">
          <h3 className="font-semibold mb-2">Card Title</h3>
          <p className="text-muted mb-4">This is a card component with padding and border. It can contain any content.</p>
          <Button>Card Action</Button>
        </Card>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Loading Spinner</h2>
        <div className="space-y-4">
          <LoadingSpinner message="Loading data..." />
          <LoadingSpinner size="sm" />
          <LoadingSpinner size="lg" />
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Error Message</h2>
        <div className="space-y-4 max-w-md">
          <ErrorMessage 
            title="Error Occurred" 
            message="Something went wrong while loading the data."
          />
          <ErrorMessage 
            title="Network Error" 
            message="Failed to connect to the server."
            onRetry={() => alert('Retrying...')}
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Pagination</h2>
        <div className="space-y-4">
          <Pagination 
            currentPage={1} 
            totalPages={10} 
            onPageChange={(page: number) => console.log('Page:', page)}
          />
          <Pagination 
            currentPage={5} 
            totalPages={10} 
            onPageChange={(page: number) => console.log('Page:', page)}
          />
          <Pagination 
            currentPage={10} 
            totalPages={10} 
            onPageChange={(page: number) => console.log('Page:', page)}
          />
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-border">Empty State</h2>
        <div className="space-y-4">
          <Card className="p-6">
            <EmptyState 
              title="No products found"
              description="Get started by creating your first product."
              actionLabel="Create Product"
              onAction={() => alert('Creating product...')}
            />
          </Card>
          <Card className="p-6">
            <EmptyState 
              title="No orders yet"
              description="Orders will appear here when customers make purchases."
            />
          </Card>
        </div>
      </section>
    </div>
  );
}