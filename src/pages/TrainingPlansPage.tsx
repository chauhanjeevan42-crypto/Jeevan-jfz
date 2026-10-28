import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle, 
  ChevronRight, 
  Award, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { TrainingProgramPlan } from '../types';

interface TrainingPlansPageProps {
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
}

export const TrainingPlansPage: React.FC<TrainingPlansPageProps> = ({ onOpenAuth, onNavigate }) => {
  const { language, t } = useLanguage();
  const { trainingPlans } = useData();
  const { currentUser } = useAuth();

  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(trainingPlans[0]?.id || null);
  const [enrolledPlanIds, setEnrolledPlanIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('jfz_enrolled_plans');
    return saved ? JSON.parse(saved) : ['plan-1'];
  });
  const [completedDays, setCompletedDays] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('jfz_completed_plan_days');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleEnroll = (planId: string) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const next = enrolledPlanIds.includes(planId)
      ? enrolledPlanIds.filter((id) => id !== planId)
      : [...enrolledPlanIds, planId];
    setEnrolledPlanIds(next);
    localStorage.setItem('jfz_enrolled_plans', JSON.stringify(next));
  };

  const toggleDayComplete = (planId: string, week: number, day: number) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const key = `${planId}-w${week}-d${day}`;
    const next = { ...completedDays, [key]: !completedDays[key] };
    setCompletedDays(next);
    localStorage.setItem('jfz_completed_plan_days', JSON.stringify(next));
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171D2B] via-[#0F1420] to-[#0A0D14] border border-lime-500/30 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-bold w-fit uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          <span>JFZ STRUCTURED PROGRAMS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'ट्रेनिंग प्रोग्राम्स व कोर्सेज' : 'Structured Training Programs'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
          {language === 'hi'
            ? 'शुरुआती फिटनेस से लेकर हाइब्रिड एथलीट और मार्शल आर्ट्स (सिलाट व जूडो) के चरणबद्ध 4-सप्ताह के पाठ्यक्रम।'
            : 'Multi-week periodized blueprints designed to build progressive aerobic capacity, strength, and combat discipline.'}
        </p>
      </div>

      {/* Program List */}
      <div className="space-y-4">
        {trainingPlans.map((plan) => {
          const isExpanded = expandedPlanId === plan.id;
          const isEnrolled = enrolledPlanIds.includes(plan.id);

          // Calculate plan completion rate
          let totalDays = 0;
          let doneDays = 0;
          plan.schedule.forEach((w) => {
            w.days.forEach((d) => {
              if (!d.restDay) {
                totalDays++;
                const key = `${plan.id}-w${w.week}-d${d.day}`;
                if (completedDays[key]) doneDays++;
              }
            });
          });

          const percent = totalDays > 0 ? Math.round((doneDays / totalDays) * 100) : 0;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl bg-[#121620] border transition-all overflow-hidden ${
                isEnrolled ? 'border-lime-500/40 shadow-xl shadow-lime-400/5' : 'border-white/10'
              }`}
            >
              {/* Program Card Header */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-lime-400/10 text-lime-400 border border-lime-400/20">
                      {plan.totalWeeks} Weeks • {plan.level}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      {plan.category}
                    </span>
                  </div>
                  {plan.isSample && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-slate-400">
                      Sample Blueprint
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {language === 'hi' ? plan.titleHi : plan.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl">
                      {language === 'hi' ? plan.descriptionHi : plan.descriptionEn}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleEnroll(plan.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                        isEnrolled
                          ? 'bg-lime-400/15 text-lime-400 border border-lime-400/30'
                          : 'bg-lime-400 hover:bg-lime-300 text-black shadow-md shadow-lime-400/20'
                      }`}
                    >
                      {isEnrolled ? (language === 'hi' ? 'नामांकित ✓' : 'Enrolled ✓') : (language === 'hi' ? 'प्रोग्राम में शामिल हों' : 'Enroll in Plan')}
                    </button>
                    <button
                      onClick={() => setExpandedPlanId(isExpanded ? null : plan.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Progress bar if enrolled */}
                {isEnrolled && (
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-400 font-medium">
                        {language === 'hi' ? 'प्रगति:' : 'Curriculum Progress:'} {doneDays}/{totalDays} {language === 'hi' ? 'सत्र पूर्ण' : 'days done'}
                      </span>
                      <span className="text-lime-400 font-extrabold">{percent}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-lime-400 h-1.5 rounded-full transition-all duration-300 shadow-[0_0_8px_#a3e635]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Collapsible Curriculum Breakdown */}
              {isExpanded && (
                <div className="border-t border-white/10 bg-black/40 p-5 space-y-4 animate-fadeIn">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'hi' ? 'साप्ताहिक पाठ्यक्रम अनुसूची' : 'Weekly Schedule Breakdown'}
                  </div>

                  <div className="space-y-4">
                    {plan.schedule.map((week) => (
                      <div key={week.week} className="p-4 rounded-2xl bg-[#141A26] border border-white/5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-lime-400 uppercase">
                            Week {week.week}: {language === 'hi' ? week.focusHi : week.focusEn}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {week.days.map((day) => {
                            const isDone = completedDays[`${plan.id}-w${week.week}-d${day.day}`];

                            return (
                              <div
                                key={day.day}
                                onClick={() => !day.restDay && toggleDayComplete(plan.id, week.week, day.day)}
                                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                                  day.restDay
                                    ? 'bg-zinc-900/40 border-white/5 text-slate-500 cursor-default'
                                    : isDone
                                    ? 'bg-lime-500/10 border-lime-400/40 text-white'
                                    : 'bg-black/30 border-white/5 hover:border-white/20 text-slate-300'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  {!day.restDay && (
                                    <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                                      isDone ? 'bg-lime-400 border-lime-400 text-black' : 'border-white/30'
                                    }`}>
                                      {isDone && <CheckCircle className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                  )}
                                  <div>
                                    <div className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : ''}`}>
                                      Day {day.day}: {language === 'hi' ? day.titleHi : day.titleEn}
                                    </div>
                                    <div className="text-[10px] text-slate-400">
                                      {day.restDay ? (language === 'hi' ? 'विश्राम दिवस' : 'Full Rest') : `${day.durationMinutes} mins training`}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
