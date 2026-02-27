# GitFlow - AI-Powered Git Learning Platform

GitFlow is a gamified, interactive platform designed to help developers master Git through hands-on practice, AI-guided mentorship, and comprehensive progress tracking.

## Project Structure

The project follows a component-based architecture with a clean separation of concerns:

- `/src/components`: Reusable UI components (Sidebar, TopBar, etc.)
- `/src/Dashboard.tsx`: Main overview page with XP, streak, and mission status.
- `/src/LearningPath.tsx`: Structured curriculum with module-based progression.
- `/src/PracticeMode.tsx`: Interactive VS Code-like environment with terminal and AI Mentor.
- `/src/ProgressAnalytics.tsx`: Detailed data visualization of user growth and skill distribution.
- `/src/lib/utils.ts`: Utility functions for Tailwind class merging.

## Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Features

- **Gamified Dashboard**: Track your XP, level, and daily streaks.
- **Interactive Practice**: Real-world terminal simulation and code editor.
- **AI Mentorship**: Context-aware guidance and mistake explanation.
- **Visual Analytics**: Radar charts and trend graphs to visualize your Git mastery.
