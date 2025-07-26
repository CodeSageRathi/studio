import Image from "next/image";
import { ShoppingCart, Star, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/lib/mock-data";

const wishlistedProducts = mockProducts.slice(0, 3);

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Wishlist</h1>
        <p className="text-muted-foreground">
          Products you've saved for later.
        </p>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardHeader className="p-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-xl"
                  data-ai-hint={product.dataAiHint}
                />
              </CardHeader>
              <div className="p-4 flex flex-col flex-grow">
                <Badge variant="secondary" className="w-fit">{product.category}</Badge>
                <h3 className="text-lg font-semibold font-headline mt-2">{product.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span>&bull;</span>
                  <span>{product.deliveryTime}</span>
                </div>
                <p className="text-xl font-bold font-headline mt-2">₹{product.price}<span className="text-sm font-normal text-muted-foreground">/kg</span></p>
                <div className="flex-grow" />
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="icon" className="transition-transform hover:scale-110 border-destructive text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <Button className="w-full transition-transform hover:scale-105">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <h3 className="text-xl font-semibold font-headline">Your wishlist is empty</h3>
            <p className="text-muted-foreground mt-2">
              Start browsing and add products you like!
            </p>
            <Button className="mt-4">Browse Products</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
