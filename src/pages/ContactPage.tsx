import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Youtube, 
  Instagram, 
  Facebook, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { appSettings } = useData();

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('General Training Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;
    setIsSent(true);
    setTimeout(() => {
      setSenderName('');
      setSenderEmail('');
      setMessage('');
      setIsSent(false);
    }, 3500);
  };

  const whatsappClean = appSettings.whatsapp ? appSettings.whatsapp.replace(/[^0-9]/g, '') : '';

  return (
    <div className="space-y-6 pb-20 animate-fadeIn max-w-xl mx-auto">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#171E2D] via-[#101522] to-[#0A0D14] border border-lime-500/30 shadow-2xl space-y-2">
        <span className="px-2.5 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20 text-xs font-bold uppercase">
          {language === 'hi' ? 'संपर्क एवं सोशल मीडिया' : 'CONTACT & ACADEMY CONNECT'}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {language === 'hi' ? 'जीवन फिट ज़ोन से संपर्क करें' : 'Get in Touch with JFZ'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          {language === 'hi'
            ? 'प्रशिक्षण, वर्कशॉप या वीडियो सहयोग के लिए सीधे कोच जीवन चौहान से जुड़ें।'
            : 'Reach out for training questions, academy enrollment, or educational workshops.'}
        </p>
      </div>

      {/* Official Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Email */}
        {appSettings.email && (
          <a
            href={`mailto:${appSettings.email}`}
            className="p-4 rounded-2xl bg-[#121620] border border-white/10 hover:border-lime-400/40 flex items-center gap-3.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-lime-400/20 text-lime-400 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Email Coach</div>
              <div className="text-xs font-bold text-white truncate group-hover:text-lime-300">
                {appSettings.email}
              </div>
            </div>
          </a>
        )}

        {/* WhatsApp */}
        {whatsappClean && (
          <a
            href={`https://wa.me/${whatsappClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#121620] border border-white/10 hover:border-emerald-400/40 flex items-center gap-3.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-slate-400 uppercase font-bold">WhatsApp</div>
              <div className="text-xs font-bold text-white truncate group-hover:text-emerald-300">
                {appSettings.whatsapp}
              </div>
            </div>
          </a>
        )}

        {/* YouTube */}
        {appSettings.youtube && (
          <a
            href={appSettings.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#121620] border border-white/10 hover:border-red-500/40 flex items-center gap-3.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <Youtube className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-slate-400 uppercase font-bold">YouTube Channel</div>
              <div className="text-xs font-bold text-white truncate group-hover:text-red-300">
                Jeevan Fit Zone
              </div>
            </div>
          </a>
        )}

        {/* Instagram */}
        {appSettings.instagram && (
          <a
            href={appSettings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#121620] border border-white/10 hover:border-pink-500/40 flex items-center gap-3.5 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-slate-400 uppercase font-bold">Instagram</div>
              <div className="text-xs font-bold text-white truncate group-hover:text-pink-300">
                @jeevanfitzone
              </div>
            </div>
          </a>
        )}
      </div>

      {/* Direct Message Form */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-4 shadow-xl">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          {language === 'hi' ? 'सीधा संदेश भेजें' : 'Send an Inquiry to Jeevan Chauhan'}
        </h3>

        {isSent && (
          <div className="p-3.5 rounded-2xl bg-lime-500/10 border border-lime-500/30 text-lime-300 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
            <span>
              {language === 'hi'
                ? 'आपका संदेश सफलतापूर्वक भेजा गया! कोच जीवन चौहान जल्द उत्तर देंगे।'
                : 'Thank you! Your message has been sent to Coach Jeevan Chauhan.'}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {language === 'hi' ? 'आपका नाम' : 'Your Name'}
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Vikram"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                {language === 'hi' ? 'ईमेल पता' : 'Your Email'}
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="vikram@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {language === 'hi' ? 'विषय' : 'Inquiry Subject'}
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            >
              <option value="General Training Inquiry">General Training Inquiry</option>
              <option value="Pencak Silat Questions">Pencak Silat Academy Questions</option>
              <option value="Judo Training Guidance">Judo Training Guidance</option>
              <option value="Hybrid Conditioning Program">Hybrid Conditioning Program</option>
              <option value="Workshops & Coaching">Workshops & Personal Coaching</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {language === 'hi' ? 'संदेश' : 'Your Message'}
            </label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'hi' ? 'अपना प्रश्न या संदेश यहाँ लिखें...' : 'Write your question or request here...'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-lime-400 hover:bg-lime-300 text-black font-extrabold text-xs active:scale-95 transition-all shadow-md shadow-lime-400/20 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{language === 'hi' ? 'संदेश भेजें' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
