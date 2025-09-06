
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { circleData } from "@/lib/data";
import { Plus, Check, Hourglass } from "lucide-react";

type ConnectionStatus = 'none' | 'pending' | 'connected';

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}

export function CircleLeaderboard() {
    const [connectionStatus, setConnectionStatus] = useState<Record<string, ConnectionStatus>>({});

    const handleConnect = (memberId: string) => {
        setConnectionStatus(prev => ({...prev, [memberId]: 'pending'}));
        // Simulate API call
        setTimeout(() => {
             setConnectionStatus(prev => ({...prev, [memberId]: 'connected'}));
        }, 1500);
    }
    
    const renderConnectButton = (memberId: string) => {
        const status = connectionStatus[memberId] || 'none';

        switch(status) {
            case 'pending':
                return (
                    <Button size="sm" variant="outline" disabled>
                        <Hourglass className="mr-2 h-4 w-4 animate-spin" /> Pending
                    </Button>
                );
            case 'connected':
                return (
                    <Button size="sm" variant="outline" disabled>
                        <Check className="mr-2 h-4 w-4" /> Connected
                    </Button>
                );
            case 'none':
            default:
                return (
                    <Button size="sm" variant="outline" onClick={() => handleConnect(memberId)}>
                        <Plus className="mr-2 h-4 w-4" /> Connect
                    </Button>
                );
        }
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top learners in this circle based on study time.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {circleData.leaderboard.map((member, index) => (
                        <li key={index} className="flex items-center gap-4">
                            <span className='font-bold text-lg w-6 text-center'>{index + 1}</span>
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person face" />
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.time} hrs studied</p>
                            </div>
                            {member.id !== 'u1' && renderConnectButton(member.id)}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}
