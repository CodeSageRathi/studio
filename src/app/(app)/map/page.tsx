import { MapPin } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// In a real app, you would fetch suppliers with their location data
const suppliers = [mockUsers.supplier];

export default function MapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Locate Suppliers</h1>
        <p className="text-muted-foreground">
          Find suppliers on the map to better plan your logistics.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/1200x800.png"
              alt="Map of India"
              layout="fill"
              objectFit="cover"
              data-ai-hint="map india"
            />
            {/* In a real app, these markers would be dynamically placed based on coordinates */}
            <div className="absolute" style={{ top: '35%', left: '40%' }}>
               <div className="group relative">
                <MapPin className="w-10 h-10 text-destructive drop-shadow-lg cursor-pointer" />
                <div className="absolute bottom-full mb-2 w-48 bg-card p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={suppliers[0].avatar} alt={suppliers[0].name} />
                        <AvatarFallback>{suppliers[0].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{suppliers[0].name}</p>
                        <p className="text-xs text-muted-foreground">{suppliers[0].location?.city}, {suppliers[0].location?.country}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
