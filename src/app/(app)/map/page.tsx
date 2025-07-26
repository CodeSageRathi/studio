
"use client";

import { useState, useMemo } from 'react';
import { MapPin, Search, CircleDot } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { mockUsers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

// Haversine formula to calculate distance between two lat/lng points
const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

// All users who are suppliers
const allSuppliers = Object.values(mockUsers).filter(u => u.role === 'supplier' && u.location);

// A central point for our search simulation (e.g., a major city center)
const searchCenter = { lat: 22.5650, lng: 88.3380, name: 'Prinsep Ghat, Kolkata' };

export default function MapPage() {
  const [radius, setRadius] = useState(5); // Default radius in km
  const [foundSuppliers, setFoundSuppliers] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    const nearby = allSuppliers.filter(supplier => {
      if (supplier.location) {
        const distance = getDistance(
          searchCenter.lat,
          searchCenter.lng,
          supplier.location.lat,
          supplier.location.lng
        );
        return distance <= radius;
      }
      return false;
    });
    setFoundSuppliers(nearby);
    // In a real app, you might want to re-center the map here
  };
  
  const mapUrl = useMemo(() => {
    // Basic map centered on our search area. A real implementation would be more dynamic.
    return `https://www.openstreetmap.org/export/embed.html?bbox=${searchCenter.lng-0.1},${searchCenter.lat-0.1},${searchCenter.lng+0.1},${searchCenter.lat+0.1}`;
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Locate Suppliers</h1>
        <p className="text-muted-foreground">
          Find suppliers and raw materials within your desired radius.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Nearby Search</CardTitle>
            <CardDescription>Enter a location and set a radius to find suppliers.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
                <Label htmlFor="location">Your Location</Label>
                {/* This is a controlled input, but we're using a fixed search center for demo */}
                <Input id="location" placeholder="e.g., Prinsep Ghat, Kolkata" defaultValue={searchCenter.name} />
            </div>
            <div>
                 <Label htmlFor="radius">Search Radius ({radius} km)</Label>
                 <Slider
                    id="radius"
                    min={2}
                    max={8}
                    step={1}
                    value={[radius]}
                    onValueChange={(value) => setRadius(value[0])}
                />
            </div>
            <Button onClick={handleSearch} className="transition-transform hover:scale-105">
                <Search className="mr-2 h-4 w-4" />
                Find Nearby
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden border">
            <iframe
              src={mapUrl}
              style={{ border: 0, width: '100%', height: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Suppliers Map"
            ></iframe>
            
            {/* Center Marker */}
            <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                 <div className="group relative flex flex-col items-center">
                    <CircleDot className="w-8 h-8 text-primary/80 animate-pulse" />
                    <div className="absolute bottom-full mb-2 w-max bg-card p-2 rounded-lg shadow-lg opacity-100 transition-opacity pointer-events-none text-xs">
                        <p className="font-semibold">{searchCenter.name}</p>
                    </div>
                </div>
            </div>
            
            {(isSearching ? foundSuppliers : allSuppliers).map((supplier, index) => {
                if(!supplier.location) return null;
                // This positioning is a simple approximation and not perfectly accurate on a projected map.
                const top = 50 - (supplier.location.lat - searchCenter.lat) * 500; // Adjusted multiplier for smaller bbox
                const left = 50 + (supplier.location.lng - searchCenter.lng) * 500; // Adjusted multiplier for smaller bbox

                return (
                    <div key={supplier.id} className="absolute" style={{ top: `${top}%`, left: `${left}%` }}>
                       <div className="group relative">
                        <MapPin className="w-10 h-10 text-destructive drop-shadow-lg cursor-pointer" />
                        <div className="absolute bottom-full mb-2 w-48 bg-card p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                           <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={supplier.avatar} alt={supplier.name} />
                                <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">{supplier.name}</p>
                                <p className="text-xs text-muted-foreground">{supplier.location.city}, {supplier.location.country}</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                )
            })}
          </div>
        </CardContent>
      </Card>

      {isSearching && (
        <Card>
            <CardHeader>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>Found {foundSuppliers.length} supplier(s) within {radius}km of {searchCenter.name}.</CardDescription>
            </CardHeader>
            <CardContent>
                {foundSuppliers.length > 0 ? (
                    <ul className="divide-y">
                        {foundSuppliers.map(supplier => (
                            <li key={supplier.id} className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={supplier.avatar} alt={supplier.name} />
                                        <AvatarFallback>{supplier.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{supplier.name}</p>
                                        <p className="text-sm text-muted-foreground">{supplier.location?.city}</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">View Details</Button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted-foreground text-center py-8">No suppliers found in this area. Try increasing the radius.</p>
                )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}
