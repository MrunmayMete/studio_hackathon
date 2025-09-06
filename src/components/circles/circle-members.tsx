
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { circleData } from "@/lib/data";
import { Plus, Check, Hourglass, Search } from "lucide-react";
import { Input } from '../ui/input';

type ConnectionStatus = 'none' | 'pending' | 'connected';

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}

export function CircleMembers() {
    const [connectionStatus, setConnectionStatus] = useState<Record<string, ConnectionStatus>>({});
    const [searchTerm, setSearchTerm] = useState('');

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
                    <Button size="sm" variant="outline" disabled className="w-28">
                        <Hourglass className="mr-2 h-4 w-4 animate-spin" /> Pending
                    </Button>
                );
            case 'connected':
                return (
                    <Button size="sm" variant="outline" disabled className="w-28">
                        <Check className="mr-2 h-4 w-4" /> Connected
                    </Button>
                );
            case 'none':
            default:
                return (
                    <Button size="sm" variant="outline" onClick={() => handleConnect(memberId)} className="w-28">
                        <Plus className="mr-2 h-4 w-4" /> Connect
                    </Button>
                );
        }
    }

    const filteredMembers = circleData.leaderboard.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <Card>
            <CardHeader>
                <CardTitle>Circle Members</CardTitle>
                <CardDescription>Find and connect with other members in this circle.</CardDescription>
                <div className="relative pt-2">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search members..." 
                        className="pl-8" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {filteredMembers.map((member) => (
                        <li key={member.id} className="flex items-center gap-4">
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
