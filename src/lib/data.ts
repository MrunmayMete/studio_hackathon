export const user = {
  id: "u1",
  name: "Alex Doe",
  email: "alex.doe@example.com",
  avatar: "https://picsum.photos/100/100",
  skillLevel: "Beginner",
  goals: ["Job Prep", "Certification Exam"],
  selfAssessment: { math: "low", english: "high" },
  testScores: { diagnostic: 60, quizzes: [80, 70] },
  engagement: { studyTime: 120, streak: 4 }, // studyTime in minutes
  stats: {
    streak: 12,
    points: 1850,
    coursesCompleted: 5,
  },
};

export const competencyData = [
  { subject: "Safety Protocols", A: 85, fullMark: 100 },
  { subject: "Tool Handling", A: 92, fullMark: 100 },
  { subject: "Blueprint Reading", A: 78, fullMark: 100 },
  { subject: "Material Science", A: 88, fullMark: 100 },
  { subject: "Client Communication", A: 95, fullMark: 100 },
  { subject: "Project Management", A: 72, fullMark: 100 },
];

export const circleData = {
  name: "Future Electricians",
  userStudyTime: 12.5, // hours
  averageStudyTime: 9.8, // hours
  leaderboard: [
    { name: "Maria Garcia", time: 15.2, avatar: "https://picsum.photos/100/100?random=1" },
    { name: "Alex Doe", time: 12.5, avatar: "https://picsum.photos/100/100?random=2" },
    { name: "Sam Wilson", time: 11.8, avatar: "https://picsum.photos/100/100?random=3" },
    { name: "Jessica Chen", time: 9.5, avatar: "https://picsum.photos/100/100?random=4" },
  ],
};

export const activityFeed = [
  {
    id: 1,
    type: "quiz",
    title: "Quiz: Basic Circuitry",
    timestamp: "2 hours ago",
    details: "Scored 90%",
  },
  {
    id: 2,
    type: "video",
    title: "Video: Understanding Transformers",
    timestamp: "1 day ago",
    details: "Completed",
  },
  {
    id: 3,
    type: "badge",
    title: "Earned 'Circuit Wizard' Badge",
    timestamp: "2 days ago",
    details: "For mastering 5 circuitry topics.",
  },
  {
    id: 4,
    type: "circle",
    title: "Joined 'Future Electricians' Circle",
    timestamp: "4 days ago",
    details: "",
  },
];