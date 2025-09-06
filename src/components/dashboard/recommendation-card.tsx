'use client'

import { useEffect, useState } from 'react'
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
import { ArrowRight, Book, Film, Lightbulb, Loader2, Sparkles, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const contentIcons = {
  video: <Film className="h-5 w-5" />,
  quiz: <Lightbulb className="h-5 w-5" />,
  flashcards: <Book className="h-5 w-5" />,
  default: <Sparkles className="h-5 w-5" />,
}

export function RecommendationCard() {
  const [recommendations, setRecommendations] = useState<RecommendContentOutput[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [weakTopics, setWeakTopics] = useState<string[] | null>(null);

  useEffect(() => {
    // This runs on the client, so window is available.
    const storedTopics = localStorage.getItem('weakTopics');
    if (storedTopics) {
      setWeakTopics(JSON.parse(storedTopics));
    }
  }, []);


  const handleGetRecommendation = async () => {
    if (!weakTopics) return;

    setIsLoading(true)
    try {
      // In a real app, you'd get this data from the user's session/profile
      const baseInput = {
        userId: 'alex-doe-123',
        engagement: 8.5,
        goals: 'Prepare for certification exam',
        preferredContentType: 'quiz',
      }
      
      const promises = weakTopics.map(topic => recommendContent({
          ...baseInput,
          competenceLevel: `Beginner in ${topic}`, // Tailor competence to the weak topic
      }));
      
      const results = await Promise.all(promises);
      setRecommendations(results);

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

  const renderContent = () => {
    if (isLoading) {
      return <Loader2 className="h-8 w-8 animate-spin text-primary" />
    }

    if (recommendations.length > 0) {
      return (
         <div className="w-full space-y-4">
            <h4 className="font-semibold text-center">Practice your weak points:</h4>
            <ul className='space-y-2'>
              {recommendations.map((rec, index) => (
                <li key={index}>
                   <Button asChild className="w-full justify-start gap-4" variant="outline">
                    <Link href={rec.contentUrl}>
                      {getIcon(rec.contentType)}
                      <div className='text-left'>
                        <p className='font-semibold'>{rec.contentTitle}</p>
                        <p className='text-xs text-muted-foreground'>{rec.reason}</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
        </div>
      )
    }

    if (weakTopics && weakTopics.length > 0) {
        return (
             <div className="text-center">
                 <p className="text-muted-foreground mb-4">You have some areas to improve. Ready to see what's next?</p>
                <Button onClick={handleGetRecommendation} disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate My Next Steps
                </Button>
            </div>
        )
    }
    
    return (
        <div className="text-center text-muted-foreground flex flex-col items-center gap-2">
            <AlertCircle className="h-8 w-8" />
            <p>Complete your diagnostic assessment to get personalized recommendations.</p>
             <Button asChild variant="link">
                <Link href="/assessment">Take Assessment</Link>
            </Button>
        </div>
    )
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          Your Next Step
        </CardTitle>
        <CardDescription>
          Our AI has suggested the next best activities for your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[160px] flex items-center justify-center">
        {renderContent()}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Recommendations are based on your assessment results, progress, and goals.
        </p>
      </CardFooter>
    </Card>
  )
}
