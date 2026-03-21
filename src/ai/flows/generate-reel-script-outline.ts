'use server';
/**
 * @fileOverview A Genkit flow for generating a script outline or visual ideas for a social media reel.
 *
 * - generateReelScriptOutline - A function that generates a reel script outline.
 * - GenerateReelScriptOutlineInput - The input type for the generateReelScriptOutline function.
 * - GenerateReelScriptOutlineOutput - The return type for the generateReelScriptOutline function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateReelScriptOutlineInputSchema = z.object({
  topic: z.string().describe('The main topic or keywords for the reel.'),
  platform: z.enum(['Instagram', 'TikTok', 'YouTube Shorts']).describe('The target social media platform for the reel.'),
  durationSeconds: z.number().optional().describe('The desired duration of the reel in seconds (e.g., 15, 30, 60).'),
});
export type GenerateReelScriptOutlineInput = z.infer<typeof GenerateReelScriptOutlineInputSchema>;

const GenerateReelScriptOutlineOutputSchema = z.object({
  title: z.string().describe('A suggested title for the social media reel.'),
  youtubeTitle: z.string().describe('An optimized title specifically for YouTube Shorts, including 2-3 hashtags.'),
  youtubeDescription: z.string().describe('A detailed description for the YouTube Short, including context, keywords, and a block of hashtags.'),
  hook: z.string().describe('A catchy opening line or visual idea to grab viewer attention immediately.'),
  scenes: z.array(
    z.object({
      description: z.string().describe('A detailed visual description of the scene or sequence.'),
      voiceover: z.string().describe('The word-for-word script for the voiceover in this scene.'),
      audioSuggestion: z.string().describe('Suggestion for background music or sound effects.'),
      textOverlay: z.string().describe('Suggested text to display on screen during this scene.'),
    })
  ).describe('A sequence of visual ideas or scenes for the reel.'),
  callToAction: z.string().describe('A clear call to action at the end of the reel (e.g., "Follow for more!", "Link in bio").'),
});
export type GenerateReelScriptOutlineOutput = z.infer<typeof GenerateReelScriptOutlineOutputSchema>;

export async function generateReelScriptOutline(input: GenerateReelScriptOutlineInput): Promise<GenerateReelScriptOutlineOutput> {
  return generateReelScriptOutlineFlow(input);
}

const generateReelScriptOutlinePrompt = ai.definePrompt({
  name: 'generateReelScriptOutlinePrompt',
  input: { schema: GenerateReelScriptOutlineInputSchema },
  output: { schema: GenerateReelScriptOutlineOutputSchema },
  prompt: `You are an expert social media content strategist and video scriptwriter.
Your task is to generate a structured script outline for a social media reel based on the provided topic and target platform.

Craft a compelling title, an engaging hook, a sequence of detailed scenes with visual descriptions, word-for-word voiceover scripts, audio suggestions, and text overlays, and a clear call to action.

Additionally, provide an optimized YouTube Shorts title (with hashtags) and a detailed description that includes relevant keywords and hashtags.

Consider the typical style, audience, and best practices for a reel on {{platform}}.

{{#if durationSeconds}}
Aim for a total duration of approximately {{durationSeconds}} seconds. Ensure the voiceover script fits comfortably within this timeframe.
{{/if}}

Topic: {{{topic}}}
Target Platform: {{platform}}`,
});

const generateReelScriptOutlineFlow = ai.defineFlow(
  {
    name: 'generateReelScriptOutlineFlow',
    inputSchema: GenerateReelScriptOutlineInputSchema,
    outputSchema: GenerateReelScriptOutlineOutputSchema,
  },
  async (input) => {
    const { output } = await generateReelScriptOutlinePrompt(input);
    return output!;
  }
);
