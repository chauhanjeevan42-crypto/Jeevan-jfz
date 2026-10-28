import React, { useState } from 'react';
import { 
  Dumbbell, 
  Target, 
  Layers, 
  Play, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  Search, 
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ExerciseItem, WorkoutSession } from '../types';

interface FitnessPageProps {
  onSelectExercise: (exercise: ExerciseItem) => void;
  onStartCustomWorkout: (workout: WorkoutSession) => void;
}

export const FitnessPage: React.FC<FitnessPageProps> = ({
  onSelectExercise,
  onStartCustomWorkout,
}) => {
  const { language, t } = useLanguage();
  const { exercises } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Custom Workout Builder state
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

  const categories = [
    { id: 'all', labelEn: 'All Workouts', labelHi: 'सभी वर्कआउट्स' },
    { id: 'strength', labelEn: 'Strength & Conditioning', labelHi: 'स्ट्रेंथ व कंडीशनिंग' },
    { id: 'bodyweight', labelEn: 'Bodyweight & Calisthenics', labelHi: 'बॉडीवेट कैलिस्थेनिक्स' },
    { id: 'core', labelEn: 'Core Stability', labelHi: 'कोर स्टेबिलिटी' },
    { id: 'mobility', labelEn: 'Flexibility & Mobility', labelHi: 'फ्लेक्सिबिलिटी व मोबिलिटी' },
    { id: 'running', labelEn: 'Warm-up & Endurance', labelHi: 'वार्मअप व सहनशक्ति' },
  ];

  const filteredExercises = exercises.filter((ex) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      ex.category === selectedCategory ||
      (selectedCategory === 'core' && ex.muscleGroups.toLowerCase().includes('core'));

    const matchesDifficulty =
      selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;

    const matchesSearch =
      ex.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.nameHi.includes(searchQuery) ||
      ex.muscleGroups.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const toggleSelectExerciseForCustom = (id: string) => {
    setSelectedExerciseIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLaunchCustomRoutine = () => {
    if (selectedExerciseIds.length === 0) return;

    const selectedList = exercises.filter((ex) => selectedExerciseIds.includes(ex.id));
    const customWorkout: WorkoutSession = {
      id: `custom-${Date.now()}`,
      titleEn: customTitle.trim() || 'My Custom Workout Routine',
      titleHi: customTitle.trim() || 'मेरा कस्टम वर्कआउट रूटीन',
      descriptionEn: 'Custom personalized training circuit selected by athlete.',
      descriptionHi: 'एथलीट द्वारा चुना गया व्यक्तिगत प्रशिक्षण सर्किट।',
      category: 'fitness',
      level: 'intermediate',
      estimatedMinutes: selectedList.length * 6,
      exercises: selectedList.map((ex) => ({
        exerciseId: ex.id,
        nameEn: ex.nameEn,
        nameHi: ex.nameHi,
        sets: ex.sets || 3,
        reps: ex.reps || '10-12',
        restSec: ex.restSec || 45,
        durationSec: ex.durationSec,
      })),
      isSample: false,
      isPublished: false,
    };

    setIsBuilderOpen(false);
    onStartCustomWorkout(customWorkout);
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171D2B] via-[#101520] to-[#0A0D14] border border-lime-500/30 shadow-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-bold uppercase">
            FITNESS & CONDITIONING
          </span>
          <button
            onClick={() => setIsBuilderOpen(!isBuilderOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-400 text-black font-extrabold text-xs hover:bg-lime-300 active:scale-95 transition-all shadow-md shadow-lime-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'hi' ? 'कस्टम रूटीन बनाएं' : 'Build Custom Session'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {t('fitnessTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          {t('fitnessSubtitle')}
        </p>

        {/* Search Input */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === c.id
                ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                : 'bg-[#121620] hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            {language === 'hi' ? c.labelHi : c.labelEn}
          </button>
        ))}
      </div>

      {/* Custom Workout Builder Modal / Dropdown */}
      {isBuilderOpen && (
        <div className="p-4 sm:p-5 rounded-3xl bg-[#141B28] border-2 border-lime-400/40 shadow-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <h3 className="text-sm font-extrabold text-white">
                {language === 'hi' ? 'पर्सनल वर्कआउट बिल्डर' : 'Personal Workout Builder'}
              </h3>
            </div>
            <span className="text-xs font-bold text-lime-400">
              {selectedExerciseIds.length} {language === 'hi' ? 'व्यायाम चुने गए' : 'selected'}
            </span>
          </div>

          <p className="text-xs text-slate-300">
            {language === 'hi'
              ? 'नीचे दी गई सूची में से व्यायाम चुनें और अपना खुद का ट्रेनिंग सर्किट तुरंत शुरू करें।'
              : 'Tap exercises below to add them to your personalized training session.'}
          </p>

          <input
            type="text"
            placeholder={language === 'hi' ? 'रूटीन का नाम (उदा. सुबह का कोर व स्ट्रेच)' : 'Routine name (e.g. Morning Core & Mobility)'}
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
          />

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setIsBuilderOpen(false)}
              className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 font-bold text-xs hover:bg-white/15"
            >
              {t('cancel')}
            </button>
            <button
              onClick={handleLaunchCustomRoutine}
              disabled={selectedExerciseIds.length === 0}
              className="flex-1 py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-lime-400/20"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{language === 'hi' ? 'यह रूटीन शुरू करें' : 'Launch Custom Routine'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Exercise Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{filteredExercises.length} {language === 'hi' ? 'व्यायाम उपलब्ध हैं' : 'exercises available'}</span>
          <span>Click card for detailed breakdown</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredExercises.map((ex) => {
            const isSelectedForCustom = selectedExerciseIds.includes(ex.id);

            return (
              <div
                key={ex.id}
                onClick={() => {
                  if (isBuilderOpen) {
                    toggleSelectExerciseForCustom(ex.id);
                  } else {
                    onSelectExercise(ex);
                  }
                }}
                className={`p-4 rounded-3xl bg-[#121620] border cursor-pointer transition-all flex flex-col justify-between group ${
                  isSelectedForCustom
                    ? 'border-lime-400 bg-lime-500/10'
                    : 'border-white/10 hover:border-lime-400/40'
                }`}
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 mb-3">
                    <img
                      src={ex.imageUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'}
                      alt={ex.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-black/80 text-lime-400 border border-white/10">
                        {ex.difficulty}
                      </span>
                    </div>

                    {isBuilderOpen && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 border border-white/30 flex items-center justify-center">
                        {isSelectedForCustom && <Check className="w-4 h-4 text-lime-400 stroke-[3]" />}
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm font-black text-white group-hover:text-lime-300 transition-colors leading-snug">
                    {language === 'hi' ? ex.nameHi : ex.nameEn}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {language === 'hi' ? ex.descriptionHi : ex.descriptionEn}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <div className="text-slate-400 truncate max-w-[150px]">
                    <span className="text-slate-500 font-semibold">{t('sets')}: </span>
                    <span className="text-white font-bold">{ex.sets || 3} × {ex.reps || '12'}</span>
                  </div>
                  <div className="text-lime-400 font-bold flex items-center gap-1">
                    <span>{language === 'hi' ? 'विवरण' : 'Guide'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
