import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { user } from "@/lib/data";
import { Check, Goal, Star } from "lucide-react";

export function ProfileStrengthCard() {
  const goalProgress = (user.goals.length / 3) * 100; // Assuming 3 is a target number of goals
  const competencyScore = user.testScores.diagnostic;

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