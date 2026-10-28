import React from 'react';
import { Menu, Globe, Sparkles, User as UserIcon, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { OFFICIAL_LOGO_URL } from '../data/seedData';

interface NavbarProps {
  onOpenSidebar: () => void;
  onOpenAuth: () => void;
  onOpenAi: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSidebar,
  onOpenAuth,
  onOpenAi,
  currentPage,
  onNavigate,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { currentUser, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between transition-all">
      {/* Left: Hamburger & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
          className="p-2 -ml-1 text-slate-300 hover:text-white active:scale-95 transition-transform rounded-xl hover:bg-white/5"
        >
          <Menu className="w-6 h-6 text-lime-400" />
        </button>

        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-lime-400/50 shadow-sm shadow-lime-400/20 group-hover:scale-105 transition-transform bg-black">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="JFZ — Jeevan Fit Zone Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-base text-white leading-tight font-sans flex items-center gap-1.5">
              JFZ
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                PRO
              </span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium tracking-tight">
              Jeevan Fit Zone
            </span>
          </div>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          aria-label="Switch Language"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 border border-white/10 active:scale-95 transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-lime-400" />
          <span>{language === 'hi' ? 'हिन्दी' : 'EN'}</span>
        </button>

        {/* AI Assistant Quick Button */}
        <button
          onClick={onOpenAi}
          aria-label="Open JFZ AI Assistant"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-lime-500/20 to-emerald-500/20 border border-lime-400/30 text-lime-400 hover:border-lime-400/60 active:scale-95 transition-all"
          title="JFZ AI Coach"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-bold hidden sm:inline">AI Coach</span>
        </button>

        {/* Admin Badge shortcut if Admin */}
        {isAdmin && (
          <button
            onClick={() => onNavigate('admin')}
            aria-label="Admin Dashboard"
            className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 active:scale-95 transition-all"
            title="Admin Dashboard"
          >
            <Shield className="w-4 h-4" />
          </button>
        )}

        {/* User Profile Avatar / Sign In */}
        {currentUser ? (
          <button
            onClick={() => onNavigate('profile')}
            aria-label="My Profile"
            className="w-9 h-9 rounded-full overflow-hidden border border-lime-400/40 bg-zinc-800 flex items-center justify-center active:scale-95 transition-transform"
          >
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt={currentUser.displayName || 'User'} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-lime-400 uppercase">
                {currentUser.displayName ? currentUser.displayName[0] : (currentUser.email ? currentUser.email[0] : 'U')}
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-400 text-black hover:bg-lime-300 font-bold text-xs active:scale-95 shadow-lg shadow-lime-400/20 transition-all"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>{t('signIn')}</span>
          </button>
        )}
      </div>
    </header>
  );
};
