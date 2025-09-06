
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { user, competencyData } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { List, Target, User } from "lucide-react";

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}


export default function ProfilePage() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <p className="text-muted-foreground">
                    View and manage your personal information and learning journey.
                </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <CardTitle>{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Button className="w-full">Edit Profile</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Target className="h-5 w-5"/>
                                My Goals
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {user.goals.map((goal) => (
                                <Badge key={goal} variant="secondary">
                                    {goal}
                                </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                               <List className="h-5 w-5"/>
                               Competency Overview
                            </CardTitle>
                            <CardDescription>
                                A summary of your current skill levels based on assessments and activities.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                {competencyData.map(skill => (
                                    <li key={skill.subject}>
                                        <p className="font-medium">{skill.subject}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                             <div className="w-full bg-secondary rounded-full h-2.5">
                                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${skill.A}%` }}></div>
                                            </div>
                                            <span className="text-sm font-semibold text-muted-foreground">{skill.A}%</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
