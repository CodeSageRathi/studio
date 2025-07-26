'use server';

/**
 * @fileOverview An AI-powered product search flow that understands natural language intent.
 *
 * - advancedSearch - A function that performs the product search.
 * - AdvancedSearchInput - The input type for the advancedSearch function.
 * - AdvancedSearchOutput - The return type for the advancedSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdvancedSearchInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The search query expressed in natural language, e.g., \'cheap rice under ₹500 with delivery in 2 days\'.' // e.g., "cheap rice under ₹500 with delivery in 2 days".
    ),
});
export type AdvancedSearchInput = z.infer<typeof AdvancedSearchInputSchema>;

const AdvancedSearchOutputSchema = z.object({
  products: z
    .array(z.string())
    .describe('A list of product names that match the search query.'),
  reasoning: z
    .string()
    .describe(
      'The AI agent’s reasoning for selecting the products that matched the query.'
    ),
});
export type AdvancedSearchOutput = z.infer<typeof AdvancedSearchOutputSchema>;

export async function advancedSearch(input: AdvancedSearchInput): Promise<AdvancedSearchOutput> {
  return advancedSearchFlow(input);
}

const advancedSearchPrompt = ai.definePrompt({
  name: 'advancedSearchPrompt',
  input: {schema: AdvancedSearchInputSchema},
  output: {schema: AdvancedSearchOutputSchema},
  prompt: `You are an AI-powered product search assistant.  A user is providing a
search query in natural language, and your job is to identify a list of relevant
products that satisfy the query.  You should also provide a brief explanation of your
reasoning.

Query: {{{query}}}`,
});

const advancedSearchFlow = ai.defineFlow(
  {
    name: 'advancedSearchFlow',
    inputSchema: AdvancedSearchInputSchema,
    outputSchema: AdvancedSearchOutputSchema,
  },
  async input => {
    const {output} = await advancedSearchPrompt(input);
    return output!;
  }
);
