import { StatCard } from "@/components/dashboard/stat-card";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { CircleComparison } from "@/components/dashboard/circle-comparison";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CompetencyChart } from "@/components/dashboard/competency-chart";
import { user } from "@/lib/data";
import { BookCheck, Target, Zap } from "lucide-react";
import { ProfileStrengthCard } from "@/components/dashboard/profile-strength-card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard 
          title="Day Streak" 
          value={user.stats.streak.toString()} 
          icon={<Zap className="h-4 w-4 text-muted-foreground" />} 
          description="Keep it going!"
        />
        <StatCard 
          title="Experience Points" 
          value={user.stats.points.toString()} 
          icon={<Target className="h-4 w-4 text-muted-foreground" />}
          description="+50 since last week"
        />
        <StatCard 
          title="Courses Completed" 
          value={user.stats.coursesCompleted.toString()} 
          icon={<BookCheck className="h-4 w-4 text-muted-foreground" />}
          description="New badge unlocked"
        />
         <ProfileStrengthCard />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <RecommendationCard />
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            <CircleComparison />
            <CompetencyChart />
          </div>
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
           <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
