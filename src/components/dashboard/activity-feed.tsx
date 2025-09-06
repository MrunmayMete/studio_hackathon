import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { activityFeed } from "@/lib/data";
import { Bell, Book, CheckCircle, Film, Users } from "lucide-react";

const activityIcons = {
  quiz: <CheckCircle className="h-4 w-4" />,
  video: <Film className="h-4 w-4" />,
  badge: <Bell className="h-4 w-4" />,
  circle: <Users className="h-4 w-4" />,
  default: <Book className="h-4 w-4" />,
};

type ActivityType = keyof typeof activityIcons;

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A log of your latest achievements and actions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activityFeed.map((item) => (
            <li key={item.id} className="flex items-start gap-4">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                {activityIcons[item.type as ActivityType] || activityIcons.default}
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                {item.details && <p className="text-sm text-muted-foreground">{item.details}</p>}
                <p className="text-xs text-muted-foreground">{item.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
