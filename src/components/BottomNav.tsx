import React from 'react';
import { Home, Dumbbell, PlayCircle, TrendingUp, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPage, onNavigate }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'training', label: t('navTraining'), icon: Dumbbell },
    { id: 'videos', label: t('navVideos'), icon: PlayCircle },
    { id: 'progress', label: t('navProgress'), icon: TrendingUp },
    { id: 'profile', label: t('navProfile'), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0E14]/95 backdrop-blur-lg border-t border-white/10 px-2 py-2 max-w-lg mx-auto md:max-w-2xl lg:max-w-4xl shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
                isActive
                  ? 'text-lime-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <div className="absolute -top-2 w-8 h-1 bg-lime-400 rounded-full shadow-[0_0_8px_#a3e635]" />
              )}
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-1 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
