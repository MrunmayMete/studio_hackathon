'use server';
/**
 * @fileOverview An AI agent that suggests a YouTube video and generates a quiz for it.
 *
 * - generateVideoWithQuiz - A function that handles the video suggestion and quiz generation.
 * - GenerateVideoWithQuizInput - The input type for the function.
 * - GenerateVideoWithQuizOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generateMicrolearningQuestions, GenerateMicrolearningQuestionsOutput } from './generate-microlearning-questions-flow';


const GenerateVideoWithQuizInputSchema = z.object({
  goal: z.string().describe('The learning goal of the user.'),
});
export type GenerateVideoWithQuizInput = z.infer<typeof GenerateVideoWithQuizInputSchema>;

const VideoSuggestionSchema = z.object({
    videoTitle: z.string().describe('The title of the suggested YouTube video.'),
    videoTopic: z.string().describe('The main topic or concept covered in the video. This will be used to generate a quiz.'),
    videoUrl: z.string().describe('A YouTube search URL for the suggested video title.'),
    reason: z.string().describe('A short explanation for why this video is recommended.'),
});

const GenerateVideoWithQuizOutputSchema = z.object({
  video: VideoSuggestionSchema,
  quiz: z.custom<GenerateMicrolearningQuestionsOutput>(),
});
export type GenerateVideoWithQuizOutput = z.infer<typeof GenerateVideoWithQuizOutputSchema>;


export async function generateVideoWithQuiz(
  input: GenerateVideoWithQuizInput
): Promise<GenerateVideoWithQuizOutput> {
  return generateVideoWithQuizFlow(input);
}

const videoSuggestionPrompt = ai.definePrompt({
  name: 'videoSuggestionPrompt',
  input: { schema: GenerateVideoWithQuizInputSchema },
  output: { schema: VideoSuggestionSchema },
  prompt: `You are an expert curriculum designer for vocational learners. Your task is to suggest a relevant YouTube video based on a user's learning goal.

  User Goal: {{{goal}}}

  Instructions:
  1.  Suggest a concise, highly relevant YouTube video title that is likely to be under 20 minutes.
  2.  Extract a specific, focused topic from the video title. This topic will be used to generate a quiz.
  3.  Create a YouTube search URL for the exact video title.
  4.  Provide a brief, compelling reason why this video is a good fit for the user's goal.
  `,
});


const generateVideoWithQuizFlow = ai.defineFlow(
  {
    name: 'generateVideoWithQuizFlow',
    inputSchema: GenerateVideoWithQuizInputSchema,
    outputSchema: GenerateVideoWithQuizOutputSchema,
  },
  async (input) => {
    // Step 1: Generate the video suggestion.
    const { output: videoSuggestion } = await videoSuggestionPrompt(input);
    if (!videoSuggestion) {
        throw new Error('Failed to generate video suggestion.');
    }
    
    // Step 2: Use the video topic to generate a quiz.
    const quiz = await generateMicrolearningQuestions({ topic: videoSuggestion.videoTopic });

    // Step 3: Return both the video and the quiz.
    return {
      video: videoSuggestion,
      quiz,
    };
  }
);
