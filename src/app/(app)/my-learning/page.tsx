import { LearningItemCard } from "@/components/learning/learning-item-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { myLearningContent } from "@/lib/data";
import { ListVideo, BookOpen, CheckSquare, Library } from 'lucide-react';

export default function MyLearningPage() {
    const allContent = myLearningContent;
    const videoContent = allContent.filter(item => item.type === 'video');
    const articleContent = allContent.filter(item => item.type === 'article');
    const quizContent = allContent.filter(item => item.type === 'quiz');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Learning</h1>
                <p className="text-muted-foreground">
                    Your personalized library of educational content.
                </p>
            </div>

            <Tabs defaultValue="all">
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
                </TabsList>
                <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {allContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-6">
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {videoContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="articles" className="mt-6">
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {articleContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="quizzes" className="mt-6">
                     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {quizContent.map((item) => (
                            <LearningItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}
