'use client';

import {
  generateMicrolearningQuestions,
  GenerateMicrolearningQuestionsOutput,
} from '@/ai/flows/generate-microlearning-questions-flow';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

type Question = GenerateMicrolearningQuestionsOutput['questions'][0];

export default function MicrolearningPage({
  params,
}: {
  params: { topic: string };
}) {
  const router = useRouter();
  const topic = useMemo(() => decodeURIComponent(params.topic.replace(/-/g, ' ')), [params.topic]);
  const [data, setData] =
    useState<GenerateMicrolearningQuestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    generateMicrolearningQuestions({ topic })
      .then(setData)
      .catch((err) => {
        console.error('Error generating questions', err);
        // Handle error, maybe show a toast
      })
      .finally(() => setIsLoading(false));
  }, [topic]);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNextQuestion = () => {
    if (data && currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (!data) return;

    let correctAnswers = 0;
    data.questions.forEach((q, index) => {
      const selectedOption = selectedAnswers[index]; // e.g., "A. Some Answer"
      if (selectedOption) {
        const selectedLetter = selectedOption.split('.')[0]; // e.g., "A"
        if (selectedLetter === q.answer) {
          correctAnswers++;
        }
      }
    });

    setScore(correctAnswers);
    setShowResults(true);
  };
  
  const currentQuestion = data?.questions[currentQuestionIndex];
  const isLastQuestion = data && currentQuestionIndex === data.questions.length - 1;

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center">
        <div className="flex items-center gap-4 text-lg">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p>Generating your quiz on "{topic}"...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="flex w-full justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Quiz Results: {topic}</CardTitle>
            <CardDescription>
              You scored {score} out of {data?.questions.length}!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data?.questions.map((q, index) => (
              <div key={index} className="rounded-lg border p-4">
                <p className="font-semibold">{q.question}</p>
                <p className={`mt-2 ${selectedAnswers[index]?.split('.')[0] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                    Your answer: {selectedAnswers[index] || 'Not answered'}
                </p>
                <p className='text-green-600'>Correct answer: {q.options.find(opt => opt.startsWith(q.answer))}</p>
                <p className="mt-2 text-sm text-muted-foreground">{q.explanation}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center">
      {currentQuestion && (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Micro-Quiz: {topic}</CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {data?.questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-semibold">{currentQuestion.question}</p>
            <RadioGroup
              value={selectedAnswers[currentQuestionIndex]}
              onValueChange={(value) => handleAnswerChange(currentQuestionIndex, value)}
              className="space-y-2"
            >
              {currentQuestion.options.map((option, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`q${currentQuestionIndex}-opt${idx}`} />
                  <Label htmlFor={`q${currentQuestionIndex}-opt${idx}`} className="font-normal">{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
                <ArrowLeft className='mr-2'/>
                Previous
            </Button>
            {isLastQuestion ? (
                 <Button onClick={handleSubmit} disabled={!selectedAnswers[currentQuestionIndex]}>
                    Submit Quiz
                </Button>
            ): (
                <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
                    Next
                    <ArrowRight className='ml-2'/>
                </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
