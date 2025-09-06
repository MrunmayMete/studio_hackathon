import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar as CalendarIcon, User, BookOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { courseAssignments } from "@/lib/data";

export default function AdminAssignmentsPage() {
  const getStatusVariant = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    if (due < today) return "destructive";
    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 7) return "secondary";
    return "outline";
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Course Assignments</CardTitle>
          <CardDescription>
            Assign courses to users or groups and track their completion.
          </CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Assignment
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courseAssignments.map(assignment => (
                     <TableRow key={assignment.id}>
                        <TableCell className="font-medium flex items-center gap-2">
                           <BookOpen className="h-5 w-5 text-muted-foreground" />
                           {assignment.courseName}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                             {assignment.assigneeType === 'user' ? <User className="h-5 w-5 text-muted-foreground" /> : <Users className="h-5 w-5 text-muted-foreground" />}
                             {assignment.assigneeName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                             <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                             {assignment.dueDate}
                          </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(assignment.dueDate)}>
                                {assignment.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           <Button variant="ghost" size="sm">Edit</Button>
                           <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}