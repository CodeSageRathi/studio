'use server';

/**
 * @fileOverview Deals suggestion AI agent.
 *
 * - suggestDeals - A function that suggests promotional deals for suppliers.
 * - SuggestDealsInputSchema - The Zod schema for the input.
 * - SuggestDealsInput - The input type for the suggestDeals function.
 * - SuggestDealsOutput - The return type for the suggestDeals function.
 */

import {ai} from '@/ai/genkit';
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

const SuggestDealsOutputSchema = z.object({
  dealSuggestion: z.string().describe('A suggested promotional deal for the product.'),
  reasoning: z.string().describe('The reasoning behind the suggested deal.'),
});

export type SuggestDealsOutput = z.infer<typeof SuggestDealsOutputSchema>;

export async function suggestDeals(input: SuggestDealsInput): Promise<SuggestDealsOutput> {
  return suggestDealsFlow(input);
}

const suggestDealsPrompt = ai.definePrompt({
  name: 'suggestDealsPrompt',
  input: {schema: SuggestDealsInputSchema},
  output: {schema: SuggestDealsOutputSchema},
  prompt: `You are an expert marketing advisor for suppliers looking to optimize their sales.
  Based on the current stock, sales data, and product information, you will suggest a promotional deal that the supplier can offer to buyers.
  Consider factors such as product perishability, stock levels, and sales velocity to determine the most effective deal type.
  Explain your reasoning for suggesting the deal.

  Product Name: {{{productName}}}
  Current Stock: {{{currentStock}}}
  Average Daily Sales: {{{averageDailySales}}}
  {{#if daysUntilExpiration}}Days Until Expiration: {{{daysUntilExpiration}}}{{/if}}
  {{#if pastDeals}}Past Deals: {{#each pastDeals}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

  Suggest a promotional deal and explain your reasoning.
  `,
});

const suggestDealsFlow = ai.defineFlow(
  {
    name: 'suggestDealsFlow',
    inputSchema: SuggestDealsInputSchema,
    outputSchema: SuggestDealsOutputSchema,
  },
  async input => {
    const {output} = await suggestDealsPrompt(input);
    return output!;
  }
);
