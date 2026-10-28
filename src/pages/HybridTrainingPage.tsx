import React, { useState } from 'react';
import { 
  Zap, 
  Flame, 
  Activity, 
  Dumbbell, 
  Play, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Info,
  ShieldAlert,
  History
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { WorkoutSession, ExerciseItem } from '../types';

interface HybridTrainingPageProps {
  onStartWorkout: (workout: WorkoutSession) => void;
  onSelectExercise: (exercise: ExerciseItem) => void;
  onNavigate: (page: string) => void;
}

export const HybridTrainingPage: React.FC<HybridTrainingPageProps> = ({
  onStartWorkout,
  onSelectExercise,
  onNavigate,
}) => {
  const { language, t } = useLanguage();
  const { workouts, exercises, userWorkoutLogs } = useData();

  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [activeTab, setActiveTab] = useState<'sessions' | 'exercises' | 'schedule' | 'history'>('sessions');

  // Filter workouts belonging to hybrid, running or conditioning
  const hybridWorkouts = workouts.filter((w) => {
    const matchesLevel = selectedLevel === 'all' || w.level === selectedLevel;
    return matchesLevel && (w.category === 'hybrid' || w.category === 'running' || w.category === 'fitness');
  });

  const hybridExercises = exercises.filter((ex) => 
    ex.category === 'running' || ex.category === 'strength' || ex.category === 'bodyweight' || ex.category === 'mobility'
  );

  const hybridLogs = userWorkoutLogs.filter(
    (l) => l.category === 'hybrid' || l.category === 'running' || l.category === 'fitness'
  );

  // 7-day weekly hybrid athlete split template
  const sampleWeekSchedule = [
    { day: 1, titleEn: 'Lower Strength & Interval Run', titleHi: 'लोअर स्ट्रेंथ और इंटरवल रन', duration: '40m', type: 'strength_run' },
    { day: 2, titleEn: 'Aerobic Base Run (Easy Pace)', titleHi: 'एरोबिक बेस रन (धीमी गति)', duration: '30m', type: 'run' },
    { day: 3, titleEn: 'Deep Hip & Spinal Mobility', titleHi: 'गहन हिप व स्पाइनल मोबिलिटी', duration: '25m', type: 'mobility' },
    { day: 4, titleEn: 'Upper Body & Core Power', titleHi: 'अपर बॉडी व कोर पावर', duration: '35m', type: 'strength' },
    { day: 5, titleEn: 'High Intensity Sprint Repeats', titleHi: 'हाई इंटेंसिटी स्प्रिंट रिपीट्स', duration: '30m', type: 'sprint' },
    { day: 6, titleEn: 'Full Body Conditioning Flow', titleHi: 'फुल बॉडी कंडीशनिंग फ्लो', duration: '35m', type: 'hybrid' },
    { day: 7, titleEn: 'Complete Rest & Recovery Day', titleHi: 'पूर्ण विश्राम एवं रिकवरी दिवस', duration: '0m', type: 'rest' },
  ];

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Module Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#182030] to-[#0D121B] border border-lime-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-bold w-fit uppercase">
          <Zap className="w-3.5 h-3.5" />
          <span>JFZ HYBRID SYSTEM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
          {t('hybridTrainingTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
          {t('hybridTrainingSubtitle')}
        </p>

        {/* Level Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                selectedLevel === lvl
                  ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {lvl === 'all' ? (language === 'hi' ? 'सभी स्तर' : 'All Levels') : t(lvl)}
            </button>
          ))}
        </div>
      </div>

      {/* Section Sub-Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#121620] border border-white/10 overflow-x-auto no-scrollbar">
        {[
          { id: 'sessions', label: language === 'hi' ? 'वर्कआउट सेशन्स' : 'Workouts', icon: Zap },
          { id: 'exercises', label: language === 'hi' ? 'व्यायाम लाइब्रेरी' : 'Exercises', icon: Dumbbell },
          { id: 'schedule', label: language === 'hi' ? 'साप्ताहिक कैलेंडर' : 'Weekly Split', icon: Calendar },
          { id: 'history', label: language === 'hi' ? 'मेरा इतिहास' : 'History', icon: History },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[100px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-lime-400 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Workout Sessions */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{language === 'hi' ? 'उपलब्ध हाइब्रिड रूटीन' : 'Available Routines'} ({hybridWorkouts.length})</span>
            <span className="text-[11px] text-lime-400 font-semibold">Editable Demonstration Samples</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hybridWorkouts.map((wo) => (
              <div
                key={wo.id}
                className="p-5 rounded-3xl bg-[#121620] border border-white/10 hover:border-lime-500/40 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
                    {wo.level} • {wo.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-lime-400" />
                    <span>{wo.estimatedMinutes} mins</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-lime-300 transition-colors">
                  {language === 'hi' ? wo.titleHi : wo.titleEn}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {language === 'hi' ? wo.descriptionHi : wo.descriptionEn}
                </p>

                {/* Exercises Preview list */}
                <div className="space-y-1 pt-1">
                  {wo.exercises.map((ex, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] text-slate-300 bg-black/30 px-2.5 py-1.5 rounded-lg">
                      <span className="truncate">{language === 'hi' ? ex.nameHi : ex.nameEn}</span>
                      <span className="text-lime-400 font-mono shrink-0 ml-2">{ex.sets} sets × {ex.reps}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onStartWorkout(wo)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 shadow-md shadow-lime-400/20 transition-all"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>{t('startWorkout')}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Exercise Library */}
      {activeTab === 'exercises' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-400">
            {language === 'hi' ? 'तकनीक, गलतियां और सुरक्षा निर्देश देखने के लिए क्लिक करें:' : 'Click any exercise for complete form guidance, common mistakes, and safety notes:'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hybridExercises.map((ex) => (
              <div
                key={ex.id}
                onClick={() => onSelectExercise(ex)}
                className="p-3.5 rounded-2xl bg-[#121620] border border-white/10 hover:border-lime-400/40 cursor-pointer transition-all flex items-center gap-3 group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 shrink-0">
                  <img
                    src={ex.imageUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'}
                    alt={ex.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold uppercase text-lime-400">
                    {ex.category} • {ex.difficulty}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-lime-300">
                    {language === 'hi' ? ex.nameHi : ex.nameEn}
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {ex.muscleGroups}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-lime-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Weekly Split Calendar */}
      {activeTab === 'schedule' && (
        <div className="p-5 rounded-3xl bg-[#121620] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-white">
                {language === 'hi' ? 'अनुशंसित 7-दिवसीय हाइब्रिड विभाजन' : 'Recommended 7-Day Hybrid Split'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'hi'
                  ? 'अति-प्रशिक्षण से बचने के लिए गति, शक्ति और विश्राम का वैज्ञानिक संतुलन।'
                  : 'Balanced endurance, progressive strength, and recovery to prevent burnout.'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {sampleWeekSchedule.map((item) => (
              <div
                key={item.day}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                  item.type === 'rest'
                    ? 'bg-zinc-900/60 border-white/5 text-slate-400'
                    : 'bg-black/30 border-white/10 text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-lime-400/20 text-lime-400 font-extrabold flex items-center justify-center text-xs">
                    D{item.day}
                  </span>
                  <div>
                    <div className="font-bold">
                      {language === 'hi' ? item.titleHi : item.titleEn}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {item.type === 'rest' ? (language === 'hi' ? 'सक्रिय रिकवरी' : 'Full Rest') : `${item.duration} focus`}
                    </div>
                  </div>
                </div>

                {item.type === 'rest' ? (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 text-slate-400">
                    Rest Day
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                    Training
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: History */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {hybridLogs.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#121620] border border-white/10 text-center space-y-2">
              <p className="text-xs font-bold text-slate-300">
                {language === 'hi' ? 'कोई हाइब्रिड वर्कआउट रिकॉर्ड नहीं मिला' : 'No hybrid sessions logged yet'}
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'hi'
                  ? 'अपना पहला हाइब्रिड वर्कआउट पूरा करें ताकि सत्र की अवधि और आंकड़े यहाँ दर्ज हों।'
                  : 'Start and complete a hybrid session above to record real duration and notes.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {hybridLogs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-[#121620] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-lime-400">{log.category}</span>
                    <h4 className="text-xs font-bold text-white">{log.workoutTitle}</h4>
                    <p className="text-[10px] text-slate-400">
                      {new Date(log.completedAt).toLocaleDateString()} • {log.durationMinutes} mins
                      {log.runningDistanceKm ? ` • ${log.runningDistanceKm} km` : ''}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-lime-400" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Safety Notice Card */}
      <div className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-white">{language === 'hi' ? 'सुरक्षा निर्देश: ' : 'Safety Guidance: '}</span>
          {language === 'hi'
            ? 'हम अत्यधिक व्यायाम भार की सलाह नहीं देते। यदि आप किसी भी बिंदु पर सीने में दर्द, सांस की तकलीफ या चक्कर महसूस करते हैं, तो तुरंत रुकें।'
            : 'We do not prescribe extreme exercise volumes or guarantee instant results. Progress at your own pace and cease immediately if you experience pain or dizziness.'}
        </div>
      </div>
    </div>
  );
};
