# Skillsphere - Personalized Micro-Learning Engine

Welcome to Skillsphere, a full-stack MVP web app for personalized micro-learning, designed for vocational and upskilling learners. This project is built with Next.js, Firebase, and Tailwind CSS, featuring a GenAI-powered recommendation engine.

## Features

- **Secure Authentication**: Firebase Auth with Email/Password and Google Sign-In.
- **Personalized Onboarding**: A multi-step survey to capture learner goals and preferences.
- **Competence Tracking**: Diagnostic tests and engagement tracking to measure progress.
- **Micro-Learning Content**: Bite-sized videos, quizzes, and flashcards with inline assessments.
- **AI Recommendations**: A GenAI-powered engine suggests the next best learning step.
- **Community Circles**: Join peer groups for collaborative learning and friendly competition.
- **Comprehensive Dashboard**: Visualize progress, compare with peers, and see AI-driven recommendations.
- **Admin Capabilities**: Manage content and view analytics.

## Tech Stack

- **Framework**: Next.js (with App Router)
- **Backend**: Firebase (Authentication, Firestore)
- **AI**: Google's Gemini model via Genkit
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts

## Project Structure

```
.
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (app)/          # Authenticated routes
│   │   │   ├── dashboard/
│   │   │   └── layout.tsx
│   │   ├── login/
│   │   └── layout.tsx
│   │   └── page.tsx
│   ├── components/         # Reusable React components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── ui/             # shadcn/ui components
│   ├── ai/                 # Genkit AI flows and configuration
│   ├── firebase/           # Firebase configuration
│   └── lib/                # Utility functions and mock data
├── .firebaserc             # Firebase project configuration
├── firebase.json           # Firebase hosting/functions configuration
├── next.config.ts          # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Firebase Setup

This project is configured to use Firebase for backend services.

### 1. Create a Firebase Project

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click "Add project" and follow the steps to create a new project.

### 2. Register Your Web App

- In your project's dashboard, click the web icon (`</>`) to add a new web app.
- Give your app a nickname and click "Register app".
- Firebase will provide you with a `firebaseConfig` object. You will need this for the next step.

### 3. Configure Authentication

- In the Firebase Console, go to **Authentication**.
- Click "Get started".
- Under the **Sign-in method** tab, enable:
  - **Email/Password**
  - **Google**

### 4. Set up Firestore

- In the Firebase Console, go to **Firestore Database**.
- Click "Create database".
- Start in **test mode** for easy setup. You can change security rules later.
- Choose a location for your database.

### 5. Environment Variables

Create a file named `.env.local` in the root of your project and add your Firebase configuration keys:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace `your_...` with the values from the `firebaseConfig` object you obtained earlier.

## Running Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

## Deployment

This Next.js application is best deployed on a platform that supports Node.js environments, like Vercel or Firebase App Hosting.

### Deploying to Vercel (Recommended)

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com/new).
3.  Click "Import Git Repository" and select your project.
4.  Vercel will automatically detect that it's a Next.js project.
5.  **Important**: Add your environment variables (from `.env.local`) in the Vercel project settings under **Settings > Environment Variables**.
6.  Click "Deploy".

### Deploying to Firebase Hosting

This project is configured for deployment to Firebase Hosting.

1.  **Install Firebase CLI**:
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase**:
    ```bash
    firebase login
    ```

3.  **Link your project**:
    In your local project directory, run:
    ```bash
    firebase use --add
    ```
    And select the Firebase project you created.

4.  **Build and Deploy**:
    ```bash
    npm run build
    firebase deploy --only hosting
    ```
