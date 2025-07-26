
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Search, Mail, MessageSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allSuppliers, setAllSuppliers] = useState<User[]>([]);

  useEffect(() => {
    // On component mount, load all users from localStorage.
    // The user list is initialized in the sidebar component to ensure it exists.
    const storedUsers = localStorage.getItem('tradeflow-all-users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};
    setAllSuppliers(Object.values(users).filter((u: any) => u.role === 'supplier'));
  }, []);

  const filteredSuppliers = useMemo(() => {
    if (!searchQuery) {
      return allSuppliers;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return allSuppliers.filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(lowercasedQuery) ||
        (supplier.email && supplier.email.toLowerCase().includes(lowercasedQuery))
    );
  }, [searchQuery, allSuppliers]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Find Suppliers</h1>
        <p className="text-muted-foreground">
          Search for suppliers by their name, company, or email.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by supplier name, company, or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {filteredSuppliers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <Card key={supplier.id} className="flex flex-col">
               <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border">
                        <AvatarImage src={supplier.avatar} alt={supplier.name} />
                        <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{supplier.name}</CardTitle>
                        <CardDescription>{supplier.location?.city}</CardDescription>
                    </div>
                </div>
               </CardHeader>
              <CardContent className="flex-grow space-y-3">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4"/>
                    <span>{supplier.email}</span>
                 </div>
              </CardContent>
              <CardFooter>
                 <Button className="w-full transition-transform hover:scale-105">
                   <MessageSquare className="mr-2 h-4 w-4" />
                   Send Message
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold font-headline">No Suppliers Found</h3>
            <p className="text-muted-foreground mt-2">
              Try a different search term to find the supplier you're looking for.
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
