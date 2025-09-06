'use client'

import { useState } from 'react'
import {
  RecommendContentInput,
  RecommendContentOutput,
  recommendContent,
} from '@/ai/flows/personalized-content-recommendations'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowRight, Book, Film, Lightbulb, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'

const contentIcons = {
  video: <Film className="h-5 w-5" />,
  quiz: <Lightbulb className="h-5 w-5" />,
  flashcards: <Book className="h-5 w-5" />,
  default: <Sparkles className="h-5 w-5" />,
}

export function RecommendationCard() {
  const [recommendation, setRecommendation] = useState<RecommendContentOutput | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetRecommendation = async () => {
    setIsLoading(true)
    try {
      const input: RecommendContentInput = {
        userId: 'alex-doe-123',
        competenceLevel: 'Intermediate in Blueprint Reading',
        engagement: 8.5,
        goals: 'Prepare for certification exam',
        preferredContentType: 'video',
      }
      const result = await recommendContent(input)
      setRecommendation(result)
    } catch (error) {
      console.error("Failed to get recommendation:", error)
      // You could show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = (contentType: string) => {
    if (contentType.toLowerCase().includes('video')) return contentIcons.video;
    if (contentType.toLowerCase().includes('quiz')) return contentIcons.quiz;
    if (contentType.toLowerCase().includes('flashcards')) return contentIcons.flashcards;
    return contentIcons.default;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Your Next Step
        </CardTitle>
        <CardDescription>
          Our AI has suggested the next best activity for your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[160px] flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        ) : recommendation ? (
          <div className="w-full space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                <div className="text-primary">{getIcon(recommendation.contentType)}</div>
                <div>
                  <h4 className="font-semibold">{recommendation.contentTitle}</h4>
                  <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
                </div>
            </div>
             <Button asChild className="w-full">
              <Link href={recommendation.contentUrl}>
                Start: {recommendation.contentType} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center">
             <p className="text-muted-foreground mb-4">Ready to see what's next?</p>
            <Button onClick={handleGetRecommendation} disabled={isLoading}>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate My Next Step
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Recommendation is based on your progress, goals, and preferences.
        </p>
      </CardFooter>
    </Card>
  )
}
