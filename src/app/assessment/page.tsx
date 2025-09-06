'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { assessmentQuestions } from '@/lib/assessment-data'

export default function AssessmentPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const handleValueChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let newScore = 0
    assessmentQuestions.forEach((q, index) => {
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
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Diagnostic Assessment</CardTitle>
          <CardDescription>
            Let's see where you stand. Answer these questions to the best of your ability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {assessmentQuestions.map((q, index) => (
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
              <Button type="submit" className="w-full" disabled={Object.keys(answers).length < assessmentQuestions.length}>
                Submit Answers
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <CardTitle>Assessment Complete!</CardTitle>
              <p className="text-2xl font-bold">Your score: {score} / {assessmentQuestions.length}</p>
              <p className="text-muted-foreground">This helps us understand your starting point. Now, let's head to your personalized dashboard.</p>
              <Button onClick={handleGoToDashboard}>Go to Dashboard</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
