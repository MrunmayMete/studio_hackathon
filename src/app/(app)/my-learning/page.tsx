'use client';

import { useState } from 'react';
import { LearningItemCard } from "@/components/learning/learning-item-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { myLearningContent } from "@/lib/data";
import { ListVideo, BookOpen, CheckSquare, Library, Sparkles, Youtube, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { generateVideoWithQuiz, GenerateVideoWithQuizOutput } from '@/ai/flows/generate-video-with-quiz-flow';
import { Textarea } from '@/components/ui/textarea';


export default function MyLearningPage() {
    const allContent = myLearningContent;
    const videoContent = allContent.filter(item => item.type === 'video');
    const articleContent = allContent.filter(item => item.type === 'article');
    const quizContent = allContent.filter(item => item.type === 'quiz');

    const [isLoading, setIsLoading] = useState(false);
    const [goal, setGoal] = useState('');
    const [suggestion, setSuggestion] = useState<GenerateVideoWithQuizOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateSuggestion = async () => {
        if (!goal) {
            setError("Please enter a learning goal.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuggestion(null);
        try {
            const result = await generateVideoWithQuiz({ goal });
            setSuggestion(result);
        } catch (e) {
            console.error(e);
            setError("Sorry, I couldn't generate a suggestion. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    
    const getQuizUrl = (topic: string) => {
        return `/learn/${topic.replace(/\s+/g, '-')}`;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Learning</h1>
                <p className="text-muted-foreground">
                    Your personalized library of educational content.
                </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <div className="overflow-x-auto">
                  <TabsList>
                      <TabsTrigger value="all">
                          <Library className="mr-2 h-4 w-4" />
                          All
                      </TabsTrigger>
                      <TabsTrigger value="videos">
                          <ListVideo className="mr-2 h-4 w-4" />
                          Videos
                      </TabsTrigger>
                      <TabsTrigger value="articles">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Articles
                      </TabsTrigger>
                      <TabsTrigger value="quizzes">
                          <CheckSquare className="mr-2 h-4 w-4" />
                          Quizzes
                      </TabsTrigger>
                      <TabsTrigger value="ai-suggestions">
                          <Sparkles className="mr-2 h-4 w-4" />
                          AI Suggestions
                      </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {allContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-6">
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {videoContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="articles" className="mt-6">
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {articleContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="quizzes" className="mt-6">
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {quizContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                 <TabsContent value="ai-suggestions" className="mt-6">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>AI-Powered Learning Path</CardTitle>
                            <CardDescription>Tell us your learning goal, and our AI will suggest a short video and generate a practice quiz to help you master the topic.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">What do you want to learn today?</label>
                                <Textarea
                                    id="goal"
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    placeholder="e.g., 'How to safely wire a 3-way switch' or 'Understand Ohm's Law for DC circuits'"
                                    className="min-h-[80px]"
                                />
                            </div>
                            <Button onClick={handleGenerateSuggestion} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Generate Suggestion
                                    </>
                                )}
                            </Button>

                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            
                            {suggestion && (
                                <div className="space-y-6 pt-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Recommended Video</h3>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className='flex items-center gap-2'><Youtube className='text-red-600'/> {suggestion.video.videoTitle}</CardTitle>
                                                <CardDescription>{suggestion.video.reason}</CardDescription>
                                            </CardHeader>
                                            <CardFooter>
                                                <Button asChild>
                                                    <a href={suggestion.video.videoUrl} target="_blank" rel="noopener noreferrer">
                                                        Watch on YouTube <ArrowRight className="ml-2 h-4 w-4"/>
                                                    </a>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                     <div className="space-y-4">
                                        <h3 className="text-lg font-semibold">Practice Quiz</h3>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Quiz: {suggestion.video.videoTopic}</CardTitle>
                                                 <CardDescription>Test your knowledge on the concepts from the video.</CardDescription>
                                            </CardHeader>
                                             <CardFooter>
                                                <Button asChild>
                                                   <Link href={getQuizUrl(suggestion.video.videoTopic)}>
                                                        Start Quiz <ArrowRight className="ml-2 h-4 w-4"/>
                                                   </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </div>
                            )}

                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

        </div>
    )
}
