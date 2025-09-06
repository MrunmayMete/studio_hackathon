'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { generateAssessment, GenerateAssessmentOutput } from '@/ai/flows/generate-assessment-flow'
import { Loader2 } from 'lucide-react'
import { assessmentQuestions as fallbackQuestions } from '@/lib/assessment-data'

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

function AssessmentComponent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    const domain = searchParams.get('domain')
    const goals = searchParams.get('goals')?.split(',')

    if (domain && goals) {
      generateAssessment({ domain, goals })
        .then((data: GenerateAssessmentOutput) => {
          setQuestions(data.questions)
        })
        .catch(err => {
          console.error("Error generating assessment:", err)
          setQuestions(fallbackQuestions)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setQuestions(fallbackQuestions)
      setIsLoading(false)
    }
  }, [searchParams])

  const handleValueChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!questions) return

    let newScore = 0
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        newScore += 1
      }
    })
    setScore(newScore)
    setSubmitted(true)
  }

  const handleGoToDashboard = () => {
    // In a real app, you'd save the score and inferred competency
    router.push('/dashboard')
  }

  return (
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Diagnostic Assessment</CardTitle>
          <CardDescription>
            Let's see where you stand. Answer these questions to the best of your ability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4">Generating your personalized assessment...</p>
            </div>
          ) : submitted ? (
            <div className="text-center space-y-4">
              <CardTitle>Assessment Complete!</CardTitle>
              <p className="text-2xl font-bold">Your score: {score} / {questions?.length}</p>
              <p className="text-muted-foreground">This helps us understand your starting point. Now, let's head to your personalized dashboard.</p>
              <Button onClick={handleGoToDashboard}>Go to Dashboard</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {questions?.map((q, index) => (
                <div key={q.id} className="space-y-4">
                  <p className="font-semibold">{index + 1}. {q.question}</p>
                  <RadioGroup
                    onValueChange={(value) => handleValueChange(index, value)}
                    value={answers[index]}
                    className="space-y-2"
                  >
                    {q.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${q.id}-${option}`} />
                        <Label htmlFor={`q${q.id}-${option}`} className="font-normal">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <Button type="submit" className="w-full" disabled={Object.keys(answers).length < (questions?.length ?? 0)}>
                Submit Answers
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
  )
}


export default function AssessmentPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Suspense fallback={<div>Loading...</div>}>
                <AssessmentComponent />
            </Suspense>
        </div>
    )
}
