import React, { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  Calendar, 
  Activity, 
  Trophy, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { WorkoutLogEntry } from '../types';

interface ProgressPageProps {
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({ onOpenAuth, onNavigate }) => {
  const { language, t } = useLanguage();
  const { userWorkoutLogs, logWorkout, deleteWorkoutLog, updateWorkoutLog, userLessonProgress } = useData();
  const { currentUser } = useAuth();

  // Form states for manual record entry
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('hybrid');
  const [formDuration, setFormDuration] = useState('30');
  const [formDistance, setFormDistance] = useState('');
  const [formRunTime, setFormRunTime] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formPR, setFormPR] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stats calculation
  const totalCompletedWorkouts = userWorkoutLogs.length;
  const totalMinutes = userWorkoutLogs.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const totalDistanceKm = userWorkoutLogs.reduce((acc, l) => acc + (l.runningDistanceKm || 0), 0);
  
  // Watched video count
  const watchedVideosCount = Object.values(userLessonProgress).filter((p) => p.isCompleted).length;

  // Weekly frequency (last 7 days)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const weeklyLogs = userWorkoutLogs.filter((l) => new Date(l.completedAt) >= oneWeekAgo);
  const weeklyFrequency = weeklyLogs.length;

  const handleOpenAddModal = () => {
    setEditingLogId(null);
    setFormTitle('');
    setFormCategory('hybrid');
    setFormDuration('30');
    setFormDistance('');
    setFormRunTime('');
    setFormNotes('');
    setFormPR('');
    setIsLogModalOpen(true);
  };

  const handleOpenEditModal = (log: WorkoutLogEntry) => {
    setEditingLogId(log.id);
    setFormTitle(log.workoutTitle);
    setFormCategory(log.category);
    setFormDuration(log.durationMinutes.toString());
    setFormDistance(log.runningDistanceKm ? log.runningDistanceKm.toString() : '');
    setFormRunTime(log.runningTimeMinutes ? log.runningTimeMinutes.toString() : '');
    setFormNotes(log.notes || '');
    setFormPR(log.personalRecords || '');
    setIsLogModalOpen(true);
  };

  const handleSubmitLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!formTitle.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingLogId) {
        await updateWorkoutLog(editingLogId, {
          workoutTitle: formTitle.trim(),
          category: formCategory,
          durationMinutes: parseInt(formDuration, 10) || 0,
          runningDistanceKm: formDistance ? parseFloat(formDistance) : undefined,
          runningTimeMinutes: formRunTime ? parseFloat(formRunTime) : undefined,
          notes: formNotes.trim(),
          personalRecords: formPR.trim(),
        });
      } else {
        await logWorkout({
          workoutTitle: formTitle.trim(),
          category: formCategory,
          durationMinutes: parseInt(formDuration, 10) || 0,
          runningDistanceKm: formDistance ? parseFloat(formDistance) : undefined,
          runningTimeMinutes: formRunTime ? parseFloat(formRunTime) : undefined,
          notes: formNotes.trim(),
          personalRecords: formPR.trim(),
          completedAt: new Date().toISOString(),
        });
      }
      setIsLogModalOpen(false);
    } catch (err) {
      console.error('Error saving workout log:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLog = async (id: string) => {
    if (window.confirm(language === 'hi' ? 'क्या आप इस रिकॉर्ड को हटाना चाहते हैं?' : 'Delete this workout log?')) {
      await deleteWorkoutLog(id);
    }
  };

  // 7-day visual chart points
  const daysOfWeek = [
    { label: 'Mon', count: 0 },
    { label: 'Tue', count: 0 },
    { label: 'Wed', count: 0 },
    { label: 'Thu', count: 0 },
    { label: 'Fri', count: 0 },
    { label: 'Sat', count: 0 },
    { label: 'Sun', count: 0 },
  ];

  weeklyLogs.forEach((l) => {
    const d = new Date(l.completedAt).getDay(); // 0 is Sunday
    const index = d === 0 ? 6 : d - 1;
    if (daysOfWeek[index]) {
      daysOfWeek[index].count += 1;
    }
  });

  const maxWeeklyCount = Math.max(1, ...daysOfWeek.map((d) => d.count));

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171E2D] via-[#101522] to-[#0A0D14] border border-lime-500/30 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-bold uppercase">
            {language === 'hi' ? 'व्यक्तिगत प्रगति ट्रैकर' : 'REAL PERFORMANCE TRACKER'}
          </span>
          <button
            onClick={currentUser ? handleOpenAddModal : onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-400 text-black font-extrabold text-xs hover:bg-lime-300 active:scale-95 transition-all shadow-md shadow-lime-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addRecord')}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'मेरी एथलेटिक प्रगति' : 'Personal Training Progress'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          {language === 'hi'
            ? 'यहाँ आपका वास्तविक प्रशिक्षण इतिहास, रनिंग किलोमीटर, व्यक्तिगत रिकॉर्ड्स और पूरे किए गए पाठ दर्ज होते हैं।'
            : 'Track your real training history, completed sessions, running distance, personal records, and video lessons.'}
        </p>
      </div>

      {/* Guest Notice if not signed in */}
      {!currentUser && (
        <div className="p-4 rounded-3xl bg-[#121620] border border-amber-500/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-200">
              {t('signInRequired')}
            </p>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-xl bg-lime-400 text-black font-extrabold text-xs hover:bg-lime-300 shrink-0"
          >
            {t('signIn')}
          </button>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('totalWorkouts')}</div>
          <div className="text-2xl font-black text-lime-400 mt-1">{totalCompletedWorkouts}</div>
          <div className="text-[9px] text-slate-500 mt-0.5">{language === 'hi' ? 'सत्र दर्ज' : 'Logged Sessions'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">{language === 'hi' ? 'साप्ताहिक आवृत्ति' : 'Weekly Frequency'}</div>
          <div className="text-2xl font-black text-white mt-1">{weeklyFrequency}</div>
          <div className="text-[9px] text-slate-500 mt-0.5">{language === 'hi' ? 'पिछले 7 दिन' : 'Last 7 Days'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('trainingMinutes')}</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">{totalMinutes}m</div>
          <div className="text-[9px] text-slate-500 mt-0.5">{language === 'hi' ? 'सक्रिय समय' : 'Total Active'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
          <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('runningDistance')}</div>
          <div className="text-2xl font-black text-amber-400 mt-1">{totalDistanceKm.toFixed(1)}</div>
          <div className="text-[9px] text-slate-500 mt-0.5">{language === 'hi' ? 'कुल दूरी' : 'Total Km Run'}</div>
        </div>
      </div>

      {/* Weekly Activity SVG Chart */}
      <div className="p-5 rounded-3xl bg-[#121620] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-lime-400" />
            <span>{language === 'hi' ? 'साप्ताहिक वर्कआउट चार्ट' : 'Weekly Activity Frequency'}</span>
          </h3>
          <span className="text-xs text-slate-400">
            {weeklyFrequency} {language === 'hi' ? 'वर्कआउट्स इस सप्ताह' : 'workouts this week'}
          </span>
        </div>

        {/* Bar chart representation */}
        <div className="pt-4 pb-2 flex items-end justify-between gap-2 h-36 px-2">
          {daysOfWeek.map((day, idx) => {
            const heightPercent = day.count > 0 ? Math.round((day.count / maxWeeklyCount) * 100) : 8;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="text-[10px] font-mono text-slate-400">{day.count > 0 ? day.count : ''}</div>
                <div
                  className={`w-full max-w-[32px] rounded-t-xl transition-all duration-500 ${
                    day.count > 0
                      ? 'bg-gradient-to-t from-lime-500 to-lime-300 shadow-[0_0_12px_#a3e635]'
                      : 'bg-white/5 border border-white/5'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase">{day.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workout Logs List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-lime-400" />
            <span>{language === 'hi' ? 'वर्कआउट इतिहास एवं व्यक्तिगत रिकॉर्ड्स' : 'Workout History & Personal Records'}</span>
          </h3>
          <button
            onClick={currentUser ? handleOpenAddModal : onOpenAuth}
            className="text-xs font-bold text-lime-400 hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'नया लॉग जोड़ें' : 'Log Workout'}</span>
          </button>
        </div>

        {totalCompletedWorkouts === 0 ? (
          <div className="p-8 rounded-3xl bg-[#121620] border border-white/10 text-center space-y-2">
            <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">{t('emptyProgressTitle')}</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {t('emptyProgressDesc')}
            </p>
            <button
              onClick={() => onNavigate('training')}
              className="mt-3 px-4 py-2 rounded-xl bg-lime-400 text-black font-extrabold text-xs hover:bg-lime-300 shadow-md shadow-lime-400/20"
            >
              {t('btnStartTraining')}
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {userWorkoutLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-[#121620] border border-white/10 hover:border-lime-400/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
                      {log.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {new Date(log.completedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-white">
                    {log.workoutTitle}
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-lime-400" />
                      <span>{log.durationMinutes} mins</span>
                    </span>

                    {log.runningDistanceKm ? (
                      <span>• {log.runningDistanceKm} km {log.runningTimeMinutes ? `(${log.runningTimeMinutes}m)` : ''}</span>
                    ) : null}

                    {log.personalRecords && (
                      <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 font-bold text-[10px] border border-amber-400/20 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>PR: {log.personalRecords}</span>
                      </span>
                    )}
                  </div>

                  {log.notes && (
                    <p className="text-xs text-slate-400 italic pt-1">
                      "{log.notes}"
                    </p>
                  )}
                </div>

                {/* Edit & Delete Controls */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenEditModal(log)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    title={t('edit')}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                    title={t('delete')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Record Entry / Edit Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121620] border border-white/10 rounded-3xl w-full max-w-md p-5 sm:p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-white">
                {editingLogId
                  ? (language === 'hi' ? 'रिकॉर्ड संपादित करें' : 'Edit Workout Log')
                  : (language === 'hi' ? 'नया वर्कआउट रिकॉर्ड जोड़ें' : 'Log Workout Session')}
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitLog} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  {language === 'hi' ? 'वर्कआउट का नाम' : 'Workout Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5K Run + Kettlebell Circuit"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {language === 'hi' ? 'श्रेणी' : 'Category'}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                  >
                    <option value="hybrid">Hybrid Training</option>
                    <option value="running">Running / Endurance</option>
                    <option value="fitness">Fitness Strength</option>
                    <option value="silat">Pencak Silat</option>
                    <option value="judo">Kodokan Judo</option>
                    <option value="mobility">Mobility</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {language === 'hi' ? 'अवधि (मिनट)' : 'Duration (mins)'}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {language === 'hi' ? 'रनिंग दूरी (किमी)' : 'Running Distance (km)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 4.2"
                    value={formDistance}
                    onChange={(e) => setFormDistance(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    {language === 'hi' ? 'व्यक्तिगत रिकॉर्ड (PR)' : 'Personal Record (PR)'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5K in 22:30 or 50 Pushups"
                    value={formPR}
                    onChange={(e) => setFormPR(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  {language === 'hi' ? 'ट्रेनिंग नोट्स' : 'Workout Notes'}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === 'hi' ? 'आज का सत्र कैसा रहा?' : 'How did the reps and stamina feel?'}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 font-bold text-xs hover:bg-white/15"
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 transition-all shadow-md shadow-lime-400/20 disabled:opacity-60"
                >
                  {isSubmitting ? t('loading') : t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
