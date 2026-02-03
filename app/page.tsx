import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-primary mb-2">
          ShopPilot Admin
        </h1>
        <p className="text-muted mb-8">
          E-commerce Admin Dashboard
        </p>
        
        <div className="space-y-3">
          <Link href="/demo" className="block">
            <Button className="w-full">
              View UI Components Demo
            </Button>
          </Link>
          
          <div className="text-sm text-muted mt-6 pt-6 border-t border-border">
            <p className="mb-2">Phase 1 Complete ✅</p>
            <ul className="text-left space-y-1 pl-4">
              <li>• 10 UI Components</li>
              <li>• Type Definitions</li>
              <li>• Mock API Routes</li>
              <li>• Theme System</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}