import React, { useState } from 'react';
import { X, Mail, Lock, User, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_LOGO_URL } from '../data/seedData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();
  const { language, t } = useLanguage();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
        onClose();
      } else if (mode === 'signup') {
        if (!displayName.trim()) {
          setErrorMsg('Please enter your name');
          setIsLoading(false);
          return;
        }
        await signUpWithEmail(email, password, displayName);
        onClose();
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccessMsg(
          language === 'hi'
            ? 'पासवर्ड रीसेट लिंक आपके ईमेल पर भेजा गया है!'
            : 'Password reset link sent to your email!'
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121620] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-full overflow-hidden border border-lime-400/50 shadow-md shadow-lime-400/20 mb-3 bg-black">
            <img src={OFFICIAL_LOGO_URL} alt="JFZ" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-black text-white">JFZ — JEEVAN FIT ZONE</h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'signin' && (language === 'hi' ? 'अपने प्रशिक्षण खाते में लॉगिन करें' : 'Sign in to access your workouts & progress')}
            {mode === 'signup' && (language === 'hi' ? 'नया एथलीट खाता बनाएं' : 'Create an athlete account to save progress')}
            {mode === 'forgot' && (language === 'hi' ? 'पासवर्ड रीसेट करें' : 'Reset your account password')}
          </p>
        </div>

        {/* Error / Success Banners */}
        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 mb-4 rounded-xl bg-lime-500/10 border border-lime-500/20 text-lime-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google 1-Click Login Button */}
        {mode !== 'forgot' && (
          <div className="space-y-4 mb-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white text-black font-extrabold text-xs hover:bg-slate-100 active:scale-95 transition-all shadow-md"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{language === 'hi' ? 'गूगल से लॉगिन करें (Google Sign-In)' : 'Continue with Google'}</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-white/10" />
              <span className="text-[10px] text-slate-500 font-bold uppercase">{language === 'hi' ? 'या ईमेल द्वारा' : 'OR WITH EMAIL'}</span>
              <div className="h-[1px] flex-1 bg-white/10" />
            </div>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                {language === 'hi' ? 'आपका नाम' : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-slate-300 block mb-1">
              {language === 'hi' ? 'ईमेल पता' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  {language === 'hi' ? 'पासवर्ड' : 'Password'}
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                    className="text-[10px] text-lime-400 hover:underline"
                  >
                    {language === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot password?'}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 transition-all shadow-lg shadow-lime-400/20 disabled:opacity-60 flex items-center justify-center gap-1.5"
          >
            <span>
              {mode === 'signin' && (language === 'hi' ? 'साइन इन करें' : 'Sign In')}
              {mode === 'signup' && (language === 'hi' ? 'खाता बनाएं' : 'Create Account')}
              {mode === 'forgot' && (language === 'hi' ? 'रीसेट लिंक भेजें' : 'Send Reset Link')}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Toggle between Modes */}
        <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
          {mode === 'signin' ? (
            <p>
              {language === 'hi' ? 'नया खाता बनाना चाहते हैं?' : "Don't have an account?"}{' '}
              <button
                onClick={() => { setMode('signup'); setErrorMsg(''); }}
                className="font-bold text-lime-400 hover:underline"
              >
                {language === 'hi' ? 'साइन अप करें' : 'Sign Up'}
              </button>
            </p>
          ) : (
            <p>
              {language === 'hi' ? 'पहले से खाता है?' : 'Already have an account?'}{' '}
              <button
                onClick={() => { setMode('signin'); setErrorMsg(''); }}
                className="font-bold text-lime-400 hover:underline"
              >
                {language === 'hi' ? 'लॉगिन करें' : 'Sign In'}
              </button>
            </p>
          )}

          {/* Guest Dismiss */}
          <button
            onClick={onClose}
            className="mt-3 text-[11px] text-slate-500 hover:text-slate-300 underline block mx-auto"
          >
            {t('guestMode')}
          </button>
        </div>
      </div>
    </div>
  );
};
