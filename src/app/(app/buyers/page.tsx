
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Mail, MessageSquare, Info, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types';
import { useAppShell } from '@/components/layout/app-shell';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function BuyersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allBuyers, setAllBuyers] = useState<User[]>([]);
  const router = useRouter();
  const { role } = useAppShell();

  useEffect(() => {
    // On component mount, load all users from localStorage.
    // The user list is initialized in the sidebar component to ensure it exists.
    const storedUsers = localStorage.getItem('tradeflow-all-users');
    const users = storedUsers ? JSON.parse(storedUsers) : {};
    setAllBuyers(Object.values(users).filter((u: any) => u.role === 'buyer'));
  }, []);

  const filteredBuyers = useMemo(() => {
    if (!searchQuery) {
      return allBuyers;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return allBuyers.filter(
      (buyer) =>
        buyer.name.toLowerCase().includes(lowercasedQuery) ||
        (buyer.email && buyer.email.toLowerCase().includes(lowercasedQuery))
    );
  }, [searchQuery, allBuyers]);
  
  const handleSendMessage = (buyerId: string) => {
    router.push(`/chat?contactId=${buyerId}`);
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Find Buyers</h1>
        <p className="text-muted-foreground">
          Search for potential buyers and new leads for your products.
        </p>
      </div>

       {role === 'supplier' && (
        <Alert>
            <Users className="h-4 w-4" />
            <AlertTitle>Want to reach more buyers?</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
                <p>Create a detailed supplier profile to get a &quot;Trusted&quot; badge and increase your visibility.</p>
                <Button asChild>
                    <Link href="/supplier-onboarding">Create Your Supplier Profile</Link>
                </Button>
            </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by buyer name or email..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {filteredBuyers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuyers.map((buyer) => (
            <Card key={buyer.id} className="flex flex-col">
               <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border">
                        <AvatarImage src={buyer.avatar} alt={buyer.name} />
                        <AvatarFallback>{buyer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle>{buyer.name}</CardTitle>
                    </div>
                </div>
               </CardHeader>
              <CardContent className="flex-grow space-y-3">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4"/>
                    <span>{buyer.email}</span>
                 </div>
              </CardContent>
              <CardFooter>
                 <Button className="w-full transition-transform hover:scale-105" onClick={() => handleSendMessage(buyer.id)}>
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
            <h3 className="text-xl font-semibold font-headline">No Buyers Found</h3>
            <p className="text-muted-foreground mt-2">
              Try a different search term to find the buyer you're looking for.
            </p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
