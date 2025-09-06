import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { allCircles, circleData, forumThreads } from '@/lib/data';
import { Users, MessageSquare, Plus, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}


export default function CircleDetailPage({ params }: { params: { circleId: string } }) {
  const circle = allCircles.find((c) => c.id === params.circleId);

  if (!circle) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <Card>
                 <div className="relative h-64 w-full">
                    <Image
                        src={circle.image}
                        alt={circle.name}
                        fill
                        className="rounded-t-lg object-cover"
                        data-ai-hint="community focus"
                    />
                </div>
                <CardHeader>
                    <CardTitle className='text-3xl'>{circle.name}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground pt-2">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <span>{circle.members} members</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {circle.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p>{circle.description}</p>
                </CardContent>
                <CardFooter>
                    <Button>Join Circle</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span><MessageSquare className="inline-block mr-2" /> Recent Forum Activity</span>
                        <Button variant="ghost" asChild>
                            <Link href={`/circles/${circle.id}/forum`}>View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardTitle>
                    <CardDescription>Latest discussions from the circle members.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {forumThreads.map(thread => (
                             <li key={thread.id} className="flex items-center justify-between">
                                <div className='space-y-1'>
                                    <Link href="#" className='font-semibold hover:underline'>{thread.title}</Link>
                                    <p className='text-sm text-muted-foreground'>by {thread.author} &middot; {thread.timestamp}</p>
                                </div>
                                <div className='text-right text-sm'>
                                    <p>{thread.replies} replies</p>
                                    <p className='text-muted-foreground'>{thread.views} views</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {circleData.leaderboard.map((member, index) => (
                            <li key={index} className="flex items-center gap-4">
                                <span className='font-bold text-lg w-6'>{index + 1}</span>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person face" />
                                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.time} hrs studied</p>
                                </div>
                                {member.id !== 'u1' && <Button size="sm" variant="outline"><Plus className="mr-2 h-4 w-4" /> Connect</Button>}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
