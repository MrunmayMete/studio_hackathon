import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, LifeBuoy } from "lucide-react";

const faqs = [
  {
    question: "How is my competency level determined?",
    answer: "Your competency level is initially set by your self-assessment in the survey. As you complete quizzes and other activities, we adjust your level for each topic based on your performance to provide a more tailored learning experience.",
  },
  {
    question: "How do I join a Circle?",
    answer: "Navigate to the Circles page, browse the available communities, and click the 'Join Circle' button on any circle that interests you. You'll then be added as a member.",
  },
  {
    question: "Can I create my own Circle?",
    answer: "Currently, creating new circles is a feature we are developing. Stay tuned for updates!",
  },
  {
    question: "How are my AI recommendations generated?",
    answer: "Our AI engine analyzes your goals, your performance on diagnostic tests and quizzes, and your engagement on the platform to suggest the most relevant content to help you improve.",
  },
]

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support</h1>
        <p className="text-muted-foreground">
          Get help with the platform, or contact us if you have questions.
        </p>
      </div>
      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <LifeBuoy className="h-6 w-6 text-primary"/>
                        Frequently Asked Questions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                             <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
         <div>
            <Card>
                <CardHeader>
                    <CardTitle>Contact Us</CardTitle>
                    <CardDescription>
                        Can't find the answer you're looking for? Reach out to us.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Email</p>
                            <a href="mailto:support@skillsphere.com" className="text-sm text-primary hover:underline">
                                support@skillsphere.com
                            </a>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="font-semibold">Phone</p>
                            <p className="text-sm text-muted-foreground">
                                +1 (555) 123-4567
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
