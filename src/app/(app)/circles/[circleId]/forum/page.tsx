import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { allCircles, forumThreads } from '@/lib/data';
import { PlusCircle, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}

export default function ForumPage({ params }: { params: { circleId: string } }) {
  const circle = allCircles.find((c) => c.id === params.circleId);

  if (!circle) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <div>
            <p className="text-sm text-muted-foreground">
                <Link href="/circles" className="hover:underline">Circles</Link> &gt; 
                <Link href={`/circles/${circle.id}`} className="hover:underline"> {circle.name}</Link>
            </p>
            <h1 className="text-3xl font-bold tracking-tight mt-1">{circle.name} Forum</h1>
        </div>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle>Discussions</CardTitle>
                    <CardDescription>Ask questions, share projects, and connect with other members.</CardDescription>
                 </div>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Thread
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[60%]'>Topic</TableHead>
                            <TableHead className='text-center'>Replies</TableHead>
                            <TableHead className='text-center'>Views</TableHead>
                            <TableHead className='text-right'>Last Post</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {forumThreads.map(thread => (
                            <TableRow key={thread.id}>
                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <Avatar className='hidden sm:flex'>
                                            <AvatarImage src={thread.authorAvatar} alt={thread.author} data-ai-hint="person face"/>
                                            <AvatarFallback>{getInitials(thread.author)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Link href="#" className='font-semibold hover:underline'>{thread.title}</Link>
                                            <p className='text-xs text-muted-foreground'>Started by {thread.author}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className='text-center'>{thread.replies}</TableCell>
                                <TableCell className='text-center'>{thread.views}</TableCell>
                                <TableCell className='text-right'>
                                    <p className='text-sm'>{thread.timestamp}</p>
                                    <p className='text-xs text-muted-foreground'>by {thread.author}</p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
