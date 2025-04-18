// src/ai/flows/generate-financial-tips.ts
'use server';

/**
 * @fileOverview Generates personalized financial tips based on user input.
 *
 * This file defines a Genkit flow that takes user's age, income, and financial goals as input
 * and generates tailored financial advice.
 *
 * @exports generateFinancialTips - The main function to trigger the financial advice generation.
 * @exports FinancialTipsInput - The input type for the generateFinancialTips function.
 * @exports FinancialTipsOutput - The output type for the generateFinancialTips function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const FinancialTipsInputSchema = z.object({
  age: z.number().describe('The user\u0027s age.'),
  income: z.number().describe('The user\u0027s annual income.'),
  financialGoals: z.string().describe('The user\u0027s financial goals.'),
});
export type FinancialTipsInput = z.infer<typeof FinancialTipsInputSchema>;

const FinancialTipsOutputSchema = z.object({
  financialTips: z.string().describe('Personalized financial tips for the user.'),
});
export type FinancialTipsOutput = z.infer<typeof FinancialTipsOutputSchema>;

export async function generateFinancialTips(input: FinancialTipsInput): Promise<FinancialTipsOutput> {
  return generateFinancialTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'financialTipsPrompt',
  input: {
    schema: z.object({
      age: z.number().describe('The user\u0027s age.'),
      income: z.number().describe('The user\u0027s annual income.'),
      financialGoals: z.string().describe('The user\u0027s financial goals.'),
    }),
  },
  output: {
    schema: z.object({
      financialTips: z.string().describe('Personalized financial tips for the user.'),
    }),
  },
  prompt: `You are a financial advisor. Based on the user's age, income, and financial goals, generate personalized financial tips.

  Age: {{{age}}}
  Income: {{{income}}}
  Financial Goals: {{{financialGoals}}}

  Financial Tips: `,
});

const generateFinancialTipsFlow = ai.defineFlow<
  typeof FinancialTipsInputSchema,
  typeof FinancialTipsOutputSchema
>({
  name: 'generateFinancialTipsFlow',
  inputSchema: FinancialTipsInputSchema,
  outputSchema: FinancialTipsOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
