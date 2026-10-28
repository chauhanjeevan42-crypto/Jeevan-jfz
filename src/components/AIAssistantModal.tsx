import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, AlertTriangle, Bot, User, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { OFFICIAL_LOGO_URL } from '../data/seedData';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { userProfile } = useAuth();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: language === 'hi'
        ? 'नमस्ते! मैं जीवन फिट ज़ोन (JFZ) का AI फिटनेस सहायक हूँ। आप मुझसे हाइब्रिड ट्रेनिंग, रनिंग, पेंचक सिलाट या जूडो के बुनियादी सिद्धांतों और व्यायाम के सही तरीके के बारे में पूछ सकते हैं। आज मैं आपकी क्या सहायता करूँ?'
        : 'Welcome! I am the JFZ AI Fitness & Sports Performance Assistant. You can ask me about hybrid training mechanics, running intervals, Pencak Silat stances, Judo Ukemi safety, or workout programming. How can I help you today?',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = language === 'hi' ? [
    'पेंचक सिलाट कुदा-कुदा का अभ्यास कैसे करें?',
    '5K रनिंग स्टैमिना कैसे बढ़ाएं?',
    'जूडो में उकेमी (गिरने की तकनीक) क्यों जरूरी है?',
    'स्क्वैट्स से पहले का सही वार्मअप क्या है?'
  ] : [
    'How to practice Pencak Silat Kuda-kuda stances?',
    'How do I build stamina for 5K running?',
    'Why is Ukemi breakfall essential in Judo?',
    'What is a safe dynamic warmup before squats?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          userProfile: {
            preferredLanguage: language,
            experienceLevel: userProfile?.experienceLevel || 'beginner',
            goals: userProfile?.trainingGoals,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Train Smart. Move Strong.',
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(
        err.message?.includes('GEMINI_API_KEY')
          ? (language === 'hi'
              ? 'सर्वर पर जेमिनी एपीआई की (GEMINI_API_KEY) सेट नहीं है। कृपया व्यवस्थापक से संपर्क करें।'
              : 'Gemini AI Assistant is not configured on this server. Please ensure GEMINI_API_KEY is provided.')
          : (language === 'hi'
              ? 'क्षमा करें, प्रतिक्रिया प्राप्त करने में समस्या हुई। कृपया पुनः प्रयास करें।'
              : 'Unable to connect to AI assistant. Please check your connection or try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#121620] border border-lime-400/30 rounded-3xl w-full max-w-lg h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-black/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-lime-400/50 bg-black">
              <img src={OFFICIAL_LOGO_URL} alt="JFZ" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-lime-400 rounded-full border border-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-white">JFZ AI Coach</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-lime-400/20 text-lime-400 font-bold uppercase">
                  Gemini
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                {language === 'hi' ? 'जीवन चौहान प्रशिक्षण मार्गदर्शक' : 'Educational Sports & Training Guide'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="px-3 py-2 bg-zinc-900/90 border-b border-white/5 flex items-center gap-2 text-[10px] text-slate-400">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {language === 'hi'
              ? 'यह केवल सामान्य खेल एवं फिटनेस शिक्षा है। यह किसी चिकित्सा या व्यक्तिगत चोट का निदान नहीं है।'
              : 'Educational sports guidance only. Not medical advice. Cease exercise if experiencing pain.'}
          </span>
        </div>

        {/* Chat message history */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-lime-400/20 text-lime-400 flex items-center justify-center shrink-0 border border-lime-400/40">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-lime-400 text-black font-medium ml-auto rounded-tr-none'
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-zinc-800 text-slate-300 flex items-center justify-center shrink-0 border border-white/10">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-lime-400 bg-white/5 p-3 rounded-2xl w-fit border border-white/5">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>{language === 'hi' ? 'कोच उत्तर तैयार कर रहे हैं...' : 'Coach is analyzing...'}</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="px-3 py-2 border-t border-white/5 bg-black/40 overflow-x-auto flex gap-1.5 no-scrollbar">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="whitespace-nowrap px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-slate-300 active:scale-95 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2">
          <input
            type="text"
            placeholder={language === 'hi' ? 'फिटनेस, रनिंग, या मार्शल आर्ट्स पर पूछें...' : 'Ask about training, running, or martial arts...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black disabled:opacity-40 active:scale-95 transition-all shadow-md shadow-lime-400/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
