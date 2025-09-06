import { Button } from '@/components/ui/button'
import { ArrowRight, BrainCircuit, GraduationCap, Users } from 'lucide-react'
import Link from 'next/link'
import { SkillsphereLogo } from '@/lib/icons'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <SkillsphereLogo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Skillsphere</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
              Unlock Your Potential with Personalized Learning
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Skillsphere uses AI to create a unique learning path just for you. Master new vocational skills through bite-sized lessons, interactive quizzes, and community support.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">
                  Start Learning for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="bg-card py-20 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">A Smarter Way to Upskill</h2>
              <p className="mt-4 text-lg text-muted-foreground">Everything you need to succeed in your vocational journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg">
                <div className="bg-primary/10 p-4 rounded-full">
                  <BrainCircuit className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">AI-Powered Path</h3>
                <p className="mt-2 text-muted-foreground">Our generative AI tailors content recommendations to your unique goals and skill level.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg">
                <div className="bg-primary/10 p-4 rounded-full">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">Micro-Learning</h3>
                <p className="mt-2 text-muted-foreground">Engaging, bite-sized content like videos, quizzes, and flashcards that fit your schedule.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-foreground">Peer Circles</h3>
                <p className="mt-2 text-muted-foreground">Connect with learners on a similar path, share insights, and stay motivated together.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Skillsphere. All rights reserved.</p>
      </footer>
    </div>
  )
}
