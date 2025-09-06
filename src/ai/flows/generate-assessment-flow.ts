'use server';
/**
 * @fileOverview A diagnostic assessment generation AI agent.
 *
 * - generateAssessment - A function that generates assessment questions based on user goals.
 * - GenerateAssessmentInput - The input type for the generateAssessment function.
 * - GenerateAssessmentOutput - The return type for the generateAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionSchema = z.object({
  id: z.number().describe('A unique ID for the question.'),
  question: z.string().describe('The question text.'),
  topic: z
    .string()
    .describe('The specific topic this question is about (e.g., "Ohm\'s Law", "Circuit Safety").'),
  options: z.array(z.string()).describe('An array of possible answers.'),
  correctAnswer: z.string().describe('The correct answer.'),
});

const GenerateAssessmentInputSchema = z.object({
  domain: z.string().describe('The subject or domain of interest for the user.'),
  goals: z.array(z.string()).describe('The learning goals of the user.'),
});
export type GenerateAssessmentInput = z.infer<typeof GenerateAssessmentInputSchema>;

const GenerateAssessmentOutputSchema = z.object({
  questions: z
    .array(QuestionSchema)
    .describe('An array of 5 generated assessment questions.'),
});
export type GenerateAssessmentOutput = z.infer<
  typeof GenerateAssessmentOutputSchema
>;

export async function generateAssessment(
  input: GenerateAssessmentInput
): Promise<GenerateAssessmentOutput> {
  return generateAssessmentFlow(input);
}

const generateAssessmentPrompt = ai.definePrompt({
  name: 'generateAssessmentPrompt',
  input: {schema: GenerateAssessmentInputSchema},
  output: {schema: GenerateAssessmentOutputSchema},
  prompt: `You are a vocational education expert. Generate a 5-question multiple-choice diagnostic assessment for a learner with the following profile. The questions should gauge their foundational knowledge. For each question, provide a specific, narrow topic.

  Domain of Interest: {{{domain}}}
  Learning Goals: {{#each goals}}{{{this}}}{{/each}}

  Generate exactly 5 multiple-choice questions. Each question must have 4 options, one correct answer, and a specific topic.`,
});

const generateAssessmentFlow = ai.defineFlow(
  {
    name: 'generateAssessmentFlow',
    inputSchema: GenerateAssessmentInputSchema,
    outputSchema: GenerateAssessmentOutputSchema,
  },
  async (input) => {
    const {output} = await generateAssessmentPrompt(input);
    return output!;
  }
);
