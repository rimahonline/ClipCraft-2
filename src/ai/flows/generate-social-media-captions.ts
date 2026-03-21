'use server';
/**
 * @fileOverview A Genkit flow for generating creative social media captions based on a topic and keywords.
 *
 * - generateSocialMediaCaptions - A function that handles the social media caption generation process.
 * - GenerateSocialMediaCaptionsInput - The input type for the generateSocialMediaCaptions function.
 * - GenerateSocialMediaCaptionsOutput - The return type for the generateSocialMediaCaptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSocialMediaCaptionsInputSchema = z.object({
  topic: z
    .string()
    .describe('The main topic or theme for the social media content.'),
  keywords: z
    .array(z.string())
    .optional()
    .describe('Additional keywords to incorporate into the captions.'),
});
export type GenerateSocialMediaCaptionsInput = z.infer<
  typeof GenerateSocialMediaCaptionsInputSchema
>;

const GenerateSocialMediaCaptionsOutputSchema = z.object({
  captions: z
    .array(z.string())
    .describe('An array of creative and engaging social media caption options.'),
});
export type GenerateSocialMediaCaptionsOutput = z.infer<
  typeof GenerateSocialMediaCaptionsOutputSchema
>;

export async function generateSocialMediaCaptions(
  input: GenerateSocialMediaCaptionsInput
): Promise<GenerateSocialMediaCaptionsOutput> {
  return generateSocialMediaCaptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSocialMediaCaptionsPrompt',
  input: {schema: GenerateSocialMediaCaptionsInputSchema},
  output: {schema: GenerateSocialMediaCaptionsOutputSchema},
  prompt: `You are an expert social media content creator specializing in crafting engaging and creative captions for posts and reels.

Generate 3-5 distinct and creative social media caption options for the given topic. 

Topic: {{{topic}}}
{{#if keywords}}Keywords to include naturally: {{#each keywords}}{{{this}}}{{^last}}, {{/last}}{{/each}}{{/if}}

IMPORTANT: Each caption must include 3-5 relevant and trending hashtags at the end of the text. 

Focus on captions that are engaging, attention-grabbing, and suitable for platforms like Instagram, TikTok, and Facebook.`,
});

const generateSocialMediaCaptionsFlow = ai.defineFlow(
  {
    name: 'generateSocialMediaCaptionsFlow',
    inputSchema: GenerateSocialMediaCaptionsInputSchema,
    outputSchema: GenerateSocialMediaCaptionsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
