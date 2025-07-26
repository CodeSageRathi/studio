"use client";

import React, { useState, createContext, useContext, useEffect } from 'react';
import type { Role } from '@/types';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const roleFromQuery = searchParams.get('role') as Role | null;
  const [role, setRole] = useState<Role>(roleFromQuery || 'buyer');

  useEffect(() => {
    if (roleFromQuery) {
      setRole(roleFromQuery);
    }
  }, [roleFromQuery]);

  return (
    <AppShellContext.Provider value={{ role, setRole }}>
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
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <AppShellInternal>{children}</AppShellInternal>
    </React.Suspense>
  )
}
