
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { forumThreads } from '@/lib/data';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}


export function CircleForumPreview({ circleId }: { circleId: string}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Recent Discussions</span>
                </CardTitle>
                <CardDescription>Latest discussions from the circle members.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {forumThreads.slice(0, 3).map(thread => (
                         <li key={thread.id} className="flex items-center justify-between">
                            <div className='flex items-center gap-3'>
                                <Avatar className='hidden sm:flex h-10 w-10'>
                                    <AvatarImage src={thread.authorAvatar} alt={thread.author} data-ai-hint="person face"/>
                                    <AvatarFallback>{getInitials(thread.author)}</AvatarFallback>
                                </Avatar>
                                <div className='space-y-1'>
                                    <Link href="#" className='font-semibold hover:underline'>{thread.title}</Link>
                                    <p className='text-sm text-muted-foreground'>by {thread.author} &middot; {thread.timestamp}</p>
                                </div>
                            </div>
                            <div className='text-right text-sm'>
                                <p>{thread.replies} replies</p>
                                <p className='text-muted-foreground'>{thread.views} views</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                 <Button variant="outline" asChild>
                    <Link href={`/circles/${circleId}/forum`}>View All Discussions <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
