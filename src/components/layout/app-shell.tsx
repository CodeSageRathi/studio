"use client";

import React, { useState, createContext, useContext } from 'react';
import type { Role } from '@/types';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import Header from '@/components/layout/header';

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

export function AppShell({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('buyer');

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
