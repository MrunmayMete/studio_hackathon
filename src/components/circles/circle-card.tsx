import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

type Circle = {
  id: string;
  name: string;
  description: string;
  members: number;
  tags: string[];
  image: string;
};

interface CircleCardProps {
  circle: Circle;
}

export function CircleCard({ circle }: CircleCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={circle.image}
            alt={circle.name}
            fill
            className="rounded-t-lg object-cover"
            data-ai-hint="community learning"
          />
        </div>
        <div className="p-6 pb-2">
           <CardTitle>{circle.name}</CardTitle>
           <CardDescription className="mt-2 flex items-center text-sm">
             <Users className="mr-2 h-4 w-4" />
             {circle.members} members
           </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{circle.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
         <div className="flex flex-wrap gap-2">
          {circle.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <Button asChild className="w-full">
          <Link href={`/circles/${circle.id}`}>View Circle</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
