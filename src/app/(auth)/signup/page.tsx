import Link from "next/link";
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

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
        <CardDescription>
          Create an account to start trading on TradeFlow.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Anjali" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Sharma" required />
            </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button asChild type="submit" className="w-full transition-transform hover:scale-105">
          <Link href="/dashboard">Create an account</Link>
        </Button>
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
