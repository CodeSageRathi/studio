
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
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Building, User, FileText, Globe, Truck, CircleDollarSign, List, Image as ImageIcon, Phone, CheckSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";


const supplierOnboardingSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  contactPerson: z.string().min(2, { message: "Contact person name is required." }),
  businessType: z.enum(["individual", "shop", "distributor", "manufacturer"]),
  gstNumber: z.string().optional(),
  productCategory: z.string({ required_error: "Please select a product category." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  pin: z.string().length(6, { message: "PIN code must be 6 digits." }),
  deliveryRadius: z.number().min(1).max(50),
  paymentModes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one payment mode.",
  }),
  whatsappNumber: z.string().optional(),
  deliveryMode: z.enum(["self", "platform", "third-party"]),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
  productList: z.any().optional(),
  businessLogo: z.any().optional(),
});

type SupplierOnboardingValues = z.infer<typeof supplierOnboardingSchema>;

const paymentOptions = [
  { id: "cash", label: "Cash" },
  { id: "upi", label: "UPI" },
  { id: "credit", label: "Credit/Debit Card" },
];

export default function SupplierOnboardingPage() {
  const form = useForm<SupplierOnboardingValues>({
    resolver: zodResolver(supplierOnboardingSchema),
    defaultValues: {
      businessName: "",
      contactPerson: "",
      businessType: "shop",
      productCategory: "",
      city: "",
      state: "",
      pin: "",
      deliveryRadius: 10,
      paymentModes: ["upi"],
      deliveryMode: "self",
      agreeToTerms: false,
    },
  });

  function onSubmit(data: SupplierOnboardingValues) {
    console.log(data);
    toast({
        title: "Profile Submitted!",
        description: "Your trusted supplier profile has been submitted for approval.",
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Become a Trusted Supplier</h1>
        <p className="text-muted-foreground">
          Fill out the details below to get a "Trusted" badge and increase your visibility.
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
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Building className="mr-2 h-4 w-4"/>Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Roy Edibles Co." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4"/>Contact Person</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Sourav Roy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><FileText className="mr-2 h-4 w-4"/>Business Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="shop">Shop</SelectItem>
                            <SelectItem value="distributor">Distributor</SelectItem>
                            <SelectItem value="manufacturer">Manufacturer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><FileText className="mr-2 h-4 w-4"/>GST Number or License ID (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your GST or License ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><List className="mr-2 h-4 w-4"/>Product Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="grains">Grains</SelectItem>
                            <SelectItem value="spices">Spices</SelectItem>
                            <SelectItem value="oils">Oils</SelectItem>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="textiles">Textiles</SelectItem>
                            <SelectItem value="hardware">Hardware</SelectItem>
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
                        <FormLabel className="flex items-center"><Phone className="mr-2 h-4 w-4"/>WhatsApp Number (Optional)</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your WhatsApp number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Column 2 */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <FormLabel className="flex items-center"><Globe className="mr-2 h-4 w-4"/>Business Location</FormLabel>
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
                    name="deliveryRadius"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Truck className="mr-2 h-4 w-4"/>Delivery Radius: {field.value} km</FormLabel>
                        <FormControl>
                            <Slider
                                min={1}
                                max={50}
                                step={1}
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                            />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deliveryMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Truck className="mr-2 h-4 w-4"/>Preferred Delivery Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                           <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select delivery mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="self">Self-Delivery</SelectItem>
                            <SelectItem value="platform">Platform Logistics</SelectItem>
                            <SelectItem value="third-party">Third-party Courier</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paymentModes"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                            <FormLabel className="flex items-center text-base"><CircleDollarSign className="mr-2 h-4 w-4"/>Available Payment Modes</FormLabel>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:gap-8 gap-2">
                        {paymentOptions.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="paymentModes"
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
                   <div className="space-y-2">
                        <FormLabel className="flex items-center"><ImageIcon className="mr-2 h-4 w-4" />Upload Business Logo / Banner (Optional)</FormLabel>
                        <FormControl><Input type="file" /></FormControl>
                    </div>
                     <div className="space-y-2">
                        <FormLabel className="flex items-center"><List className="mr-2 h-4 w-4" />Upload Product List (CSV, optional)</FormLabel>
                        <FormControl><Input type="file" accept=".csv" /></FormControl>
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

              <Button type="submit" className="w-full md:w-auto transition-transform hover:scale-105">Submit for Approval</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

    