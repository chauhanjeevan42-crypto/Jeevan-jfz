import React from 'react';
import { 
  X, 
  Home, 
  Zap, 
  Dumbbell, 
  Swords, 
  BookOpen, 
  PlayCircle, 
  TrendingUp, 
  Info, 
  Phone, 
  ShieldCheck, 
  Settings, 
  FileText, 
  LogOut, 
  LogIn,
  Sparkles,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { OFFICIAL_LOGO_URL } from '../data/seedData';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAuth: () => void;
  onOpenAi: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onOpenAuth,
  onOpenAi,
}) => {
  const { t, language, toggleLanguage } = useLanguage();
  const { currentUser, isAdmin, signOut } = useAuth();

  if (!isOpen) return null;

  const handleNav = (page: string) => {
    onNavigate(page);
    onClose();
  };

  const menuSections = [
    {
      title: language === 'hi' ? 'मुख्य नेविगेशन' : 'Main Navigation',
      items: [
        { id: 'home', label: t('navHome'), icon: Home },
        { id: 'hybrid', label: t('navHybrid'), icon: Zap, badge: 'HYBRID' },
        { id: 'fitness', label: t('navFitness'), icon: Dumbbell },
        { id: 'martial_arts', label: t('navMartialArts'), icon: Swords, badge: 'ACADEMY' },
        { id: 'silat', label: t('navSilat'), icon: Swords },
        { id: 'judo', label: t('navJudo'), icon: Award },
        { id: 'plans', label: t('navPlans'), icon: BookOpen },
        { id: 'videos', label: t('navVideos'), icon: PlayCircle },
        { id: 'progress', label: t('navProgress'), icon: TrendingUp },
      ]
    },
    {
      title: language === 'hi' ? 'JFZ अकादमी' : 'JFZ Academy',
      items: [
        { id: 'about', label: t('navAbout'), icon: Info },
        { id: 'contact', label: t('navContact'), icon: Phone },
        { id: 'settings', label: t('navSettings'), icon: Settings },
      ]
    },
    {
      title: language === 'hi' ? 'कानूनी व नियम' : 'Legal & Policies',
      items: [
        { id: 'privacy', label: t('navPrivacy'), icon: FileText },
        { id: 'terms', label: t('navTerms'), icon: FileText },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-[#0F131C] border-r border-white/10 h-full flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="JFZ Logo"
              className="w-10 h-10 rounded-full border border-lime-400/50 bg-black object-cover shadow-sm"
            />
            <div>
              <h2 className="text-white font-extrabold text-sm tracking-wide">JFZ — JEEVAN FIT ZONE</h2>
              <p className="text-[11px] text-lime-400 font-medium">Train Smart. Move Strong.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Assistant Banner */}
        <div className="p-3 mx-3 mt-3 rounded-2xl bg-gradient-to-br from-lime-500/10 via-emerald-500/5 to-transparent border border-lime-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-lime-400" />
              <span className="text-xs font-bold text-white">JFZ AI Coach</span>
            </div>
            <button
              onClick={() => { onOpenAi(); onClose(); }}
              className="text-[11px] font-bold text-black bg-lime-400 hover:bg-lime-300 px-2 py-0.5 rounded-lg active:scale-95 transition-all"
            >
              Ask AI
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            {language === 'hi' ? 'फिटनेस व तकनीक पर तुरंत मार्गदर्शन पाएं।' : 'Instant athletic & sports education guidance.'}
          </p>
        </div>

        {/* Navigation list */}
        <div className="flex-1 px-3 py-3 space-y-4">
          {menuSections.map((sec, idx) => (
            <div key={idx}>
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {sec.title}
              </div>
              <div className="space-y-0.5 mt-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-lime-400/15 text-lime-400 font-bold border border-lime-400/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-300 uppercase">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Admin Dashboard Item (if Admin) */}
          {isAdmin && (
            <div className="pt-2 border-t border-amber-500/20">
              <button
                onClick={() => handleNav('admin')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  currentPage === 'admin'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{t('navAdmin')}</span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300">
                  COACH JEEVAN
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 bg-black/60 space-y-2">
          {/* Language Toggle in Drawer */}
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <span className="text-slate-400">{language === 'hi' ? 'भाषा (Language)' : 'Language'}</span>
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-lime-400 border border-white/10"
            >
              {language === 'hi' ? 'हिन्दी (Hindi)' : 'English'}
            </button>
          </div>

          {currentUser ? (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center font-bold text-xs uppercase">
                  {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                </div>
                <div className="truncate text-left">
                  <div className="text-xs font-semibold text-white truncate">
                    {currentUser.displayName || 'Athlete'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {currentUser.email}
                  </div>
                </div>
              </div>
              <button
                onClick={async () => { await signOut(); onClose(); }}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                title={t('signOut')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onOpenAuth(); onClose(); }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-lime-400 text-black font-bold text-xs hover:bg-lime-300 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('signIn')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
