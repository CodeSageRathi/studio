import React from 'react';
import { DollarSign, Package, TrendingUp, AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/mock-data';
import { RevenueChart } from './revenue-chart';
import { StatsCard } from './stats-card';

const topProducts = [
  { ...mockProducts[1], sales: 250 },
  { ...mockProducts[0], sales: 180 },
  { ...mockProducts[3], sales: 150 },
];

const lowStockProducts = mockProducts.slice(0,2).map(p => ({...p, stock: Math.floor(Math.random() * 40) + 10}));


export function SupplierDashboard() {
  return (
    <div className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="₹1,25,430"
          icon={DollarSign}
          change="+20.1% from last month"
        />
        <StatsCard
          title="Total Orders"
          value="152"
          icon={Package}
          change="+18.3% from last month"
        />
        <StatsCard
          title="Conversion Rate"
          value="12.5%"
          icon={TrendingUp}
          change="+2.1% from last month"
        />
         <StatsCard
          title="Low Stock Items"
          value="2"
          icon={AlertCircle}
          change="Check inventory now"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RevenueChart />
        </div>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Your best performers this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
       <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Products that need restocking soon.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Stock Left</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-red-50/50">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <span className="font-bold text-destructive flex items-center justify-end">
                            <AlertCircle className="h-4 w-4 mr-2 animate-pulse" />
                            {product.stock}
                        </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

    </div>
  );
}
