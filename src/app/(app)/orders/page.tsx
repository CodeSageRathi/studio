import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { mockOrders } from "@/lib/mock-data";

export default function OrdersPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Live':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  const renderTable = (status: string) => (
     <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockOrders.filter(o => o.status === status).map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell className="text-right">₹{order.total.toLocaleString()}</TableCell>
            <TableCell className="text-center">
              <Badge variant={getStatusVariant(order.status) as any}>{order.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Orders</h1>
        <p className="text-muted-foreground">Track and manage your orders.</p>
      </div>
      <Card>
        <CardContent className="p-0">
        <Tabs defaultValue="live">
          <div className="p-4 border-b">
            <TabsList>
                <TabsTrigger value="live">Live</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="live" className="p-4">
            {renderTable('Live')}
          </TabsContent>
          <TabsContent value="pending" className="p-4">
             {renderTable('Pending')}
          </TabsContent>
          <TabsContent value="delivered" className="p-4">
            {renderTable('Delivered')}
          </TabsContent>
        </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
