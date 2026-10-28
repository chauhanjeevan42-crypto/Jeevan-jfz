import React, { useState } from 'react';
import { 
  Play, 
  Search, 
  Bookmark, 
  CheckCircle, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  Share2, 
  ChevronRight,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { VideoLessonItem } from '../types';

interface VideosPageProps {
  initialVideo?: VideoLessonItem | null;
  onOpenAuth: () => void;
}

export const VideosPage: React.FC<VideosPageProps> = ({ initialVideo, onOpenAuth }) => {
  const { language, t } = useLanguage();
  const { videos, userLessonProgress, toggleLessonFavorite, toggleLessonCompleted } = useData();
  const { currentUser } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoLessonItem | null>(initialVideo || videos[0] || null);

  const categories = [
    { id: 'all', labelEn: 'All Videos', labelHi: 'सभी वीडियो' },
    { id: 'silat', labelEn: 'Pencak Silat', labelHi: 'पेंचक सिलाट' },
    { id: 'judo', labelEn: 'Judo', labelHi: 'जूडो' },
    { id: 'hybrid', labelEn: 'Hybrid Training', labelHi: 'हाइब्रिड ट्रेनिंग' },
    { id: 'strength', labelEn: 'Strength & Conditioning', labelHi: 'शक्ति व कंडीशनिंग' },
    { id: 'mobility', labelEn: 'Mobility & Recovery', labelHi: 'मोबिलिटी व रिकवरी' },
  ];

  const filteredVideos = videos.filter((v) => {
    const matchesCat = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesLvl = selectedLevel === 'all' || v.level === selectedLevel || v.level === 'all';
    const matchesSearch =
      v.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.titleHi.includes(searchQuery) ||
      v.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesLvl && matchesSearch;
  });

  const featuredVideos = videos.filter((v) => v.isFeatured);

  // Helper to extract YouTube video ID
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0`;
      }
    } catch (e) {
      // return original
    }
    return '';
  };

  const isFavorite = activeVideo && currentUser ? !!userLessonProgress[activeVideo.id]?.isFavorite : false;
  const isCompleted = activeVideo && currentUser ? !!userLessonProgress[activeVideo.id]?.isCompleted : false;

  const handleFavoriteClick = async () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (activeVideo) {
      await toggleLessonFavorite(activeVideo.id);
    }
  };

  const handleCompletedClick = async () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    if (activeVideo) {
      await toggleLessonCompleted(activeVideo.id);
    }
  };

  const embedUrl = activeVideo ? getYouTubeEmbedUrl(activeVideo.youtubeUrl) : '';

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Video Player Section if Active */}
      {activeVideo && (
        <div className="rounded-3xl bg-[#121620] border border-lime-500/30 overflow-hidden shadow-2xl space-y-4">
          <div className="relative aspect-video bg-black w-full overflow-hidden">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={activeVideo.titleEn}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
                <img
                  src={activeVideo.videoThumbnail}
                  alt={activeVideo.titleEn}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 space-y-2">
                  <Play className="w-12 h-12 text-lime-400 mx-auto" />
                  <p className="text-xs text-slate-300">
                    {language === 'hi'
                      ? 'यह वीडियो बाहरी प्लेबैक या यूट्यूब ऐप पर देखने के लिए उपलब्ध है।'
                      : 'This lesson can be opened directly on YouTube.'}
                  </p>
                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg"
                  >
                    <span>{language === 'hi' ? 'यूट्यूब पर देखें' : 'Watch on YouTube'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Video Metadata & Controls */}
          <div className="p-4 sm:p-5 pt-0 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-lime-400/20 text-lime-400 border border-lime-400/30">
                  {activeVideo.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activeVideo.duration} • Coach {activeVideo.instructor}
                </span>
              </div>

              {/* Action Buttons: Favorite & Completed */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleFavoriteClick}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                    isFavorite
                      ? 'bg-amber-400/20 text-amber-400 border-amber-400/40'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{isFavorite ? (language === 'hi' ? 'पसंदीदा ✓' : 'Favorited') : (language === 'hi' ? 'पसंदीदा' : 'Save')}</span>
                </button>

                <button
                  onClick={handleCompletedClick}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                    isCompleted
                      ? 'bg-lime-400 text-black border-lime-400 shadow-sm shadow-lime-400/20'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isCompleted ? (language === 'hi' ? 'देखा गया ✓' : 'Completed') : (language === 'hi' ? 'पूर्ण चिह्नित करें' : 'Mark Watched')}</span>
                </button>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
              {language === 'hi' ? activeVideo.titleHi : activeVideo.titleEn}
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi' ? activeVideo.descriptionHi : activeVideo.descriptionEn}
            </p>

            {/* Direct YouTube button */}
            <div className="pt-2">
              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-lime-400 hover:text-lime-300 underline"
              >
                <span>{language === 'hi' ? 'यूट्यूब पर वीडियो लिंक खोलें' : 'Open Video Link on YouTube'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={language === 'hi' ? 'वीडियो शीर्षक या विषय खोजें...' : 'Search lessons by title or discipline...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/60 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2.5 rounded-2xl bg-[#121620] border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            >
              <option value="all">{language === 'hi' ? 'सभी स्तर' : 'All Levels'}</option>
              <option value="beginner">{language === 'hi' ? 'आरंभिक' : 'Beginner'}</option>
              <option value="intermediate">{language === 'hi' ? 'मध्यम' : 'Intermediate'}</option>
              <option value="advanced">{language === 'hi' ? 'उन्नत' : 'Advanced'}</option>
            </select>
          </div>
        </div>

        {/* Categories Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === c.id
                  ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                  : 'bg-[#121620] hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {language === 'hi' ? c.labelHi : c.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{filteredVideos.length} {language === 'hi' ? 'पाठ उपलब्ध हैं' : 'lessons available'}</span>
          <span className="text-lime-400 font-semibold">JFZ Curriculum</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredVideos.map((vid) => {
            const isVidCompleted = currentUser ? !!userLessonProgress[vid.id]?.isCompleted : false;
            const isVidFav = currentUser ? !!userLessonProgress[vid.id]?.isFavorite : false;
            const isCurrent = activeVideo?.id === vid.id;

            return (
              <div
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`rounded-2xl overflow-hidden bg-[#121620] border cursor-pointer transition-all flex flex-col group ${
                  isCurrent ? 'border-lime-400 shadow-lg shadow-lime-400/10' : 'border-white/10 hover:border-lime-400/40'
                }`}
              >
                <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                  <img
                    src={vid.videoThumbnail}
                    alt={vid.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-lime-400 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                    {vid.duration}
                  </span>

                  {isVidCompleted && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-lime-400 text-black font-extrabold text-[9px] uppercase shadow-sm">
                      Completed ✓
                    </span>
                  )}
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-lime-400 tracking-wider">
                      {vid.category}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-lime-300 transition-colors line-clamp-2 mt-0.5">
                      {language === 'hi' ? vid.titleHi : vid.titleEn}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {language === 'hi' ? vid.descriptionHi : vid.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{vid.instructor}</span>
                    <span className="text-lime-400 font-bold flex items-center gap-0.5">
                      {language === 'hi' ? 'देखें' : 'Watch'}
                      <ChevronRight className="w-3 h-3" />
                    </span>
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
