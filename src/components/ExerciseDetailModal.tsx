import React from 'react';
import { 
  X, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  Repeat, 
  Flame, 
  ExternalLink,
  Target
} from 'lucide-react';
import { ExerciseItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ExerciseDetailModalProps {
  exercise: ExerciseItem | null;
  onClose: () => void;
  onStartSingleExerciseWorkout?: (exercise: ExerciseItem) => void;
}

export const ExerciseDetailModal: React.FC<ExerciseDetailModalProps> = ({
  exercise,
  onClose,
  onStartSingleExerciseWorkout,
}) => {
  const { language, t } = useLanguage();

  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#121620] border border-white/10 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-zinc-900 shrink-0">
          <img
            src={exercise.imageUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'}
            alt={exercise.nameEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-transparent to-black/60" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-lime-400 text-black shadow-sm">
              {exercise.category} • {exercise.difficulty}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1 leading-tight">
              {language === 'hi' ? exercise.nameHi : exercise.nameEn}
            </h2>
          </div>
        </div>

        {/* Scrollable Details */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Target muscles & stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('sets')}</div>
              <div className="text-base font-extrabold text-lime-400">{exercise.sets || 3}</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('reps')}</div>
              <div className="text-base font-extrabold text-white">{exercise.reps || '10-12'}</div>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">{t('rest')}</div>
              <div className="text-base font-extrabold text-amber-400">{exercise.restSec || 45}s</div>
            </div>
          </div>

          {/* Muscle groups */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-2.5">
            <Target className="w-4 h-4 text-lime-400 shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400 font-semibold">{t('muscleTargeted')}: </span>
              <span className="text-white font-medium">{exercise.muscleGroups}</span>
            </div>
          </div>

          {/* Overview Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              {language === 'hi' ? 'विवरण' : 'Overview'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi' ? exercise.descriptionHi : exercise.descriptionEn}
            </p>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'अभ्यास के चरण (Instructions)' : 'Execution Instructions'}</span>
            </h4>
            <div className="space-y-1.5">
              {(language === 'hi' ? exercise.instructionsHi : exercise.instructionsEn).map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span className="w-5 h-5 rounded-full bg-lime-400/20 text-lime-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div>
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t('commonMistakes')}</span>
            </h4>
            <div className="space-y-1">
              {(language === 'hi' ? exercise.mistakesHi : exercise.mistakesEn).map((mistake, idx) => (
                <div key={idx} className="text-xs text-amber-200/90 flex items-start gap-2 bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                  <span className="text-amber-400">•</span>
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Notes */}
          <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold text-red-300">{t('safetyNotes')}</div>
              <p className="text-red-200/80 mt-0.5 leading-relaxed">
                {language === 'hi' ? exercise.safetyNotesHi : exercise.safetyNotesEn}
              </p>
            </div>
          </div>

          {/* Video demonstration link */}
          {exercise.videoUrl && (
            <a
              href={exercise.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>{language === 'hi' ? 'यूट्यूब पर वीडियो डेमो देखें' : 'Watch Video Demo on YouTube'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-lime-400" />
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/50 flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-bold text-xs"
          >
            {t('close')}
          </button>
          {onStartSingleExerciseWorkout && (
            <button
              onClick={() => {
                onClose();
                onStartSingleExerciseWorkout(exercise);
              }}
              className="flex-1 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 shadow-lg shadow-lime-400/20 transition-all"
            >
              {language === 'hi' ? 'यह व्यायाम शुरू करें' : 'Practice Exercise'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
