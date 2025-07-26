
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  Bot,
  Boxes,
  Heart,
  Home,
  Lightbulb,
  MapPin,
  MessageSquare,
  Package,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { useAppShell } from './app-shell';
import { TradeFlowLogo } from '../icons';
import { mockUsers } from '@/lib/mock-data';

const buyerLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/products', label: 'Browse Products', icon: Search },
  { href: '/orders', label: 'My Orders', icon: ShoppingCart },
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/map', label: 'Locate Suppliers', icon: MapPin },
  { href: '/suppliers', label: 'Find Suppliers', icon: Users },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
];

const supplierLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/inventory', label: 'Inventory', icon: Boxes },
  { href: '/orders', label: 'Manage Orders', icon: Package },
  { href: 'deals', label: 'AI Deals', icon: Lightbulb },
  { href: '/buyers', label: 'Find Buyers', icon: Users },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
];

export default function SidebarNav() {
  const { role } = useAppShell();
  const pathname = usePathname();
  const links = role === 'buyer' ? buyerLinks : supplierLinks;

  useEffect(() => {
    // This is a simple way to simulate a database.
    // On the first load of the app shell, we check if the user "database" exists.
    // If not, we initialize it with our mock data.
    // This ensures that new users created during signup are added to a persistent list.
    const allUsers = localStorage.getItem('tradeflow-all-users');
    if (!allUsers) {
      localStorage.setItem('tradeflow-all-users', JSON.stringify(mockUsers));
    }
  }, []);


  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard">
          <TradeFlowLogo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                className="w-full justify-start transition-transform hover:scale-105"
                tooltip={link.label}
              >
                <Link href={link.href}>
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground p-4 text-center">
            © {new Date().getFullYear()} TradeFlow
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
