import React from 'react';
import { 
  Award, 
  Swords, 
  Zap, 
  Target, 
  ExternalLink, 
  Mail, 
  Phone, 
  Youtube, 
  Instagram, 
  Facebook,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { OFFICIAL_LOGO_URL } from '../data/seedData';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { appSettings } = useData();

  return (
    <div className="space-y-6 pb-20 animate-fadeIn max-w-2xl mx-auto">
      {/* Hero Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A2234] via-[#101624] to-[#0A0D14] border border-lime-500/30 shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
        <div className="relative shrink-0">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-lime-400 shadow-xl shadow-lime-400/20 bg-black">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="Jeevan Chauhan — JFZ Founder"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 sm:bottom-0 right-0 px-2 py-0.5 rounded-full bg-lime-400 text-black text-[10px] font-black uppercase tracking-wider shadow">
            HEAD COACH
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-lime-400 uppercase tracking-widest">
            {language === 'hi' ? 'संस्थापक एवं मुख्य प्रशिक्षक' : 'FOUNDER & HEAD INSTRUCTOR'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Jeevan Chauhan
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-lime-300">
            {t('tagline')}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {language === 'hi' ? appSettings.aboutBioHi : appSettings.aboutBioEn}
          </p>
        </div>
      </div>

      {/* Coaching Philosophy */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider">
          <Target className="w-4 h-4" />
          <span>{language === 'hi' ? 'प्रशिक्षण दर्शन (Coaching Philosophy)' : 'Coaching Philosophy'}</span>
        </div>
        <h3 className="text-base sm:text-lg font-black text-white">
          "Train Smart. Move Strong. Live Fit."
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {language === 'hi' ? appSettings.coachingPhilosophyHi : appSettings.coachingPhilosophyEn}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <div className="font-bold text-xs text-lime-400">1. {language === 'hi' ? 'स्मार्ट प्रोग्रेशन' : 'Smart Progression'}</div>
            <p className="text-[11px] text-slate-400 leading-tight">
              {language === 'hi' ? 'चोट से बचाव और सही तकनीक को प्राथमिकता।' : 'Prioritizing injury resilience and biomechanics.'}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <div className="font-bold text-xs text-white">2. {language === 'hi' ? 'हाइब्रिड अनुकूलन' : 'Hybrid Capacity'}</div>
            <p className="text-[11px] text-slate-400 leading-tight">
              {language === 'hi' ? 'शक्ति और एरोबिक स्टैमिना का वैज्ञानिक संगम।' : 'Fusing functional strength with aerobic stamina.'}
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
            <div className="font-bold text-xs text-amber-400">3. {language === 'hi' ? 'मार्शल अनुशासन' : 'Combat Discipline'}</div>
            <p className="text-[11px] text-slate-400 leading-tight">
              {language === 'hi' ? 'पेंचक सिलाट व जूडो के सम्मान और सुरक्षा के सिद्धांत।' : 'Pencak Silat & Judo values of respect and safety.'}
            </p>
          </div>
        </div>
      </div>

      {/* Martial Arts & Sports Background */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-4 shadow-xl">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Swords className="w-4 h-4 text-amber-400" />
          <span>{language === 'hi' ? 'खेल व मार्शल आर्ट्स पृष्ठभूमि' : 'Athletic & Combat Sports Background'}</span>
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Pencak Silat: </span>
              {language === 'hi'
                ? 'पारंपरिक दक्षिण पूर्व एशियाई मार्शल आर्ट्स में गहरी विशेषज्ञता। कुदा-कुदा स्टांस, पोला लांग्काह (फुटवर्क) और बेला दीरी (आत्मरक्षा तकनीक) में प्रशिक्षित।'
                : 'Specializing in Indonesian cultural martial arts: stances (Kuda-kuda), multi-directional footwork (Langkah), and sports conditioning.'}
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Kodokan Judo: </span>
              {language === 'hi'
                ? 'सुरक्षित रूप से गिरने (उकेमी), संतुलन बिगाड़ने (कुजुशी) और नियंत्रित थ्रो पर आधारित खेल अनुशासन।'
                : 'Focusing on breakfalls (Ukemi), safe mat etiquette, off-balancing, and core rotational power.'}
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/40 border border-white/5">
            <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-white">Hybrid Conditioning: </span>
              {language === 'hi'
                ? '5K/10K रनिंग, कैलिस्थेनिक्स, केटलबेल और मोबिलिटी वर्क का वैज्ञानिक संयोजन।'
                : 'Evidence-based conditioning combining distance intervals, calisthenics, and active joint mobility.'}
            </div>
          </div>
        </div>
      </div>

      {/* Connect with Jeevan */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-3 shadow-xl">
        <h3 className="text-sm font-extrabold text-white">
          {language === 'hi' ? 'कोच जीवन चौहान से जुड़ें' : 'Connect with Coach Jeevan'}
        </h3>
        <p className="text-xs text-slate-400">
          {language === 'hi'
            ? 'प्रशिक्षण, वर्कआउट सलाह या अकादमी पूछताछ के लिए आधिकारिक चैनलों से संपर्क करें:'
            : 'For training inquiries, academy workshops, and video masterclasses:'}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {appSettings.youtube && (
            <a
              href={appSettings.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/30 text-xs font-bold transition-all"
            >
              <Youtube className="w-4 h-4 text-red-400" />
              <span>YouTube</span>
            </a>
          )}

          {appSettings.instagram && (
            <a
              href={appSettings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 text-xs font-bold transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Instagram</span>
            </a>
          )}

          {appSettings.whatsapp && (
            <a
              href={`https://wa.me/${appSettings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          )}

          {appSettings.email && (
            <a
              href={`mailto:${appSettings.email}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-lime-400/20 hover:bg-lime-400/30 text-lime-300 border border-lime-400/30 text-xs font-bold transition-all"
            >
              <Mail className="w-4 h-4 text-lime-400" />
              <span>Email</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
