"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lightbulb, Loader2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { suggestDeals, SuggestDealsInputSchema, type SuggestDealsInput, type SuggestDealsOutput } from "@/ai/flows/deals-suggestions"
import { Skeleton } from "@/components/ui/skeleton"

export default function DealsPage() {
  const [suggestion, setSuggestion] = useState<SuggestDealsOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SuggestDealsInput>({
    resolver: zodResolver(SuggestDealsInputSchema),
    defaultValues: {
      productName: "",
      currentStock: 1000,
      averageDailySales: 50,
      daysUntilExpiration: 90,
      pastDeals: [],
    },
  })

  async function onSubmit(values: SuggestDealsInput) {
    setIsLoading(true)
    setSuggestion(null)
    try {
      const result = await suggestDeals(values)
      setSuggestion(result)
    } catch (error) {
      console.error("Failed to suggest deals", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Deal Suggestions</h1>
        <p className="text-muted-foreground">
          Let AI help you create the perfect promotion to boost your sales.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Provide details about the product you want to promote.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Basmati Rice" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="currentStock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Stock (units)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="averageDailySales"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Daily Sales (units)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="daysUntilExpiration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Days Until Expiration (optional)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full transition-transform hover:scale-105" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                      "Suggest a Deal"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-amber-500" />
                        Suggested Deal
                    </CardTitle>
                    <CardDescription>
                        Here&apos;s what our AI recommends for your product.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-8 w-1/3 mt-4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    )}
                    {!isLoading && !suggestion && (
                        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-xl h-full">
                            <Lightbulb className="w-12 h-12 text-muted-foreground/50 mb-4" />
                            <p className="text-muted-foreground">Your AI-generated deal will appear here.</p>
                        </div>
                    )}
                    {suggestion && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold font-headline text-accent">Deal Suggestion</h3>
                                <p className="text-2xl font-bold font-headline mt-1">{suggestion.dealSuggestion}</p>
                            </div>
                             <div>
                                <h3 className="text-lg font-semibold font-headline">Reasoning</h3>
                                <p className="text-muted-foreground italic mt-1">&quot;{suggestion.reasoning}&quot;</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
