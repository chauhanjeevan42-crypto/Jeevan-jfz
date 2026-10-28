import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  Trophy, 
  Flame, 
  Activity,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WorkoutSession } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

interface WorkoutPlayerModalProps {
  workout: WorkoutSession | null;
  onClose: () => void;
  onOpenAuth: () => void;
  onSelectExerciseDetails?: (exerciseId: string) => void;
}

export const WorkoutPlayerModal: React.FC<WorkoutPlayerModalProps> = ({
  workout,
  onClose,
  onOpenAuth,
  onSelectExerciseDetails,
}) => {
  const { t, language } = useLanguage();
  const { logWorkout } = useData();
  const { currentUser } = useAuth();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedExercises, setCompletedExercises] = useState<Record<number, boolean>>({});
  
  // Overall Workout Timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Rest Interval Timer
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number>(0);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);

  // Finish State
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [userNotes, setUserNotes] = useState<string>('');
  const [runningDistanceKm, setRunningDistanceKm] = useState<string>('');
  const [runningTimeMinutes, setRunningTimeMinutes] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Stopwatch effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isFinished]);

  // Rest countdown effect
  useEffect(() => {
    let restInterval: any = null;
    if (isRestActive && restSecondsRemaining > 0) {
      restInterval = setInterval(() => {
        setRestSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [isRestActive, restSecondsRemaining]);

  if (!workout) return null;

  const currentExercise = workout.exercises[activeStep] || workout.exercises[0];

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRest = (duration: number = 45) => {
    setRestSecondsRemaining(duration);
    setIsRestActive(true);
  };

  const toggleExerciseCheck = (index: number) => {
    setCompletedExercises((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      // If marked done and there's a rest interval, start rest timer automatically!
      if (!prev[index] && currentExercise.restSec) {
        handleStartRest(currentExercise.restSec);
      }
      return next;
    });
  };

  const handleFinishPrompt = () => {
    setIsTimerRunning(false);
    setIsFinished(true);
    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a3e635', '#22c55e', '#38ef7d', '#ffffff']
    });
  };

  const handleSaveWorkoutLog = async () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    setIsSaving(true);
    try {
      const durationMins = Math.max(1, Math.round(elapsedSeconds / 60));
      const title = language === 'hi' ? workout.titleHi : workout.titleEn;

      await logWorkout({
        workoutTitle: title,
        category: workout.category,
        durationMinutes: durationMins,
        notes: userNotes,
        runningDistanceKm: runningDistanceKm ? parseFloat(runningDistanceKm) : undefined,
        runningTimeMinutes: runningTimeMinutes ? parseFloat(runningTimeMinutes) : undefined,
        completedAt: new Date().toISOString(),
      });

      setSaveSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Failed to log workout:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const completedCount = Object.values(completedExercises).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / workout.exercises.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#121620] border border-lime-500/30 rounded-3xl w-full max-w-lg max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top bar with timer */}
        <div className="p-4 border-b border-white/10 bg-black/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {language === 'hi' ? 'सक्रिय वर्कआउट' : 'Active Session'}
              </div>
              <div className="text-white font-extrabold text-sm truncate max-w-[200px]">
                {language === 'hi' ? workout.titleHi : workout.titleEn}
              </div>
            </div>
          </div>

          {/* Stopwatch & Pause */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 border border-white/10 font-mono text-lime-400 font-extrabold text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300"
              title={isTimerRunning ? 'Pause' : 'Resume'}
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-lime-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-800 h-1.5">
          <div
            className="bg-lime-400 h-1.5 transition-all duration-300 shadow-[0_0_8px_#a3e635]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Body Content */}
        {!isFinished ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Rest Timer Banner (if active) */}
            {isRestActive && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-500/40 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-amber-300">
                      {language === 'hi' ? 'विश्राम अंतराल (Rest)' : 'Rest Interval'}
                    </div>
                    <div className="text-xl font-black font-mono text-white">
                      {restSecondsRemaining}s
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRestSecondsRemaining((prev) => prev + 30)}
                    className="px-2 py-1 rounded-lg bg-amber-400/20 text-amber-300 text-xs font-bold"
                  >
                    +30s
                  </button>
                  <button
                    onClick={() => setIsRestActive(false)}
                    className="px-2 py-1 rounded-lg bg-white/10 text-white text-xs font-medium"
                  >
                    Skip
                  </button>
                </div>
              </div>
            )}

            {/* Current Exercise Spotlight Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-lime-400 uppercase tracking-wider">
                  Exercise {activeStep + 1} of {workout.exercises.length}
                </span>
                {onSelectExerciseDetails && (
                  <button
                    onClick={() => onSelectExerciseDetails(currentExercise.exerciseId)}
                    className="text-[11px] text-slate-400 hover:text-lime-300 underline"
                  >
                    {language === 'hi' ? 'तकनीक व निर्देश देखें' : 'View technique guide'}
                  </button>
                )}
              </div>

              <h3 className="text-lg font-black text-white leading-tight">
                {language === 'hi' ? currentExercise.nameHi : currentExercise.nameEn}
              </h3>

              {/* Targets & Reps Chips */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('sets')}</div>
                  <div className="text-base font-black text-lime-400">{currentExercise.sets}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('reps')}</div>
                  <div className="text-base font-black text-white">{currentExercise.reps}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('rest')}</div>
                  <div className="text-base font-black text-amber-400">{currentExercise.restSec}s</div>
                </div>
              </div>

              {/* Action Buttons for current exercise */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => toggleExerciseCheck(activeStep)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                    completedExercises[activeStep]
                      ? 'bg-zinc-800 text-lime-400 border border-lime-400/40'
                      : 'bg-lime-400 text-black hover:bg-lime-300 shadow-lg shadow-lime-400/20 active:scale-95'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>
                    {completedExercises[activeStep]
                      ? (language === 'hi' ? 'सेट पूरा हुआ ✓' : 'Completed ✓')
                      : (language === 'hi' ? 'सेट पूर्ण चिह्नित करें' : 'Mark Exercise Done')}
                  </span>
                </button>

                <button
                  onClick={() => handleStartRest(currentExercise.restSec || 45)}
                  className="px-3 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs"
                  title="Rest Timer"
                >
                  <Flame className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

            {/* Checklist of all exercises in routine */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {language === 'hi' ? 'व्यायाम सूची' : 'Workout Checklist'} ({completedCount}/{workout.exercises.length})
              </div>
              <div className="space-y-1.5">
                {workout.exercises.map((ex, idx) => {
                  const isDone = !!completedExercises[idx];
                  const isCurrent = idx === activeStep;

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-lime-500/10 border-lime-400/50 text-white'
                          : 'bg-black/20 border-white/5 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExerciseCheck(idx);
                          }}
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isDone
                              ? 'bg-lime-400 border-lime-400 text-black'
                              : 'border-white/30 hover:border-lime-400'
                          }`}
                        >
                          {isDone && <CheckCircle className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <div>
                          <div className={`text-xs font-semibold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                            {language === 'hi' ? ex.nameHi : ex.nameEn}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {ex.sets} sets × {ex.reps}
                          </div>
                        </div>
                      </div>

                      <ChevronRight className={`w-4 h-4 ${isCurrent ? 'text-lime-400' : 'text-slate-600'}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Safety reminder */}
            <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 flex items-start gap-2 text-slate-400 text-[11px]">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {language === 'hi'
                  ? 'दर्द या चक्कर महसूस होने पर तुरंत रुकें। उचित पानी पिएं और धीरे-धीरे प्रगति करें।'
                  : 'Stop immediately if you feel acute pain or dizziness. Stay hydrated and prioritize good form.'}
              </span>
            </div>
          </div>
        ) : (
          /* Finished Screen: Summary and Log Form */
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-lime-400/20 border border-lime-400/40 flex items-center justify-center text-lime-400">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white">
                {language === 'hi' ? 'शानदार काम, एथलीट!' : 'Outstanding Effort!'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'hi'
                  ? 'आपने आज का प्रशिक्षण सत्र सफलतापूर्वक पूरा किया।'
                  : 'You crushed this JFZ training session.'}
              </p>
            </div>

            {/* Stats Summary Pill */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/10 text-left">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  {language === 'hi' ? 'कुल समय' : 'Total Duration'}
                </div>
                <div className="text-lg font-black text-lime-400">{formatTime(elapsedSeconds)}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">
                  {language === 'hi' ? 'पूरे किए गए व्यायाम' : 'Exercises Done'}
                </div>
                <div className="text-lg font-black text-white">
                  {completedCount} / {workout.exercises.length}
                </div>
              </div>
            </div>

            {/* Optional Workout Inputs (Running distance/time if running category or hybrid) */}
            <div className="space-y-3 text-left">
              <label className="text-xs font-bold text-slate-300 block">
                {language === 'hi' ? 'रनिंग दूरी व समय (वैकल्पिक)' : 'Running Distance & Time (Optional)'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Distance (km) e.g. 3.5"
                  value={runningDistanceKm}
                  onChange={(e) => setRunningDistanceKm(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Run time (mins)"
                  value={runningTimeMinutes}
                  onChange={(e) => setRunningTimeMinutes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>

              <label className="text-xs font-bold text-slate-300 block">
                {language === 'hi' ? 'ट्रेनिंग नोट्स व अनुभव' : 'Workout Notes / Felt (RPE)'}
              </label>
              <textarea
                rows={2}
                placeholder={language === 'hi' ? 'आज का फॉर्म कैसा रहा? कोई नया व्यक्तिगत रिकॉर्ड?' : 'How did the reps feel? Any personal milestones?'}
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>

            {!currentUser && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                {t('signInRequired')}
              </div>
            )}
          </div>
        )}

        {/* Bottom Action Footer */}
        <div className="p-4 border-t border-white/10 bg-black/50">
          {!isFinished ? (
            <button
              onClick={handleFinishPrompt}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-extrabold text-sm tracking-wide shadow-lg shadow-lime-400/20 active:scale-95 transition-all"
            >
              {language === 'hi' ? 'वर्कआउट समाप्त करें (Finish)' : 'Finish Workout'}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFinished(false)}
                className="px-4 py-3 rounded-xl bg-white/10 text-slate-300 font-bold text-xs hover:bg-white/15"
              >
                {t('back')}
              </button>
              <button
                onClick={handleSaveWorkoutLog}
                disabled={isSaving || saveSuccess}
                className="flex-1 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-sm active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20 disabled:opacity-60"
              >
                {saveSuccess ? (
                  <span>✓ {language === 'hi' ? 'प्रगति सहेजी गई!' : 'Saved to Progress!'}</span>
                ) : isSaving ? (
                  <span>{t('loading')}</span>
                ) : (
                  <span>{currentUser ? (language === 'hi' ? 'प्रगति सहेजें' : 'Save to My Progress') : t('signIn')}</span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
