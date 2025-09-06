'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { user } from "@/lib/data";
import { Goal, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function ProfileStrengthCard() {
  const [competencyScore, setCompetencyScore] = useState(0);
  const goalProgress = (user.goals.length / 3) * 100; // Assuming 3 is a target number of goals

  useEffect(() => {
    // This runs on the client, so window is available.
    const storedScore = localStorage.getItem('diagnosticScore');
    if (storedScore) {
        setCompetencyScore(parseInt(storedScore, 10));
    }
  }, []);


  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
            Profile Strength
            <Star className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Goals Set</span>
                    <span className="text-xs font-semibold">{user.goals.length} / 3</span>
                </div>
                <Progress value={goalProgress} aria-label="Goals set progress" />
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Diagnostic Score</span>
                    <span className="text-xs font-semibold">{competencyScore}%</span>
                </div>
                <Progress value={competencyScore} aria-label="Diagnostic score" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
