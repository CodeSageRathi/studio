import { config } from 'dotenv';
config();

import '@/ai/flows/deals-suggestions.ts';
import '@/ai/flows/ai-driven-reordering.ts';
import '@/ai/flows/ai-chatbot.ts';
import '@/ai/flows/advanced-search.ts';
import '@/ai/tools/stock-price.ts';
