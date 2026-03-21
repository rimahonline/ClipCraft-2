'use server';
/**
 * @fileOverview A Genkit flow for generating multi-slide social media carousel content.
 *
 * - generateCarouselContent - A function that generates carousel slide content.
 * - GenerateCarouselInput - The input type for the function.
 * - GenerateCarouselOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCarouselInputSchema = z.object({
  topic: z.string().describe('The main topic or lesson for the carousel.'),
  platform: z.enum(['Instagram', 'LinkedIn', 'Facebook']).describe('The target platform.'),
  slideCount: z.number().min(3).max(10).default(5).describe('Number of slides to generate.'),
});
export type GenerateCarouselInput = z.infer<typeof GenerateCarouselInputSchema>;

const GenerateCarouselOutputSchema = z.object({
  title: z.string().describe('Internal title for the carousel project.'),
  slides: z.array(
    z.object({
      slideNumber: z.number(),
      headline: z.string().describe('The big bold text on the slide.'),
      bodyText: z.string().describe('Supporting text or bullet points for the slide.'),
      visualIdea: z.string().describe('Suggestion for background image or illustration.'),
    })
  ).describe('The sequence of slides for the carousel.'),
  conclusion: z.string().describe('Final slide text or Call to Action.'),
});
export type GenerateCarouselOutput = z.infer<typeof GenerateCarouselOutputSchema>;

export async function generateCarouselContent(input: GenerateCarouselInput): Promise<GenerateCarouselOutput> {
  return generateCarouselFlow(input);
}

const carouselPrompt = ai.definePrompt({
  name: 'generateCarouselPrompt',
  input: { schema: GenerateCarouselInputSchema },
  output: { schema: GenerateCarouselOutputSchema },
  prompt: `You are a high-performance social media content creator specializing in viral carousels.
Your task is to generate a {{slideCount}}-slide carousel based on the topic: {{{topic}}}.

Structure the carousel for maximum engagement on {{platform}}:
- Slide 1: High-impact hook/headline.
- Middle slides: Educational or story-driven value, one clear point per slide.
- Final Slide: Strong Call to Action (CTA).

For each slide, provide:
1. A punchy headline.
2. Concise body text.
3. A visual description for what should be in the background.

Topic: {{{topic}}}
Platform: {{platform}}
Slide Count: {{slideCount}}`,
});

const generateCarouselFlow = ai.defineFlow(
  {
    name: 'generateCarouselFlow',
    inputSchema: GenerateCarouselInputSchema,
    outputSchema: GenerateCarouselOutputSchema,
  },
  async (input) => {
    const { output } = await carouselPrompt(input);
    return output!;
  }
);
