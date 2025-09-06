'use server';

/**
 * @fileOverview A personalized content recommendation AI agent.
 *
 * - recommendContent - A function that recommends learning content based on user data.
 * - RecommendContentInput - The input type for the recommendContent function.
 * - RecommendContentOutput - The return type for the recommendContentOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendContentInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  competenceLevel: z
    .string()
    .describe('The competence level of the user in the given domain.'),
  engagement: z
    .number()
    .describe(
      'A number representing the user engagement, like time spent on a learning activity.'
    ),
  goals: z.string().describe('The goals of the user (certification, job prep, etc.).'),
  preferredContentType: z
    .string()
    .describe('The preferred content type of the user (video, quiz, flashcards).'),
});
export type RecommendContentInput = z.infer<typeof RecommendContentInputSchema>;

const RecommendContentOutputSchema = z.object({
  contentType: z
    .string()
    .describe('The type of content recommended (video, quiz, flashcards).'),
  contentTitle: z.string().describe('The title of the recommended content.'),
  contentUrl: z.string().describe('The URL of the recommended content. For quizzes, this should be in the format /learn/Topic-Name.'),
  reason: z.string().describe('A very short, one-sentence reason for this recommendation.'),
});
export type RecommendContentOutput = z.infer<typeof RecommendContentOutputSchema>;

export async function recommendContent(
  input: RecommendContentInput
): Promise<RecommendContentOutput> {
  return recommendContentFlow(input);
}

const recommendContentPrompt = ai.definePrompt({
  name: 'recommendContentPrompt',
  input: {schema: RecommendContentInputSchema},
  output: {schema: RecommendContentOutputSchema},
  prompt: `You are a personalized learning recommendation engine. Given the
  learner's profile, competence, engagement, and goals, you will recommend the
  next micro-learning content (videos, quizzes, flashcards) for the learner.

  User ID: {{{userId}}}
  Competence Level: {{{competenceLevel}}}
  Engagement: {{{engagement}}}
  Goals: {{{goals}}}
  Preferred Content Type: {{{preferredContentType}}}

  Based on this information, recommend the next best content. Provide a very short, one-sentence reason for your recommendation.
  For quizzes, create a URL like '/learn/Topic-Name-In-URL-Format'. For other types, you can use placeholder URLs.
  
  contentType:
  contentTitle:
  contentUrl:
  reason:`,
});

const recommendContentFlow = ai.defineFlow(
  {
    name: 'recommendContentFlow',
    inputSchema: RecommendContentInputSchema,
    outputSchema: RecommendContentOutputSchema,
  },
  async input => {
    const {output} = await recommendContentPrompt(input);
    return output!;
  }
);
