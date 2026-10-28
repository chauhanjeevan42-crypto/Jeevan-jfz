import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Globe, 
  Award, 
  Target, 
  LogOut, 
  Trash2, 
  Save, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface ProfilePageProps {
  onOpenAuth: () => void;
  onNavigate: (page: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onOpenAuth, onNavigate }) => {
  const { currentUser, userProfile, isAdmin, signOut, updateUserProfileData, deleteUserAccount } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const [displayName, setDisplayName] = useState(userProfile?.displayName || currentUser?.displayName || '');
  const [prefLang, setPrefLang] = useState<Language>(userProfile?.preferredLanguage || language);
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>(userProfile?.experienceLevel || 'beginner');
  const [interests, setInterests] = useState(userProfile?.trainingInterests || 'Hybrid Training, Pencak Silat');
  const [goals, setGoals] = useState(userProfile?.trainingGoals || 'Build athletic endurance and agility');

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateUserProfileData({
        displayName: displayName.trim(),
        preferredLanguage: prefLang,
        experienceLevel: level,
        trainingInterests: interests.trim(),
        trainingGoals: goals.trim(),
      });
      setLanguage(prefLang);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    setIsDeleting(true);
    try {
      await deleteUserAccount();
      setDeleteConfirmOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to delete account. You may need to re-login first.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="p-8 rounded-3xl bg-[#121620] border border-white/10 text-center space-y-4 max-w-md mx-auto my-12 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-white">
          {language === 'hi' ? 'एथलीट प्रोफ़ाइल में लॉगिन करें' : 'Athlete Profile Access'}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {language === 'hi'
            ? 'अपनी ट्रेनिंग प्राथमिकताएं, व्यक्तिगत रिकॉर्ड्स और पाठ्यक्रम प्रगति को सुरक्षित रखने के लिए लॉगिन करें।'
            : 'Sign in to customize your training goals, save personal records, and sync progress across devices.'}
        </p>
        <button
          onClick={onOpenAuth}
          className="w-full py-3 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs shadow-lg shadow-lime-400/20 active:scale-95 transition-all"
        >
          {t('signIn')}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fadeIn max-w-xl mx-auto">
      {/* Profile Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171E2D] via-[#101522] to-[#0A0D14] border border-lime-500/30 shadow-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-lime-400/60 bg-zinc-800 flex items-center justify-center">
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl font-black text-lime-400 uppercase">
                {displayName ? displayName[0] : 'A'}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white">{displayName || 'Athlete'}</h2>
              {isAdmin && (
                <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  ADMIN
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{currentUser.email}</p>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
          title={t('signOut')}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Save Success Banner */}
      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-lime-500/10 border border-lime-500/30 text-lime-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
          <span>{language === 'hi' ? 'प्रोफ़ाइल सफलतापूर्वक सहेजी गई!' : 'Profile updated successfully!'}</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="p-5 sm:p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-4 shadow-xl">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          {language === 'hi' ? 'एथलीट प्राथमिकताएं' : 'Athlete Profile & Preferences'}
        </h3>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            {language === 'hi' ? 'नाम (Display Name)' : 'Display Name'}
          </label>
          <input
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {language === 'hi' ? 'पसंदीदा भाषा' : 'Preferred Language'}
            </label>
            <select
              value={prefLang}
              onChange={(e) => setPrefLang(e.target.value as Language)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            >
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {language === 'hi' ? 'प्रशिक्षण स्तर' : 'Experience Level'}
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            >
              <option value="beginner">{language === 'hi' ? 'आरंभिक (Beginner)' : 'Beginner'}</option>
              <option value="intermediate">{language === 'hi' ? 'मध्यम (Intermediate)' : 'Intermediate'}</option>
              <option value="advanced">{language === 'hi' ? 'उन्नत (Advanced)' : 'Advanced'}</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            {language === 'hi' ? 'ट्रेनिंग में रुचि' : 'Training Interests'}
          </label>
          <input
            type="text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="e.g. Hybrid, Pencak Silat, 5K Running"
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            {language === 'hi' ? 'व्यक्तिगत लक्ष्य' : 'Personal Training Goals'}
          </label>
          <input
            type="text"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="e.g. Sub-25min 5K, learn Judo ukemi breakfalls"
            className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 transition-all shadow-md shadow-lime-400/20 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? t('loading') : (language === 'hi' ? 'प्राथमिकताएं सहेजें' : 'Save Preferences')}</span>
        </button>
      </form>

      {/* Admin Quick Jump if Admin */}
      {isAdmin && (
        <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs font-extrabold text-amber-300">
                {language === 'hi' ? 'प्रमाणित एडमिन (Jeevan Chauhan)' : 'Authorized Admin Console'}
              </div>
              <div className="text-[10px] text-slate-400">
                {language === 'hi' ? 'कंटेंट, वीडियो और सेटिंग्स प्रबंधित करें' : 'Manage curriculum, videos, and settings'}
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('admin')}
            className="px-3 py-1.5 rounded-xl bg-amber-400 text-black font-bold text-xs"
          >
            {t('navAdmin')}
          </button>
        </div>
      )}

      {/* Account Deletion Area */}
      <div className="p-5 rounded-3xl bg-red-500/5 border border-red-500/20 space-y-3">
        <h4 className="text-xs font-extrabold text-red-400 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          <span>{language === 'hi' ? 'खाता एवं डेटा प्रबंधन' : 'Account & Data Privacy'}</span>
        </h4>
        <p className="text-xs text-slate-400 leading-relaxed">
          {language === 'hi'
            ? 'आप किसी भी समय अपना खाता और उससे जुड़ा सारा व्यक्तिगत प्रशिक्षण डेटा स्थायी रूप से हटा सकते हैं।'
            : 'You can permanently delete your user profile and associated workout records.'}
        </p>

        {!deleteConfirmOpen ? (
          <button
            type="button"
            onClick={() => setDeleteConfirmOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/30 transition-colors"
          >
            {language === 'hi' ? 'खाता हटाने का अनुरोध करें' : 'Delete Account & Data'}
          </button>
        ) : (
          <div className="p-3.5 rounded-2xl bg-black/60 border border-red-500/40 space-y-2">
            <p className="text-xs font-bold text-red-300">
              {language === 'hi' ? 'क्या आप सचमुच अपना खाता हटाना चाहते हैं? यह क्रिया वापस नहीं ली जा सकती।' : 'Are you sure? This action permanently removes your logs.'}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 text-slate-300 text-xs font-medium"
              >
                {t('cancel')}
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500"
              >
                {isDeleting ? t('loading') : (language === 'hi' ? 'हाँ, स्थायी रूप से हटाएं' : 'Confirm Delete')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
