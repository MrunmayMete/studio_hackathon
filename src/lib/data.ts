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
    { id: "u2", name: "Maria Garcia", time: 15.2, avatar: "https://picsum.photos/100/100?random=1" },
    { id: "u1", name: "Alex Doe", time: 12.5, avatar: "https://picsum.photos/100/100?random=2" },
    { id: "u3", name: "Sam Wilson", time: 11.8, avatar: "https://picsum.photos/100/100?random=3" },
    { id: "u4", name: "Jessica Chen", time: 9.5, avatar: "https://picsum.photos/100/100?random=4" },
  ],
};

export const allCircles = [
    {
        id: 'future-electricians',
        name: 'Future Electricians',
        description: 'A group for aspiring electricians to share knowledge, ask questions, and grow together.',
        members: 48,
        tags: ['Electrical', 'Beginner', 'Certification'],
        image: 'https://picsum.photos/600/400?random=10'
    },
    {
        id: 'plumbing-pros',
        name: 'Plumbing Pros',
        description: 'From leaky faucets to full installations, this is the place for all things plumbing.',
        members: 32,
        tags: ['Plumbing', 'All Levels', 'Community'],
        image: 'https://picsum.photos/600/400?random=11'

    },
    {
        id: 'hvac-heroes',
        name: 'HVAC Heroes',
        description: 'Join our community of HVAC technicians to discuss the latest in heating, ventilation, and air conditioning.',
        members: 25,
        tags: ['HVAC', 'Professional', 'Tech Talk'],
        image: 'https://picsum.photos/600/400?random=12'
    },
     {
        id: 'welding-wonders',
        name: 'Welding Wonders',
        description: 'For those who love to join metal. Share your projects, techniques, and safety tips.',
        members: 64,
        tags: ['Welding', 'Hobbyist', 'Projects'],
        image: 'https://picsum.photos/600/400?random=13'
    }
]

export const forumThreads = [
    {
        id: 't1',
        title: 'Best way to prepare for the journeyman electrician exam?',
        author: 'Maria Garcia',
        authorAvatar: 'https://picsum.photos/100/100?random=1',
        timestamp: '2 days ago',
        replies: 15,
        views: 120,
    },
    {
        id: 't2',
        title: 'Troubleshooting a GFCI outlet that keeps tripping',
        author: 'Sam Wilson',
        authorAvatar: 'https://picsum.photos/100/100?random=3',
        timestamp: '5 days ago',
        replies: 8,
        views: 98,
    },
    {
        id: 't3',
        title: 'Show off your latest project!',
        author: 'Jessica Chen',
        authorAvatar: 'https://picsum.photos/100/100?random=4',
        timestamp: '1 week ago',
        replies: 22,
        views: 250,
    }
]

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

export type MyLearningContent = {
    id: string;
    type: 'video' | 'article' | 'quiz';
    title: string;
    source: string;
    url: string;
    thumbnailUrl: string;
    duration: string;
    topics: string[];
    status: 'Not Started' | 'In Progress' | 'Completed';
}

export const myLearningContent: MyLearningContent[] = [
    {
        id: 'lc1',
        type: 'video',
        title: 'Introduction to Residential Wiring',
        source: 'YouTube',
        url: 'https://youtube.com',
        thumbnailUrl: 'https://picsum.photos/600/400?random=20',
        duration: '15 min',
        topics: ['Wiring', 'Safety'],
        status: 'Not Started'
    },
    {
        id: 'lc2',
        type: 'article',
        title: 'Understanding the National Electrical Code (NEC)',
        source: 'NFPA Journal',
        url: 'https://www.nfpa.org/news-and-research/publications-and-media/nfpa-journal',
        thumbnailUrl: 'https://picsum.photos/600/400?random=21',
        duration: '25 min read',
        topics: ['NEC', 'Code', 'Safety'],
        status: 'In Progress'
    },
    {
        id: 'lc3',
        type: 'quiz',
        title: 'Quiz: Circuit Breaker Fundamentals',
        source: 'Skillsphere',
        url: '/learn/Circuit-Breaker-Fundamentals',
        thumbnailUrl: 'https://picsum.photos/600/400?random=22',
        duration: '10 questions',
        topics: ['Circuit Breakers', 'Safety'],
        status: 'Completed'
    },
    {
        id: 'lc4',
        type: 'video',
        title: 'How to Use a Multimeter',
        source: 'YouTube',
        url: 'https://youtube.com',
        thumbnailUrl: 'https://picsum.photos/600/400?random=23',
        duration: '8 min',
        topics: ['Tools', 'Diagnostics'],
        status: 'Not Started'
    },
     {
        id: 'lc5',
        type: 'article',
        title: 'A Guide to Different Types of Electrical Wires',
        source: 'The Spruce',
        url: 'https://www.thespruce.com/',
        thumbnailUrl: 'https://picsum.photos/600/400?random=24',
        duration: '12 min read',
        topics: ['Wiring', 'Materials'],
        status: 'Not Started'
    },
    {
        id: 'lc6',
        type: 'quiz',
        title: 'Quiz: OSHA Safety Standards',
        source: 'Skillsphere',
        url: '/learn/OSHA-Safety-Standards',
        thumbnailUrl: 'https://picsum.photos/600/400?random=25',
        duration: '15 questions',
        topics: ['OSHA', 'Safety'],
        status: 'Not Started'
    },
];

export const enterpriseGroups = [
    {
        id: 'eg1',
        name: 'ACME Inc. Apprentices',
        members: [
            { id: 'u5', name: 'John Smith', email: 'john.s@acme.com', avatar: 'https://picsum.photos/100/100?random=5' },
            { id: 'u6', name: 'Jane Miller', email: 'jane.m@acme.com', avatar: 'https://picsum.photos/100/100?random=6' },
        ]
    },
    {
        id: 'eg2',
        name: 'BuildWell Co. Trainees',
        members: [
            { id: 'u7', name: 'Peter Jones', email: 'p.jones@buildwell.co', avatar: 'https://picsum.photos/100/100?random=7' },
            { id: 'u8', name: 'Emily White', email: 'e.white@buildwell.co', avatar: 'https://picsum.photos/100/100?random=8' },
            { id: 'u9', name: 'Chris Green', email: 'c.green@buildwell.co', avatar: 'https://picsum.photos/100/100?random=9' },
        ]
    }
];

export const courseAssignments = [
    {
        id: 'ca1',
        courseName: 'Introduction to Residential Wiring',
        assigneeName: 'ACME Inc. Apprentices',
        assigneeType: 'group',
        dueDate: '2024-08-15',
        status: 'In Progress'
    },
    {
        id: 'ca2',
        courseName: 'Quiz: OSHA Safety Standards',
        assigneeName: 'Peter Jones',
        assigneeType: 'user',
        dueDate: '2024-07-30',
        status: 'Not Started'
    },
    {
        id: 'ca3',
        courseName: 'Understanding the National Electrical Code (NEC)',
        assigneeName: 'BuildWell Co. Trainees',
        assigneeType: 'group',
        dueDate: '2024-09-01',
        status: 'Not Started'
    }
]
