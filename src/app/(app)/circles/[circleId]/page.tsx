import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { allCircles } from '@/lib/data';
import { Users, MessageSquare, Trophy, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircleLeaderboard } from '@/components/circles/circle-leaderboard';
import { CircleForumPreview } from '@/components/circles/circle-forum-preview';
import { CircleMembers } from '@/components/circles/circle-members';

export default function CircleDetailPage({
  params,
}: {
  params: { circleId: string };
}) {
  const circle = allCircles.find((c) => c.id === params.circleId);

  if (!circle) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="relative h-48 w-full sm:h-64">
          <Image
            src={circle.image}
            alt={circle.name}
            fill
            className="rounded-t-lg object-cover"
            data-ai-hint="community focus"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
           <div className="absolute bottom-6 left-6">
             <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">{circle.name}</h1>
             <div className="flex items-center gap-4 text-white/90 pt-2">
                <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{circle.members} members</span>
                </div>
            </div>
           </div>
        </div>
        <CardContent className="p-6">
          <p className="mb-4">{circle.description}</p>
           <div className="flex flex-wrap gap-2 mb-4">
            {circle.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Button>Join Circle</Button>
        </CardContent>
      </Card>

       <Tabs defaultValue="forum">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum"><MessageSquare className="mr-2 h-4 w-4" />Forum</TabsTrigger>
          <TabsTrigger value="leaderboard"><Trophy className="mr-2 h-4 w-4" />Leaderboard</TabsTrigger>
          <TabsTrigger value="members"><Users className="mr-2 h-4 w-4" />Members</TabsTrigger>
        </TabsList>
        <TabsContent value="forum" className="mt-4">
          <CircleForumPreview circleId={circle.id} />
        </TabsContent>
        <TabsContent value="leaderboard" className="mt-4">
           <CircleLeaderboard />
        </TabsContent>
        <TabsContent value="members" className="mt-4">
            <CircleMembers />
        </TabsContent>
      </Tabs>
    </div>
  );
}
