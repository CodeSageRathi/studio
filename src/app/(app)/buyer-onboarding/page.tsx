
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { User, Phone, Mail, Building, ShoppingBag, MapPin, Repeat, BarChart, CreditCard, Image as ImageIcon, CheckSquare } from "lucide-react";


const buyerOnboardingSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  mobileNumber: z.string().regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal('')),
  userType: z.enum(["individual", "shop_owner", "restaurant", "institution"]),
  buyingInterests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one buying interest.",
  }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  pin: z.string().length(6, { message: "PIN code must be 6 digits." }),
  purchaseFrequency: z.enum(["daily", "weekly", "monthly"]),
  expectedVolume: z.enum(["retail", "wholesale", "bulk"]),
  preferredPayment: z.string().optional(),
  whatsappNumber: z.string().optional(),
  profileImage: z.any().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type BuyerOnboardingValues = z.infer<typeof buyerOnboardingSchema>;

const buyingInterestOptions = [
  { id: "groceries", label: "Groceries & Grains" },
  { id: "spices", label: "Spices & Oils" },
  { id: "textiles", label: "Textiles" },
  { id: "hardware", label: "Hardware" },
  { id: "construction", label: "Construction Materials" },
  { id: "medicine", label: "Medicine & Pharma" },
];

export default function BuyerOnboardingPage() {
  const form = useForm<BuyerOnboardingValues>({
    resolver: zodResolver(buyerOnboardingSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      email: "",
      userType: "individual",
      buyingInterests: ["groceries"],
      city: "",
      state: "",
      pin: "",
      purchaseFrequency: "weekly",
      expectedVolume: "retail",
      agreeToTerms: false,
    },
  });

  function onSubmit(data: BuyerOnboardingValues) {
    console.log(data);
    toast({
        title: "Profile Created!",
        description: "Your trusted buyer profile is now active.",
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Create Your Buyer Profile</h1>
        <p className="text-muted-foreground">
          Fill out the details below to get a "Trusted" badge and let suppliers find you.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="space-y-8">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4"/>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Anjali Sharma" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4"/>Mobile Number (OTP-verified)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your 10-digit mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4"/>Email ID (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., anjali@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Building className="mr-2 h-4 w-4"/>User Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your user type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="individual">Individual Buyer</SelectItem>
                            <SelectItem value="shop_owner">Shop Owner</SelectItem>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="institution">Institution</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="buyingInterests"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                            <FormLabel className="flex items-center text-base"><ShoppingBag className="mr-2 h-4 w-4"/>Buying Interests</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                        {buyingInterestOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="buyingInterests"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Column 2 */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <FormLabel className="flex items-center"><MapPin className="mr-2 h-4 w-4"/>Location</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="City" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="State" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                      />
                    </div>
                     <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="PIN Code" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                      />
                  </div>
                  <FormField
                    control={form.control}
                    name="purchaseFrequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Repeat className="mr-2 h-4 w-4"/>Frequency of Purchase</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select purchase frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expectedVolume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><BarChart className="mr-2 h-4 w-4"/>Expected Volume</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select expected volume" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="wholesale">Wholesale</SelectItem>
                            <SelectItem value="bulk">Bulk</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredPayment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><CreditCard className="mr-2 h-4 w-4"/>Preferred Payment Method (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="netbanking">Net Banking</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4"/>WhatsApp Number (Optional, for notifications)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your WhatsApp number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="space-y-2">
                        <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4" />Upload Profile Image or Logo (Optional)</Form.Label>
                        <FormControl><Input type="file" /></FormControl>
                    </div>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Agree to our Terms and Conditions
                      </FormLabel>
                      <FormDescription>
                        You agree to our terms of service and privacy policy.
                      </FormDescription>
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto transition-transform hover:scale-105">Finish Registration</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
