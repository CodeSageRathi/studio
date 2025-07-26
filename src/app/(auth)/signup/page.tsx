"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { mockUsers } from "@/lib/mock-data";

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName} ${lastName}`;
    const role = localStorage.getItem('tradeflow-role') || 'buyer';

    // Get existing users from localStorage or start with mock data
    const allUsers = JSON.parse(localStorage.getItem('tradeflow-all-users') || JSON.stringify(mockUsers));
    
    // Create new user object
    const newUser = {
      id: `user-${Date.now()}`,
      name: fullName,
      email: email,
      role: role,
      avatar: 'https://placehold.co/100x100.png',
      location: role === 'supplier' ? { lat: 28.6139, lng: 77.2090, city: 'New Delhi', country: 'India' } : undefined
    };

    // Add the new user to the list
    allUsers[newUser.id] = newUser;

    // Save the updated user list and current user info
    localStorage.setItem('tradeflow-all-users', JSON.stringify(allUsers));
    localStorage.setItem('tradeflow-user-name', fullName);
    localStorage.setItem('tradeflow-user-email', email);
    
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>
          Create an account to start trading on TradeFlow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input 
                id="first-name" 
                placeholder="Anjali" 
                required 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input 
                id="last-name" 
                placeholder="Sharma" 
                required 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full transition-transform hover:scale-105">
            Create an account
          </Button>
        </form>
      </CardContent>
      <div className="mt-4 p-6 pt-0 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline text-accent">
          Login
        </Link>
      </div>
    </Card>
  );
}
