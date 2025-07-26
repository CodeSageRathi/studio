import type { LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatsCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    change: string;
}

export function StatsCard({ title, value, icon: Icon, change }: StatsCardProps) {
    const isPositive = change.startsWith('+');
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-body">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-headline">{value}</div>
                <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {change}
                </p>
            </CardContent>
        </Card>
    );
}
