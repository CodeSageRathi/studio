'use server';
/**
 * @fileOverview A tool for fetching stock prices from the Alpha Vantage API.
 * 
 * - getStockPrice - A Genkit tool that retrieves the current price of a given stock ticker.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fetch from 'node-fetch';

const StockPriceInputSchema = z.object({
  ticker: z.string().describe('The stock ticker symbol, e.g., GOOGL, MSFT.'),
});

export const getStockPrice = ai.defineTool(
  {
    name: 'getStockPrice',
    description: 'Returns the current market value of a given stock ticker.',
    inputSchema: StockPriceInputSchema,
    outputSchema: z.object({
        price: z.number().describe('The current price of the stock.'),
        change: z.number().describe('The change in price since the last trading day.'),
        changePercent: z.string().describe('The percentage change in price since the last trading day.')
    }),
  },
  async (input) => {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
      throw new Error('ALPHA_VANTAGE_API_KEY is not defined in the environment.');
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${input.ticker}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Alpha Vantage API request failed with status ${response.status}`);
      }
      const data: any = await response.json();
      
      const quote = data['Global Quote'];
      if (!quote || Object.keys(quote).length === 0) {
        // This can happen if the API limit is reached or the ticker is invalid
        console.error('API Error or Invalid Ticker:', data);
        throw new Error('Could not retrieve stock quote. The ticker might be invalid or the API limit may have been reached.');
      }

      const price = parseFloat(quote['05. price']);
      const change = parseFloat(quote['09. change']);
      const changePercent = quote['10. change percent'];
      
      return { price, change, changePercent };

    } catch (error) {
      console.error('Error fetching stock price:', error);
      throw new Error('Failed to fetch stock price from Alpha Vantage.');
    }
  }
);
