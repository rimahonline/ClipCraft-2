'use server';
/**
 * @fileOverview A Genkit flow for generating comprehensive long-form YouTube video scripts with high-frequency pacing.
 *
 * - generateYoutubeScript - A function that generates a full YouTube script.
 * - GenerateYoutubeScriptInput - The input type for the function.
 * - GenerateYoutubeScriptOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateYoutubeScriptInputSchema = z.object({
  topic: z.string().describe('The main topic or title of the video.'),
  targetAudience: z.string().optional().describe('The intended audience for the video.'),
  durationMinutes: z.number().min(1).max(10).default(3).describe('Estimated target duration in minutes.'),
});
export type GenerateYoutubeScriptInput = z.infer<typeof GenerateYoutubeScriptInputSchema>;

const GenerateYoutubeScriptOutputSchema = z.object({
  title: z.string().describe('SEO-optimized video title.'),
  description: z.string().describe('Detailed video description with timestamps and keywords.'),
  tags: z.array(z.string()).describe('Recommended SEO tags.'),
  outline: z.array(z.string()).describe('The high-level chapter outline of the video.'),
  sections: z.array(
    z.object({
      heading: z.string().describe('The section title or scene label.'),
      content: z.string().describe('The word-for-word script content (approx. 15-20 words for 6 seconds).'),
      visualCues: z.string().describe('Suggestions for B-roll, overlays, or screen actions.'),
    })
  ).describe('The sequence of 6-second script sections.'),
  outro: z.object({
    content: z.string().describe('Final summary and CTA script.'),
    closingAction: z.string().describe('Final visual or screen action.'),
  }),
});
export type GenerateYoutubeScriptOutput = z.infer<typeof GenerateYoutubeScriptOutputSchema>;

export async function generateYoutubeScript(input: GenerateYoutubeScriptInput): Promise<GenerateYoutubeScriptOutput> {
  return generateYoutubeScriptFlow(input);
}

const youtubeScriptPrompt = ai.definePrompt({
  name: 'generateYoutubeScriptPrompt',
  input: { schema: GenerateYoutubeScriptInputSchema },
  output: { schema: GenerateYoutubeScriptOutputSchema },
  prompt: `You are a professional YouTube scriptwriter specializing in high-retention, fast-paced content.
Your goal is to write a highly engaging, structured script for a {{durationMinutes}}-minute long-form video about: {{{topic}}}.

{{#if targetAudience}}The target audience is: {{{targetAudience}}}.{{/if}}

STRICT PACING RULE:
- Break the entire video into short, dynamic "micro-sections".
- Each section must be designed to last approximately 6 seconds.
- A 6-second section usually contains about 15-20 spoken words.
- Generate AS MANY sections as needed to reach the total duration of {{durationMinutes}} minutes. 
  (Example: A 1-minute video needs 10 sections. A 3-minute video needs 30 sections. A 10-minute video needs 100 sections).

Structure:
1. Hook (First 5-6 sections): Capture attention immediately.
2. The Core Content: High-value information delivered in rapid-fire 6-second bursts.
3. Mid-roll Engagement: Quick 6-second check-in or teaser.
4. Summary & CTA: Rapid wrap-up.

For each section, provide:
- A word-for-word script that fits the 6-second window.
- Specific visual cues for what happens on screen during those 6 seconds.

Topic: {{{topic}}}`,
});

const generateYoutubeScriptFlow = ai.defineFlow(
  {
    name: 'generateYoutubeScriptFlow',
    inputSchema: GenerateYoutubeScriptInputSchema,
    outputSchema: GenerateYoutubeScriptOutputSchema,
  },
  async (input) => {
    const { output } = await youtubeScriptPrompt(input);
    return output!;
  }
);
