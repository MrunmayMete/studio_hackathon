'use client'

import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BrainCircuit, Info } from 'lucide-react'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

type GoalData = {
  subject: string;
  A: number;
  fullMark: number;
}

export function CompetencyChart() {
  const [chartData, setChartData] = useState<GoalData[]>([]);

  useEffect(() => {
    const storedGoals = localStorage.getItem('userGoals');
    if (storedGoals) {
      const goals: string[] = JSON.parse(storedGoals);
      const newChartData = goals.map(goal => ({
        subject: goal,
        A: Math.floor(Math.random() * 61) + 40, // Random score between 40 and 100
        fullMark: 100,
      }));
      setChartData(newChartData);
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <BrainCircuit className="h-5 w-5 text-primary" />
          Competency Map
        </CardTitle>
        <CardDescription>
          Your skill levels based on your selected goals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} outerRadius="80%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Competency"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className='h-[250px] flex flex-col items-center justify-center text-center text-muted-foreground gap-4'>
              <Info className='h-8 w-8' />
              <p>Your competency map will appear here once you complete the initial survey.</p>
              <Button asChild variant="secondary" size="sm">
                <Link href="/survey">Take Survey</Link>
              </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
