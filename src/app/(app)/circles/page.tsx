import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleCard } from "@/components/circles/circle-card";
import { allCircles } from "@/lib/data";
import { PlusCircle, Search } from "lucide-react";

export default function CirclesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Circles</h1>
          <p className="text-muted-foreground">
            Find your community. Learn and grow with peers.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search circles..." className="pl-8" />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Circle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allCircles.map((circle) => (
          <CircleCard key={circle.id} circle={circle} />
        ))}
      </div>
    </div>
  );
}
