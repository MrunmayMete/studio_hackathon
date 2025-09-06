
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
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false);
  const [weakTopics, setWeakTopics] = useState<string[] | null>(null);

  useEffect(() => {
    // This runs on the client, so window is available.
    const storedTopics = localStorage.getItem('weakTopics');
    if (storedTopics) {
      setWeakTopics(JSON.parse(storedTopics));
    } else {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getRecommendations = async () => {
        if (!weakTopics || weakTopics.length === 0) {
            setIsLoading(false);
            return;
        };

        setIsLoading(true);
        setError(false);
        try {
            // In a real app, you'd get this data from the user's session/profile
            const baseInput = {
                userId: 'alex-doe-123',
                engagement: 8.5,
                goals: 'Prepare for certification exam',
                preferredContentType: 'quiz',
            }
            
            // Generate recommendations for the top 3 weak topics
            const promises = weakTopics.slice(0, 3).map(topic => recommendContent({
                ...baseInput,
                competenceLevel: `Beginner in ${topic}`, // Tailor competence to the weak topic
            }));
            
            const results = await Promise.all(promises);
            setRecommendations(results);

        } catch (error) {
            console.error("Failed to get recommendation:", error)
            setError(true);
        } finally {
            setIsLoading(false)
        }
    }
    
    getRecommendations();
  }, [weakTopics]);


  const getIcon = (contentType: string) => {
    const type = contentType.toLowerCase();
    if (type.includes('video')) return contentIcons.video;
    if (type.includes('quiz')) return contentIcons.quiz;
    if (type.includes('flashcards')) return contentIcons.flashcards;
    return contentIcons.default;
  }

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Finding your next steps...</p>
      </div>
    }

    if (error) {
        return (
            <div className="text-center text-destructive flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8" />
                <p>Could not load recommendations. Please try again later.</p>
            </div>
        )
    }

    if (recommendations.length > 0) {
      return (
         <div className="w-full space-y-2">
            <ul className='space-y-2'>
              {recommendations.map((rec, index) => (
                <li key={index}>
                   <Button asChild className="w-full h-auto justify-start gap-4 text-left" variant="outline">
                    <Link href={rec.contentUrl}>
                      <div className="p-2 bg-accent/50 rounded-md">
                        {getIcon(rec.contentType)}
                      </div>
                      <div className='flex-1'>
                        <p className='font-semibold leading-tight'>{rec.contentTitle}</p>
                        <p className='text-xs text-muted-foreground line-clamp-2'>{rec.reason}</p>
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
      <CardContent className="min-h-[220px] flex items-center justify-center">
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
