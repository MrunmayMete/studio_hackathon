import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { circleData } from "@/lib/data";
import { Users } from "lucide-react";

export function CircleComparison() {
  const userProgress = (circleData.userStudyTime / (circleData.averageStudyTime * 1.5)) * 100;
  const avgProgress = (circleData.averageStudyTime / (circleData.averageStudyTime * 1.5)) * 100;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary"/>
            Circle Comparison
        </CardTitle>
        <CardDescription>
          Your progress vs. the '{circleData.name}' circle.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">You</span>
            <span className="text-sm font-medium">{circleData.userStudyTime} hrs</span>
          </div>
          <Progress value={userProgress} aria-label="Your study time" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-muted-foreground">Circle Average</span>
            <span className="text-sm font-medium text-muted-foreground">{circleData.averageStudyTime} hrs</span>
          </div>
          <Progress value={avgProgress} className="[&>*]:bg-muted-foreground/50" aria-label="Circle average study time" />
        </div>
        <div>
            <h4 className="text-sm font-medium mb-2">Leaderboard</h4>
            <ul className="space-y-2">
                {circleData.leaderboard.slice(0,3).map((member, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person" />
                                <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                            </Avatar>
                            <span>{member.name}</span>
                        </div>
                        <span className="font-semibold">{member.time} hrs</span>
                    </li>
                ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
