"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Role } from "@/types";
import { User, Briefcase } from "lucide-react";

export default function RoleSelectionPage() {
  const [role, setRole] = useState<Role>("buyer");
  const router = useRouter();

  const handleContinue = () => {
    router.push(`/dashboard?role=${role}`);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline">Select Your Role</CardTitle>
        <CardDescription>
          How would you like to use TradeFlow today?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          value={role}
          onValueChange={(value: Role) => setRole(value)}
          className="grid grid-cols-2 gap-4"
        >
          <Label
            htmlFor="buyer"
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              role === "buyer"
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-accent"
            }`}
          >
            <RadioGroupItem value="buyer" id="buyer" className="sr-only" />
            <User className={`w-10 h-10 mb-2 ${role === 'buyer' ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="font-semibold">Buyer</span>
          </Label>
          <Label
            htmlFor="supplier"
            className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
              role === "supplier"
                ? "border-primary bg-primary/10"
                : "border-muted hover:border-accent"
            }`}
          >
            <RadioGroupItem
              value="supplier"
              id="supplier"
              className="sr-only"
            />
             <Briefcase className={`w-10 h-10 mb-2 ${role === 'supplier' ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="font-semibold">Supplier</span>
          </Label>
        </RadioGroup>
        <Button
          onClick={handleContinue}
          className="w-full transition-transform hover:scale-105"
        >
          Continue as {role.charAt(0).toUpperCase() + role.slice(1)}
        </Button>
      </CardContent>
    </Card>
  );
}
