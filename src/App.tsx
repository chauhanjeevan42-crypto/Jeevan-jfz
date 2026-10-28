/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { WorkoutPlayerModal } from './components/WorkoutPlayerModal';
import { ExerciseDetailModal } from './components/ExerciseDetailModal';
import { AuthModal } from './components/AuthModal';
import { AIAssistantModal } from './components/AIAssistantModal';

import { HomePage } from './pages/HomePage';
import { HybridTrainingPage } from './pages/HybridTrainingPage';
import { FitnessPage } from './pages/FitnessPage';
import { MartialArtsPage } from './pages/MartialArtsPage';
import { VideosPage } from './pages/VideosPage';
import { TrainingPlansPage } from './pages/TrainingPlansPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

import { WorkoutSession, ExerciseItem, VideoLessonItem, TrainingProgramPlan } from './types';
import { useData } from './context/DataContext';

function MainAppContent() {
  const { exercises } = useData();
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);

  // Active workout session modal
  const [activeWorkoutSession, setActiveWorkoutSession] = useState<WorkoutSession | null>(null);

  // Exercise detail modal
  const [activeExerciseDetail, setActiveExerciseDetail] = useState<ExerciseItem | null>(null);

  // Video opened from other tabs
  const [activeVideoLesson, setActiveVideoLesson] = useState<VideoLessonItem | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartWorkout = (workout: WorkoutSession) => {
    setActiveWorkoutSession(workout);
  };

  const handleOpenExerciseById = (exerciseId: string) => {
    const found = exercises.find((e) => e.id === exerciseId);
    if (found) {
      setActiveExerciseDetail(found);
    }
  };

  const handleOpenVideoLesson = (video: VideoLessonItem) => {
    setActiveVideoLesson(video);
    setCurrentPage('videos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPlan = (plan: TrainingProgramPlan) => {
    setCurrentPage('plans');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onStartWorkout={handleStartWorkout}
            onOpenVideo={handleOpenVideoLesson}
            onOpenPlan={handleOpenPlan}
            onOpenAi={() => setAiModalOpen(true)}
          />
        );

      case 'training':
      case 'hybrid':
        return (
          <HybridTrainingPage
            onStartWorkout={handleStartWorkout}
            onSelectExercise={(ex) => setActiveExerciseDetail(ex)}
            onNavigate={handleNavigate}
          />
        );

      case 'fitness':
        return (
          <FitnessPage
            onSelectExercise={(ex) => setActiveExerciseDetail(ex)}
            onStartCustomWorkout={handleStartWorkout}
          />
        );

      case 'martial_arts':
        return (
          <MartialArtsPage
            initialSubTab="overview"
            onOpenVideo={handleOpenVideoLesson}
            onSelectExercise={(ex) => setActiveExerciseDetail(ex)}
            onStartWorkout={handleStartWorkout}
          />
        );

      case 'silat':
        return (
          <MartialArtsPage
            initialSubTab="silat"
            onOpenVideo={handleOpenVideoLesson}
            onSelectExercise={(ex) => setActiveExerciseDetail(ex)}
            onStartWorkout={handleStartWorkout}
          />
        );

      case 'judo':
        return (
          <MartialArtsPage
            initialSubTab="judo"
            onOpenVideo={handleOpenVideoLesson}
            onSelectExercise={(ex) => setActiveExerciseDetail(ex)}
            onStartWorkout={handleStartWorkout}
          />
        );

      case 'videos':
        return (
          <VideosPage
            initialVideo={activeVideoLesson}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        );

      case 'plans':
        return (
          <TrainingPlansPage
            onOpenAuth={() => setAuthModalOpen(true)}
            onNavigate={handleNavigate}
          />
        );

      case 'progress':
        return (
          <ProgressPage
            onOpenAuth={() => setAuthModalOpen(true)}
            onNavigate={handleNavigate}
          />
        );

      case 'profile':
      case 'settings':
        return (
          <ProfilePage
            onOpenAuth={() => setAuthModalOpen(true)}
            onNavigate={handleNavigate}
          />
        );

      case 'admin':
        return <AdminPage />;

      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;

      case 'contact':
        return <ContactPage />;

      case 'privacy':
        return <LegalPage initialType="privacy" />;

      case 'terms':
        return <LegalPage initialType="terms" />;

      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onStartWorkout={handleStartWorkout}
            onOpenVideo={handleOpenVideoLesson}
            onOpenPlan={handleOpenPlan}
            onOpenAi={() => setAiModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-white flex flex-col font-sans selection:bg-lime-400 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        onOpenSidebar={() => setSidebarOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAi={() => setAiModalOpen(true)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-lg md:max-w-2xl lg:max-w-4xl w-full mx-auto px-3.5 sm:px-6 pt-4 sm:pt-6">
        {renderCurrentPage()}
      </main>

      {/* Bottom Nav on Mobile / Persistent */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Slide-over Drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenAi={() => setAiModalOpen(true)}
      />

      {/* Active Workout Player Modal */}
      <WorkoutPlayerModal
        workout={activeWorkoutSession}
        onClose={() => setActiveWorkoutSession(null)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onSelectExerciseDetails={handleOpenExerciseById}
      />

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={activeExerciseDetail}
        onClose={() => setActiveExerciseDetail(null)}
        onStartSingleExerciseWorkout={(ex) => {
          setActiveWorkoutSession({
            id: `single-${ex.id}`,
            titleEn: ex.nameEn,
            titleHi: ex.nameHi,
            descriptionEn: ex.descriptionEn,
            descriptionHi: ex.descriptionHi,
            category: ex.category as any,
            level: ex.difficulty,
            estimatedMinutes: 15,
            exercises: [
              {
                exerciseId: ex.id,
                nameEn: ex.nameEn,
                nameHi: ex.nameHi,
                sets: ex.sets || 3,
                reps: ex.reps || '10',
                restSec: ex.restSec || 45,
                durationSec: ex.durationSec,
              }
            ],
            isSample: false,
            isPublished: true,
          });
        }}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Gemini AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <DataProvider>
          <MainAppContent />
        </DataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
