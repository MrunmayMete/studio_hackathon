import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MyLearningContent } from "@/lib/data";
import { ListVideo, BookOpen, CheckSquare, Clock, ArrowRight } from "lucide-react";

const typeIcons = {
    video: <ListVideo className="h-5 w-5" />,
    article: <BookOpen className="h-5 w-5" />,
    quiz: <CheckSquare className="h-5 w-5" />,
}

export function LearningItemCard({ item }: { item: MyLearningContent }) {
    return (
        <Card className="flex flex-col">
             <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                <Image
                    src={item.thumbnailUrl}
                    alt={item.title}
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint="learning content"
                />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                        {typeIcons[item.type]}
                        <span className="capitalize">{item.type}</span>
                    </div>
                    &middot;
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{item.duration}</span>
                    </div>
                </div>
                <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
                <CardDescription className="mt-2 text-sm">From {item.source}</CardDescription>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
                 <div className="flex flex-wrap gap-2">
                    {item.topics.map(topic => (
                        <Badge key={topic} variant="secondary">{topic}</Badge>
                    ))}
                </div>
                <Button asChild className="w-full">
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                        Start Learning <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
