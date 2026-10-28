import React, { useState } from 'react';
import { 
  Swords, 
  Award, 
  ShieldAlert, 
  Play, 
  CheckCircle, 
  BookOpen, 
  Flame, 
  Compass, 
  AlertTriangle,
  UserCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ExerciseItem, VideoLessonItem, WorkoutSession } from '../types';

interface MartialArtsPageProps {
  initialSubTab?: 'silat' | 'judo' | 'overview';
  onOpenVideo: (video: VideoLessonItem) => void;
  onSelectExercise: (exercise: ExerciseItem) => void;
  onStartWorkout: (workout: WorkoutSession) => void;
}

export const MartialArtsPage: React.FC<MartialArtsPageProps> = ({
  initialSubTab = 'overview',
  onOpenVideo,
  onSelectExercise,
  onStartWorkout,
}) => {
  const { language, t } = useLanguage();
  const { videos, exercises, workouts, announcements } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'silat' | 'judo'>(initialSubTab);

  const silatVideos = videos.filter((v) => v.category === 'silat');
  const judoVideos = videos.filter((v) => v.category === 'judo');

  const silatExercises = exercises.filter((ex) => ex.category === 'silat');
  const judoExercises = exercises.filter((ex) => ex.category === 'judo');

  const martialWorkouts = workouts.filter((w) => w.category === 'martial_arts');

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Academy Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1A1828] via-[#12111E] to-[#0A0A10] border border-amber-500/30 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-bold w-fit uppercase">
          <Swords className="w-3.5 h-3.5" />
          <span>JFZ COMBAT & MARTIAL ARTS ACADEMY</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {t('martialArtsTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
          {t('martialArtsSubtitle')}
        </p>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/10">
          {[
            { id: 'overview', label: language === 'hi' ? 'अकादमी ओवरव्यू' : 'Academy Hub', icon: Swords },
            { id: 'silat', label: language === 'hi' ? 'पेंचक सिलाट' : 'Pencak Silat', icon: Compass },
            { id: 'judo', label: language === 'hi' ? 'कोडोकान जूडो' : 'Kodokan Judo', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mandatory Safety & Certification Disclaimer */}
      <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wide">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{t('safetyNoticeTitle')}</span>
        </div>
        <p className="text-xs text-amber-100/90 leading-relaxed">
          {t('safetyNoticeText')}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-amber-300/80 pt-1 font-medium">
          <UserCheck className="w-3.5 h-3.5" />
          <span>
            {language === 'hi'
              ? 'अनुशासन, आदर और सुरक्षा मार्शल आर्ट्स की नींव हैं।'
              : 'Discipline, mutual respect, and practitioner safety form the pillars of our academy.'}
          </span>
        </div>
      </div>

      {/* Tab Content: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pencak Silat Card */}
            <div className="p-5 rounded-3xl bg-[#121620] border border-amber-500/20 hover:border-amber-400/50 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white">{t('silatTitle')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t('silatDesc')}</p>
              <div className="space-y-1 text-xs text-slate-400">
                <div>• {language === 'hi' ? '6 बुनियादी स्टांस (कुदा-कुदा)' : '6 Foundation Stances (Kuda-kuda)'}</div>
                <div>• {language === 'hi' ? '8 दिशाओं में कदम (पोला लांग्काह)' : '8-Direction Footwork Patterns'}</div>
                <div>• {language === 'hi' ? 'हाइब्रिड कॉम्बैट कंडीशनिंग' : 'Athletic Combat Conditioning'}</div>
              </div>
              <button
                onClick={() => setActiveTab('silat')}
                className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs active:scale-95 transition-all shadow-md shadow-amber-400/20"
              >
                {language === 'hi' ? 'पेंचक सिलाट मॉड्यूल खोलें' : 'Explore Pencak Silat'}
              </button>
            </div>

            {/* Judo Card */}
            <div className="p-5 rounded-3xl bg-[#121620] border border-blue-500/20 hover:border-blue-400/50 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-white">{t('judoTitle')}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{t('judoDesc')}</p>
              <div className="space-y-1 text-xs text-slate-400">
                <div>• {language === 'hi' ? 'उकेमी (सुरक्षित गिरने की कला)' : 'Ukemi (Breakfall Protection)'}</div>
                <div>• {language === 'hi' ? 'कुजुशी (संतुलन बिगाड़ने का सिद्धांत)' : 'Kuzushi (Off-Balancing Mechanics)'}</div>
                <div>• {language === 'hi' ? 'ग्रिप व शोल्डर स्ट्रेंथ' : 'Gi Grip & Rotational Core Power'}</div>
              </div>
              <button
                onClick={() => setActiveTab('judo')}
                className="w-full py-2.5 rounded-xl bg-blue-400 hover:bg-blue-300 text-black font-extrabold text-xs active:scale-95 transition-all shadow-md shadow-blue-400/20"
              >
                {language === 'hi' ? 'जूडो मॉड्यूल खोलें' : 'Explore Kodokan Judo'}
              </button>
            </div>
          </div>

          {/* Martial Arts Specific Workouts */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'मार्शल आर्ट्स कंडीशनिंग सेशन्स' : 'Combat Athlete Conditioning'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {martialWorkouts.map((wo) => (
                <div
                  key={wo.id}
                  className="p-4 rounded-2xl bg-[#121620] border border-white/10 hover:border-amber-400/40 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-amber-400">{wo.level}</span>
                    <span className="text-[10px] text-slate-400">{wo.estimatedMinutes} mins</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    {language === 'hi' ? wo.titleHi : wo.titleEn}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {language === 'hi' ? wo.descriptionHi : wo.descriptionEn}
                  </p>
                  <button
                    onClick={() => onStartWorkout(wo)}
                    className="w-full py-2 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-black font-extrabold text-xs text-white active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t('startWorkout')}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: PENCAK SILAT */}
      {activeTab === 'silat' && (
        <div className="space-y-5 animate-fadeIn">
          {/* History & Stances Card */}
          <div className="p-5 rounded-3xl bg-[#121620] border border-white/10 space-y-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              {language === 'hi' ? 'इतिहास व दर्शन' : 'History & Philosophy'}
            </span>
            <h2 className="text-lg font-black text-white">
              {language === 'hi' ? 'पेंचक सिलाट का परिचय' : 'The Essence of Pencak Silat'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'पेंचक सिलाट दक्षिण पूर्व एशिया, विशेष रूप से इंडोनेशिया और मलेशिया की एक समृद्ध पारंपरिक युद्ध कला है। यह केवल वार करने की कला नहीं है, बल्कि यह शरीर के संतुलन, 8 दिशाओं में गतिशीलता, आत्मरक्षा (बेला दीरी) और गहरी मानसिक एकाग्रता का प्रतीक है।'
                : 'Pencak Silat is an indigenous martial art originating from Southeast Asia, celebrated for fluid movements, deep stances (Kuda-kuda), intricate foot patterns (Langkah), and agile evasive tactics.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Kuda-kuda Depan</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'अग्र रुख' : 'Front Stance'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Kuda-kuda Belakang</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'पिछला रुख' : 'Back Stance'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Kuda-kuda Tengah</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'मध्य रुख' : 'Horse Stance'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Kuda-kuda Samping</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'पार्श्व रुख' : 'Side Stance'}</div>
              </div>
            </div>
          </div>

          {/* Pencak Silat Video Lessons */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'पेंचक सिलाट वीडियो ट्यूटोरियल' : 'Pencak Silat Lessons'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {silatVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => onOpenVideo(vid)}
                  className="p-3 rounded-2xl bg-[#121620] border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-zinc-900 shrink-0 relative">
                    <img src={vid.videoThumbnail} alt={vid.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-300">
                      {language === 'hi' ? vid.titleHi : vid.titleEn}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{vid.duration} • {vid.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Silat Exercises */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>{language === 'hi' ? 'फुटवर्क एवं ड्रिल गाइड' : 'Movement Drills'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {silatExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => onSelectExercise(ex)}
                  className="p-3.5 rounded-2xl bg-[#121620] border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{language === 'hi' ? ex.nameHi : ex.nameEn}</h4>
                    <span className="text-[10px] text-amber-400">{ex.sets} sets • {ex.reps}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: JUDO */}
      {activeTab === 'judo' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Judo History & Philosophy */}
          <div className="p-5 rounded-3xl bg-[#121620] border border-white/10 space-y-3">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              {language === 'hi' ? 'कोडोकान जूडो दर्शन' : 'The Gentle Way (Ju-Do)'}
            </span>
            <h2 className="text-lg font-black text-white">
              {language === 'hi' ? 'जूडो: शक्ति नहीं, सही सिद्धांत' : 'Maximum Efficiency with Minimum Effort (Seiryoku Zen’yo)'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'जूडो की स्थापना 1882 में जिगोरो कानो द्वारा की गई थी। जूडो में प्रतिद्वंद्वी की शक्ति के खिलाफ लड़ने के बजाय, उसकी ही गति और दिशा का उपयोग करके उसे संतुलित रूप से जमीन पर गिराया जाता है। इसमें सबसे पहली और महत्वपूर्ण कला सुरक्षित गिरना (उकेमी) है।'
                : 'Founded in 1882 by Jigoro Kano, Kodokan Judo emphasizes yielding to overcome, off-balancing opponents (Kuzushi), and controlling throws cleanly onto safety mats.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Ushiro Ukemi</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'पीछे सुरक्षित गिरना' : 'Rear Breakfall'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Yoko Ukemi</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'साइड ब्रेकफॉल' : 'Side Breakfall'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Mae Mawari Ukemi</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'फॉरवर्ड रोल' : 'Forward Rolling Fall'}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                <div className="text-[10px] text-slate-400 font-semibold">Kuzushi</div>
                <div className="text-xs font-bold text-white mt-0.5">{language === 'hi' ? 'संतुलन बिगाड़ना' : 'Off-Balancing'}</div>
              </div>
            </div>
          </div>

          {/* Judo Video Lessons */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-blue-400" />
              <span>{language === 'hi' ? 'जूडो वीडियो ट्यूटोरियल्स' : 'Judo Video Lessons'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {judoVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => onOpenVideo(vid)}
                  className="p-3 rounded-2xl bg-[#121620] border border-white/10 hover:border-blue-400/40 cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <div className="w-20 h-14 rounded-xl overflow-hidden bg-zinc-900 shrink-0 relative">
                    <img src={vid.videoThumbnail} alt={vid.titleEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-blue-300">
                      {language === 'hi' ? vid.titleHi : vid.titleEn}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{vid.duration} • {vid.instructor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Judo Safety Drills */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-400" />
              <span>{language === 'hi' ? 'उकेमी व सुरक्षा व्यायाम' : 'Ukemi & Breakfall Conditioning'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {judoExercises.map((ex) => (
                <div
                  key={ex.id}
                  onClick={() => onSelectExercise(ex)}
                  className="p-3.5 rounded-2xl bg-[#121620] border border-white/10 hover:border-blue-400/40 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white">{language === 'hi' ? ex.nameHi : ex.nameEn}</h4>
                    <span className="text-[10px] text-blue-400">{ex.sets} sets • {ex.reps}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
