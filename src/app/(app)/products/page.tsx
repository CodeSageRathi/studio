"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Search, ShoppingCart, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/types';
import { advancedSearch } from '@/ai/flows/advanced-search';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setProducts(mockProducts);
      setAiReasoning(null);
      return;
    }
    
    setIsLoading(true);
    setAiReasoning(null);
    try {
      const result = await advancedSearch({ query: searchQuery });
      // In a real app, you would fetch products based on the result.
      // Here we'll just filter mock data for demonstration.
      const foundProducts = mockProducts.filter(p => 
        result.products.some(resP => p.name.toLowerCase().includes(resP.toLowerCase()))
      );
      setProducts(foundProducts.length > 0 ? foundProducts : mockProducts.slice(0,2)); // show some results anyway
      setAiReasoning(result.reasoning);
    } catch (error) {
      console.error("Advanced search failed:", error);
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Discover Products</h1>
        <p className="text-muted-foreground">Browse our catalog or use AI-powered search to find what you need.</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <Input 
                placeholder="Try 'cheap rice under ₹100 with delivery in 2 days'" 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="spices">Spices</SelectItem>
                <SelectItem value="oils">Oils</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="rating">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {aiReasoning && (
        <Card className="bg-accent/20 border-accent">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <Search className="w-5 h-5" />
              AI Search Results
            </CardTitle>
            <CardDescription className="italic">&quot;{aiReasoning}&quot;</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({length: 8}).map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
              <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
              <CardContent><Skeleton className="h-4 w-1/2" /></CardContent>
              <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
            </Card>
          ))
        ) : (
          products.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-xl"
                  data-ai-hint={product.dataAiHint}
                />
              </CardHeader>
              <div className="p-4 flex flex-col flex-grow">
                <Badge variant="secondary" className="w-fit">{product.category}</Badge>
                <h3 className="text-lg font-semibold font-headline mt-2">{product.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span>&bull;</span>
                  <span>{product.deliveryTime}</span>
                </div>
                <p className="text-xl font-bold font-headline mt-2">₹{product.price}<span className="text-sm font-normal text-muted-foreground">/kg</span></p>
                <div className="flex-grow" />
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="icon" className="transition-transform hover:scale-110">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button className="w-full transition-transform hover:scale-105">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
