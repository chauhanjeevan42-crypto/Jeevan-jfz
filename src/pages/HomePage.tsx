import React from 'react';
import { 
  Play, 
  Flame, 
  Dumbbell, 
  Swords, 
  Zap, 
  Activity, 
  Calendar, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  ShieldAlert,
  ChevronRight,
  Award,
  Video
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { WorkoutSession, VideoLessonItem, TrainingProgramPlan } from '../types';
import { OFFICIAL_LOGO_URL } from '../data/seedData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onStartWorkout: (workout: WorkoutSession) => void;
  onOpenVideo: (video: VideoLessonItem) => void;
  onOpenPlan: (plan: TrainingProgramPlan) => void;
  onOpenAi: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onStartWorkout,
  onOpenVideo,
  onOpenPlan,
  onOpenAi,
}) => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();
  const { workouts, videos, trainingPlans, announcements, userWorkoutLogs } = useData();

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('greetingMorning');
    if (hour < 17) return t('greetingAfternoon');
    return t('greetingEvening');
  };

  const userName = currentUser?.displayName
    ? currentUser.displayName.split(' ')[0]
    : (currentUser?.email ? currentUser.email.split('@')[0] : t('athlete'));

  // Featured Workout of the day
  const todayWorkout = workouts[0] || null;

  // Real user weekly metrics
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekLogs = userWorkoutLogs.filter(
    (l) => new Date(l.completedAt) >= oneWeekAgo
  );
  const weeklyWorkoutCount = thisWeekLogs.length;
  const weeklyMinutes = thisWeekLogs.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const weeklyDistance = thisWeekLogs.reduce((acc, l) => acc + (l.runningDistanceKm || 0), 0);

  // Disciplines list
  const disciplines = [
    {
      id: 'hybrid',
      titleEn: 'Hybrid Training',
      titleHi: 'हाइब्रिड ट्रेनिंग',
      descEn: 'Running + Strength + Mobility',
      descHi: 'रनिंग + स्ट्रेंथ + मोबिलिटी',
      icon: Zap,
      color: 'from-lime-500/20 to-emerald-500/10 border-lime-500/30 text-lime-400',
      page: 'hybrid',
    },
    {
      id: 'silat',
      titleEn: 'Pencak Silat',
      titleHi: 'पेंचक सिलाट',
      descEn: 'Stances, Steps & Agility',
      descHi: 'कुदा-कुदा, स्टेप्स व गतिशीलता',
      icon: Swords,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      page: 'silat',
    },
    {
      id: 'judo',
      titleEn: 'Kodokan Judo',
      titleHi: 'कोडोकान जूडो',
      descEn: 'Ukemi Breakfalls & Balance',
      descHi: 'सुरक्षित गिरना व संतुलन',
      icon: Award,
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
      page: 'judo',
    },
    {
      id: 'fitness',
      titleEn: 'Functional Fitness',
      titleHi: 'कार्यात्मक फिटनेस',
      descEn: 'Core, Conditioning & Mobility',
      descHi: 'कोर, कंडीशनिंग व गति',
      icon: Dumbbell,
      color: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
      page: 'fitness',
    },
  ];

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#161D2B] via-[#0F1420] to-[#0A0D14] border border-lime-500/30 p-5 sm:p-6 shadow-2xl">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{getGreeting()}, {userName}!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {t('welcomeBannerTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t('welcomeBannerDesc')}
            </p>
          </div>

          {/* Emblem preview */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-lime-400/60 shadow-lg shadow-lime-400/20 shrink-0 bg-black">
            <img src={OFFICIAL_LOGO_URL} alt="JFZ Emblem" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* 3 Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
          <button
            onClick={() => onNavigate('training')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 transition-all shadow-lg shadow-lime-400/25"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>{t('btnStartTraining')}</span>
          </button>
          <button
            onClick={() => onNavigate('videos')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs active:scale-95 transition-all"
          >
            <Video className="w-4 h-4 text-lime-400" />
            <span>{t('btnExploreVideos')}</span>
          </button>
          <button
            onClick={() => onNavigate('progress')}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs active:scale-95 transition-all"
          >
            <TrendingUp className="w-4 h-4 text-lime-400" />
            <span>{t('btnViewProgress')}</span>
          </button>
        </div>
      </div>

      {/* Today's Workout Card */}
      {todayWorkout && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#141926] to-[#0E121B] border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-lime-400">
                {t('todaysWorkout')}
              </span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-medium capitalize">
              {todayWorkout.level} • {todayWorkout.estimatedMinutes} mins
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white leading-tight">
                {language === 'hi' ? todayWorkout.titleHi : todayWorkout.titleEn}
              </h2>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {language === 'hi' ? todayWorkout.descriptionHi : todayWorkout.descriptionEn}
              </p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-lime-400" />
                <span>{todayWorkout.exercises.length} {language === 'hi' ? 'व्यायाम' : 'exercises'}</span>
                <span>•</span>
                <span>{language === 'hi' ? 'दौड़ + शक्ति' : 'Speed & Strength'}</span>
              </div>
            </div>

            <button
              onClick={() => onStartWorkout(todayWorkout)}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-black font-extrabold text-xs tracking-wide shrink-0 active:scale-95 transition-all shadow-lg shadow-lime-400/20"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>{t('startWorkout')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Weekly Activity Summary (Real Data & Clean Empty State) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#0F1420] border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-lime-400" />
            <span>{t('weeklyActivitySummary')}</span>
          </h3>
          <button
            onClick={() => onNavigate('progress')}
            className="text-[11px] font-bold text-lime-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'पूरा इतिहास देखें' : 'View Full Logs'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {weeklyWorkoutCount === 0 ? (
          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 text-center space-y-1.5">
            <p className="text-xs font-bold text-slate-300">{t('emptyProgressTitle')}</p>
            <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
              {t('emptyProgressDesc')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{t('totalWorkouts')}</div>
              <div className="text-xl font-black text-lime-400 mt-0.5">{weeklyWorkoutCount}</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{t('trainingMinutes')}</div>
              <div className="text-xl font-black text-white mt-0.5">{weeklyMinutes}m</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-[10px] uppercase font-semibold text-slate-400">{t('runningDistance')}</div>
              <div className="text-xl font-black text-cyan-400 mt-0.5">{weeklyDistance.toFixed(1)} km</div>
            </div>
          </div>
        )}
      </div>

      {/* Training Disciplines Visual Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white">
            {t('featuredCategories')}
          </h3>
          <span className="text-[11px] text-slate-400">JFZ Core Disciplines</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {disciplines.map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => onNavigate(d.page)}
                className={`p-3.5 rounded-2xl bg-gradient-to-br ${d.color} border flex flex-col items-start text-left hover:scale-[1.02] active:scale-95 transition-all group`}
              >
                <div className="p-2 rounded-xl bg-black/40 mb-2 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-extrabold text-xs text-white">
                  {language === 'hi' ? d.titleHi : d.titleEn}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  {language === 'hi' ? d.descHi : d.descEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Video Lessons */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Video className="w-4 h-4 text-lime-400" />
            <span>{t('featuredVideosTitle')}</span>
          </h3>
          <button
            onClick={() => onNavigate('videos')}
            className="text-[11px] font-bold text-lime-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी वीडियो देखें' : 'View All'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {videos.slice(0, 2).map((vid) => (
            <div
              key={vid.id}
              onClick={() => onOpenVideo(vid)}
              className="cursor-pointer group rounded-2xl overflow-hidden bg-[#121620] border border-white/10 hover:border-lime-400/40 transition-all flex flex-col"
            >
              <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                <img
                  src={vid.videoThumbnail}
                  alt={vid.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-lime-400/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                  {vid.duration}
                </span>
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400">
                  {vid.category}
                </span>
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-lime-300 transition-colors">
                  {language === 'hi' ? vid.titleHi : vid.titleEn}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {language === 'hi' ? vid.descriptionHi : vid.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Training Programs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-lime-400" />
            <span>{t('recommendedPlansTitle')}</span>
          </h3>
          <button
            onClick={() => onNavigate('plans')}
            className="text-[11px] font-bold text-lime-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी प्रोग्राम्स' : 'See Programs'}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {trainingPlans.slice(0, 2).map((plan) => (
            <div
              key={plan.id}
              onClick={() => onOpenPlan(plan)}
              className="p-4 rounded-2xl bg-[#121620] border border-white/10 hover:border-lime-400/40 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
                  {plan.totalWeeks} Weeks • {plan.level}
                </span>
                <span className="text-[10px] text-slate-400">Sample Guide</span>
              </div>
              <h4 className="text-sm font-extrabold text-white group-hover:text-lime-300 transition-colors">
                {language === 'hi' ? plan.titleHi : plan.titleEn}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2">
                {language === 'hi' ? plan.descriptionHi : plan.descriptionEn}
              </p>
              <div className="pt-1 flex items-center text-xs font-bold text-lime-400 group-hover:translate-x-1 transition-transform">
                <span>{language === 'hi' ? 'शेड्यूल देखें' : 'View Curriculum'}</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements by Jeevan Chauhan */}
      {announcements.length > 0 && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#0F131C] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              <span>{t('announcementsTitle')}</span>
            </h3>
            <span className="text-[10px] text-lime-400 font-bold">Coach Updates</span>
          </div>

          <div className="space-y-2">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">
                    {language === 'hi' ? ann.titleHi : ann.titleEn}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'hi' ? ann.contentHi : ann.contentEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <div className="font-extrabold text-amber-300">{t('safetyNoticeTitle')}</div>
          <p className="text-amber-200/80 mt-1 leading-relaxed">
            {t('safetyNoticeText')}
          </p>
        </div>
      </div>
    </div>
  );
};
