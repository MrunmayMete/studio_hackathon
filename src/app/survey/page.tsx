'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const steps = [
  { id: '01', title: 'Getting to Know You' },
  { id: '02', title: 'Your Goals' },
  { id: '03', title: 'Your Learning Style' },
  { id: '04', title: 'Final Touches' },
]

export default function SurveyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    domain: '',
    background: '',
    goals: [] as string[],
    role: '',
    time: '',
    motivation: '',
    obstacles: '',
    competency: 'Beginner',
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Survey Data:', formData)
    // In a real app, you would save this data.
    // We use localStorage to simulate that the user has completed the survey.
    localStorage.setItem('surveyCompleted', 'true');
    const params = new URLSearchParams()
    params.set('domain', formData.domain)
    params.set('goals', formData.goals.join(','))
    router.push(`/assessment?${params.toString()}`)
  }
  
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-muted-foreground">Step {steps[currentStep].id} of {steps.length}</p>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>
            Help us tailor your learning experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="domain">Subject/Domain of Interest</Label>
                  <Input
                    id="domain"
                    placeholder="e.g., Electrical, Plumbing, HVAC"
                    value={formData.domain}
                    onChange={(e) => handleChange('domain', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background">Academic Background</Label>
                  <Select
                    onValueChange={(value) => handleChange('background', value)}
                    value={formData.background}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your background" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School / GED</SelectItem>
                      <SelectItem value="vocational-school">Vocational School</SelectItem>
                      <SelectItem value="some-college">Some College</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree or higher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>What are your primary goals?</Label>
                  <div className="flex flex-col space-y-2">
                    {['Certification Exam', 'Job Preparation', 'Personal Development', 'Skill Upskilling'].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal}
                          checked={formData.goals.includes(goal)}
                          onCheckedChange={(checked) => {
                            const newGoals = checked
                              ? [...formData.goals, goal]
                              : formData.goals.filter((g) => g !== goal)
                            handleChange('goals', newGoals)
                          }}
                        />
                        <Label htmlFor={goal} className="font-normal">{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="role">Which best describes you?</Label>
                  <Select
                    onValueChange={(value) => handleChange('role', value)}
                    value={formData.role}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="k12">K-12 Student</SelectItem>
                      <SelectItem value="higher-ed">Higher Education Student</SelectItem>
                      <SelectItem value="vocational">Vocational/Trade Apprentice</SelectItem>
                      <SelectItem value="workforce">Workforce Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="time">How much time can you commit weekly?</Label>
                   <Select
                    onValueChange={(value) => handleChange('time', value)}
                    value={formData.time}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select weekly time commitment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 hours</SelectItem>
                      <SelectItem value="3-5">3-5 hours</SelectItem>
                      <SelectItem value="6-10">6-10 hours</SelectItem>
                      <SelectItem value="10+">10+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivation">What's your primary motivation?</Label>
                  <Input
                    id="motivation"
                    placeholder="e.g., Career change, salary increase, hobby"
                    value={formData.motivation}
                    onChange={(e) => handleChange('motivation', e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
                 <div className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="obstacles">What are your biggest obstacles to learning?</Label>
                        <Input
                            id="obstacles"
                            placeholder="e.g., Lack of time, finding resources"
                            value={formData.obstacles}
                            onChange={(e) => handleChange('obstacles', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Self-Assessed Competency</Label>
                        <RadioGroup
                            value={formData.competency}
                            onValueChange={(value) => handleChange('competency', value)}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Beginner" id="beginner" />
                                <Label htmlFor="beginner">Beginner</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Intermediate" id="intermediate" />
                                <Label htmlFor="intermediate">Intermediate</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Expert" id="expert" />
                                <Label htmlFor="expert">Expert</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            {currentStep > 0 ? (
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
            ) : ( <div></div> )}
            
            {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button onClick={handleSubmit}>
                    Finish & View Assessment
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  )
}
