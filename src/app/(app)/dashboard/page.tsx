"use client"

import { useAppShell } from "@/components/layout/app-shell";
import { BuyerDashboard } from "@/components/dashboard/buyer-dashboard";
import { SupplierDashboard } from "@/components/dashboard/supplier-dashboard";

export default function DashboardPage() {
  const { role } = useAppShell();
  
  return (
    <>
      {role === 'buyer' ? <BuyerDashboard /> : <SupplierDashboard />}
    </>
  );
}
