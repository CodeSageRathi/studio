'use server';

/**
 * @fileOverview Zod schemas and TypeScript types for the deals suggestion flow.
 */

import {z} from 'genkit';

export const SuggestDealsInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  currentStock: z.number().describe('The current stock level of the product.'),
  averageDailySales: z
    .number()
    .describe('The average daily sales volume of the product.'),
  daysUntilExpiration:
    z.number().optional().describe('Days until product expiration (if applicable).'),
  pastDeals: z.array(z.string()).optional().describe('Past deals run for this product'),
});

export type SuggestDealsInput = z.infer<typeof SuggestDealsInputSchema>;

export const SuggestDealsOutputSchema = z.object({
  dealSuggestion: z.string().describe('A suggested promotional deal for the product.'),
  reasoning: z.string().describe('The reasoning behind the suggested deal.'),
});

export type SuggestDealsOutput = z.infer<typeof SuggestDealsOutputSchema>;
