import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, Lock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LegalPageProps {
  initialType?: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialType = 'terms' }) => {
  const { language, t } = useLanguage();
  const [activeType, setActiveType] = React.useState<'privacy' | 'terms'>(initialType);

  return (
    <div className="space-y-6 pb-20 animate-fadeIn max-w-2xl mx-auto">
      {/* Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171E2D] via-[#101522] to-[#0A0D14] border border-white/10 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveType('terms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeType === 'terms'
                ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {t('navTerms')}
          </button>
          <button
            onClick={() => setActiveType('privacy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeType === 'privacy'
                ? 'bg-lime-400 text-black shadow-md shadow-lime-400/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            {t('navPrivacy')}
          </button>
        </div>

        <h1 className="text-2xl font-black text-white">
          {activeType === 'terms'
            ? (language === 'hi' ? 'नियम, शर्तें एवं खेल सुरक्षा नीति' : 'Terms of Service & Training Safety')
            : (language === 'hi' ? 'गोपनीयता एवं डेटा सुरक्षा नीति' : 'Privacy & Personal Data Policy')}
        </h1>
        <p className="text-xs text-slate-400">
          JFZ — Jeevan Fit Zone • Last updated: October 2026
        </p>
      </div>

      {activeType === 'terms' ? (
        <div className="p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-5 text-xs text-slate-300 leading-relaxed shadow-xl">
          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-lime-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>1. Educational Nature of Video Content</span>
            </h3>
            <p>
              All video lessons, exercise descriptions, and hybrid training plans provided in JFZ — Jeevan Fit Zone are for informational and athletic educational purposes only. Online videos alone do not qualify any user for belt ranks, official certifications, or competition licensing in Pencak Silat, Judo, or athletics. Official rank grading requires certified in-person club evaluation.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>2. Supervised Martial Arts Practice & Safety Mandate</span>
            </h3>
            <p>
              Pencak Silat and Kodokan Judo are traditional combat disciplines that involve balance shifts, evasions, falling, and partner interactions. Users must NEVER practice dangerous throws, submissions, or full-contact sparring without qualified in-person coaches, approved tatami mats, and protective equipment. Do not practice risky techniques on untrained persons.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              3. Physical Health Disclaimer & Exercise Cease
            </h3>
            <p>
              Before starting any physical conditioning, running, or martial arts program, consult with a qualified medical physician to evaluate your readiness. Stop training immediately if you experience dizziness, sharp joint pain, chest tightness, or unusual symptoms. JFZ and founder Jeevan Chauhan prescribe balanced progression and are not liable for reckless or unsupervised training.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              4. User Accounts & Integrity
            </h3>
            <p>
              Users are responsible for maintaining the confidentiality of their credentials. You agree to input accurate training records and refrain from unauthorized attempts to modify application source data or breach administrator roles.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-5 text-xs text-slate-300 leading-relaxed shadow-xl">
          {/* Section 1 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-lime-400 uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>1. Minimalist Data Collection</span>
            </h3>
            <p>
              JFZ — Jeevan Fit Zone collects only the bare minimum data required to deliver your training experience: your name, email address, selected language preference, workout logs, and saved video favorites. We DO NOT ask for unnecessary sensitive health data or financial information.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              2. Firebase Firestore & Authentication Security
            </h3>
            <p>
              Authentication is managed via Google Firebase Authentication. Your workout logs and profile are stored within Google Cloud Firestore and protected by Attribute-Based Access Control (ABAC) security rules ensuring that only you (and the head instructor for platform maintenance) can view your personal progress logs.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              3. Account & Data Deletion
            </h3>
            <p>
              You maintain full ownership of your data. You may request or execute immediate account deletion directly from the Profile page at any time, which permanently removes your user record and associated workout logs from Firestore.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
              4. Contact for Privacy Inquiries
            </h3>
            <p>
              For data protection questions, email coach Jeevan Chauhan at chauhanjeevan42@gmail.com.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
