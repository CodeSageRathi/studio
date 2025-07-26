'use server';

/**
 * @fileOverview AI Chatbot flow for handling user queries.
 *
 * - aiChatbot - A function that processes user queries and returns a response from the AI chatbot.
 * - AIChatbotInput - The input type for the aiChatbot function.
 * - AIChatbotOutput - The return type for the aiChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getStockPrice } from '@/ai/tools/stock-price';

const AIChatbotInputSchema = z.object({
  query: z.string().describe('The user query for the AI chatbot.'),
});
export type AIChatbotInput = z.infer<typeof AIChatbotInputSchema>;

const AIChatbotOutputSchema = z.object({
  response: z.string().describe('The response from the AI chatbot.'),
});
export type AIChatbotOutput = z.infer<typeof AIChatbotOutputSchema>;

export async function aiChatbot(input: AIChatbotInput): Promise<AIChatbotOutput> {
  return aiChatbotFlow(input);
}

const aiChatbotPrompt = ai.definePrompt({
  name: 'aiChatbotPrompt',
  input: {schema: AIChatbotInputSchema},
  output: {schema: AIChatbotOutputSchema},
  tools: [getStockPrice],
  prompt: `You are a helpful AI chatbot designed to answer user questions about the TradeFlow platform, products, orders, and other relevant topics.
  
  If the user asks about a stock price, use the getStockPrice tool to get the current price and include it in your answer.

  Respond to the following user query:
  {{query}}`,
});

const aiChatbotFlow = ai.defineFlow(
  {
    name: 'aiChatbotFlow',
    inputSchema: AIChatbotInputSchema,
    outputSchema: AIChatbotOutputSchema,
  },
  async input => {
    const {output} = await aiChatbotPrompt(input);
    return output!;
  }
);
