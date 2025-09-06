'use server';
/**
 * @fileOverview A microlearning question generation AI agent.
 *
 * - generateMicrolearningQuestions - A function that generates questions for a given topic.
 * - GenerateMicrolearningQuestionsInput - The input type for the generateMicrolearningQuestions function.
 * - GenerateMicrolearningQuestionsOutput - The return type for the generateMicrolearningQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionSchema = z.object({
    question: z.string().describe('The question text.'),
    options: z.array(z.string()).length(4).describe('An array of 4 possible answers labeled A, B, C, D.'),
    answer: z.string().describe('The letter of the correct answer (A, B, C, or D).'),
    explanation: z.string().describe('A short explanation of why the answer is correct.'),
});

const GenerateMicrolearningQuestionsInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate questions.'),
  competencyLevel: z.string().describe('The competency level of the user (e.g., Beginner, Intermediate, Advanced).'),
});
export type GenerateMicrolearningQuestionsInput = z.infer<typeof GenerateMicrolearningQuestionsInputSchema>;

const GenerateMicrolearningQuestionsOutputSchema = z.object({
  questions: z.array(QuestionSchema).length(3).describe('An array of 3 generated multiple-choice questions.'),
});
export type GenerateMicrolearningQuestionsOutput = z.infer<typeof GenerateMicrolearningQuestionsOutputSchema>;

export async function generateMicrolearningQuestions(
  input: GenerateMicrolearningQuestionsInput
): Promise<GenerateMicrolearningQuestionsOutput> {
  return generateMicrolearningQuestionsFlow(input);
}

const generateMicrolearningQuestionsPrompt = ai.definePrompt({
  name: 'generateMicrolearningQuestionsPrompt',
  input: {schema: GenerateMicrolearningQuestionsInputSchema},
  output: {schema: GenerateMicrolearningQuestionsOutputSchema},
  prompt: `You are an expert educator tasked with creating microlearning materials.

Generate a set of 3 multiple-choice questions with 4 options each and correct answers based on the following topic and user competency.

Topic: {{{topic}}}
Competency Level: {{{competencyLevel}}}

Instructions:
- Tailor the question difficulty to the user's competency level.
- Provide clear and concise questions focused on practical knowledge.
- For each question, include:
    1. The question text.
    2. Four options labeled A, B, C, D.
    3. The correct answer letter.
    4. A short explanation of the correct answer.

Format the output as a JSON array.`,
});

const generateMicrolearningQuestionsFlow = ai.defineFlow(
  {
    name: 'generateMicrolearningQuestionsFlow',
    inputSchema: GenerateMicrolearningQuestionsInputSchema,
    outputSchema: GenerateMicrolearningQuestionsOutputSchema,
  },
  async input => {
    const {output} = await generateMicrolearningQuestionsPrompt(input);
    return output!;
  }
);
