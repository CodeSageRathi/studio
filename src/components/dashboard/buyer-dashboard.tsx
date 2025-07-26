"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { DollarSign, ShoppingBag, ShoppingCart } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOrders, mockProducts } from '@/lib/mock-data';
import { SalesChart } from './sales-chart';
import { StatsCard } from './stats-card';
import { suggestReorder } from '@/ai/flows/ai-driven-reordering';
import type { SuggestReorderOutput } from '@/ai/flows/ai-driven-reordering';
import { Skeleton } from '../ui/skeleton';

const mostPurchased = [
  { ...mockProducts[0], orders: 15 },
  { ...mockProducts[2], orders: 12 },
  { ...mockProducts[1], orders: 10 },
];

export function BuyerDashboard() {
  const [reorderSuggestion, setReorderSuggestion] = useState<SuggestReorderOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestReorder = async () => {
    setIsLoading(true);
    setReorderSuggestion(null);
    try {
      // In a real app, you'd pass the actual buyer ID
      const suggestion = await suggestReorder({ buyerId: 'user-1' });
      setReorderSuggestion(suggestion);
    } catch (error) {
      console.error("Failed to get reorder suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Orders"
          value="24"
          icon={ShoppingBag}
          change="+5 since last month"
        />
        <StatsCard
          title="Total Spend"
          value="₹45,231"
          icon={DollarSign}
          change="+12% since last month"
        />
        <StatsCard
          title="Avg. Order Value"
          value="₹1,884"
          icon={ShoppingCart}
          change="-2% since last month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Spending Overview</CardTitle>
            <CardDescription>Your spending over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Most Purchased Products</CardTitle>
            <CardDescription>Your frequently bought items.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mostPurchased.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.orders}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Driven Reordering Assistant</CardTitle>
          <CardDescription>Get smart suggestions for your next order based on your purchase history.</CardDescription>
        </CardHeader>
        <CardContent>
          {!reorderSuggestion && !isLoading && (
             <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-xl">
                <p className="mb-4 text-muted-foreground">Ready to restock? Let our AI help you out.</p>
                <Button onClick={handleSuggestReorder} disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Suggest My Next Order'}
                </Button>
            </div>
          )}
          {isLoading && (
             <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          )}
          {reorderSuggestion && (
            <div className="space-y-4">
              <p className="italic text-muted-foreground">&quot;{reorderSuggestion.reasoning}&quot;</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockProducts.slice(0, 3).map((item, index) => (
                   <Card key={item.id} className="flex flex-col">
                     <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="rounded-md" data-ai-hint={item.dataAiHint} />
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription>Suggested: {index === 0 ? 20 : 15} units</CardDescription>
                        </div>
                     </CardHeader>
                     <CardContent className="flex-grow flex items-end">
                       <Button className="w-full mt-2 transition-transform hover:scale-105">
                         <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                       </Button>
                     </CardContent>
                   </Card>
                ))}
              </div>
               <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setReorderSuggestion(null)}>Clear</Button>
                  <Button onClick={handleSuggestReorder} disabled={isLoading}>
                    {isLoading ? 'Regenerating...' : 'Regenerate'}
                  </Button>
                </div>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
