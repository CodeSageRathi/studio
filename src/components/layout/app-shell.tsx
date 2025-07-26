"use client";

import React, { useState, createContext, useContext, useEffect } from 'react';
import type { Role } from '@/types';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';
import { useRouter } from 'next/navigation';

interface AppShellContextType {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
}

const AppShellContext = createContext<AppShellContextType | null>(null);

export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) {
    throw new Error('useAppShell must be used within an AppShellProvider');
  }
  return context;
}

function AppShellInternal({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('buyer');
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem('tradeflow-role') as Role | null;
    if (storedRole) {
      setRole(storedRole);
    } else {
      // If no role is set, redirect to role selection
      router.push('/role-selection');
    }
  }, [router]);

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem('tradeflow-role', newRole);
  }

  return (
    <AppShellContext.Provider value={{ role, setRole: handleSetRole as React.Dispatch<React.SetStateAction<Role>> }}>
      <SidebarProvider>
        <SidebarNav />
        <div className="flex flex-col flex-1 h-screen overflow-y-auto">
          <Header />
          <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
        </div>
      </SidebarProvider>
    </AppShellContext.Provider>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  // Using a Suspense boundary with a key on AppShellInternal that changes with the role
  // is a good practice if you notice state not resetting correctly between role changes.
  // For now, we'll keep it simple.
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AppShellInternal>{children}</AppShellInternal>
    </React.Suspense>
  )
}
