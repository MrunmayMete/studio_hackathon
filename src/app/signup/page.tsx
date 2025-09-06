'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MorningOwlsLogo } from "@/lib/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd handle Firebase auth here.
    // For this prototype, we'll just redirect to the survey.
    // We clear the 'surveyCompleted' flag to ensure the survey is shown.
    localStorage.removeItem('surveyCompleted');
    router.push('/survey')
  }
  
  const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google</title>
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.62-4.55 1.62-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.25.61 4.45 1.74l2.58-2.58C18.04 1.36 15.48 0 12.48 0 5.88 0 .48 5.39.48 12s5.4 12 12 12c3.1 0 5.56-1.02 7.44-2.88 1.96-1.96 2.58-4.95 2.58-7.77 0-.61-.05-1.21-.15-1.8z"
        fill="#4285F4"
      />
    </svg>
  )

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <MorningOwlsLogo className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Morning_Owls</span>
        </Link>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Join Morning_Owls to start your personalized learning journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Alex Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleSignup}>
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
          </CardContent>
           <CardFooter className="justify-center text-sm">
            <span>Already have an account?</span>
            <Button variant="link" asChild className="p-1">
              <Link href="/login">Log In</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
