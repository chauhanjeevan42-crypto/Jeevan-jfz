import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Dumbbell, 
  Video, 
  BookOpen, 
  Bell, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  CheckCircle, 
  AlertTriangle,
  UploadCloud,
  Database,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { ExerciseItem, VideoLessonItem, AnnouncementItem, AppSettingsData } from '../types';

export const AdminPage: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const { 
    exercises, 
    videos, 
    announcements, 
    appSettings, 
    saveExercise, 
    deleteExercise, 
    saveVideo, 
    deleteVideo, 
    saveAnnouncement, 
    deleteAnnouncement, 
    saveAppSettings,
    seedDatabaseIfEmpty
  } = useData();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'overview' | 'exercises' | 'videos' | 'announcements' | 'settings'>('overview');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Exercise Form Modal
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Partial<ExerciseItem> | null>(null);

  // Video Form Modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Partial<VideoLessonItem> | null>(null);

  // Announcement Form Modal
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Partial<AnnouncementItem> | null>(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState<AppSettingsData>(appSettings);

  // Access check
  if (!currentUser || !isAdmin) {
    return (
      <div className="p-8 rounded-3xl bg-[#121620] border border-red-500/30 text-center space-y-4 max-w-md mx-auto my-12 shadow-2xl animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-white">
          {language === 'hi' ? 'अनधिकृत पहुंच (Unauthorized)' : 'Administrator Access Only'}
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {language === 'hi'
            ? 'यह क्षेत्र केवल प्रमाणित व्यवस्थापक जीवन चौहान (chauhanjeevan42@gmail.com) के लिए सुरक्षित है। आपकी साख (Credentials) को Firestore सुरक्षा नियमों द्वारा सत्यापित किया जाता है।'
            : 'This protected console is restricted to head coach Jeevan Chauhan (chauhanjeevan42@gmail.com). Firestore security rules enforce role validation.'}
        </p>
      </div>
    );
  }

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 3000);
  };

  // Handlers for Exercise
  const handleOpenExerciseModal = (ex?: ExerciseItem) => {
    setEditingExercise(ex || {
      id: `ex-${Date.now()}`,
      nameEn: '',
      nameHi: '',
      category: 'strength',
      difficulty: 'beginner',
      muscleGroups: '',
      descriptionEn: '',
      descriptionHi: '',
      instructionsEn: ['Maintain proper spinal alignment'],
      instructionsHi: ['रीढ़ की हड्डी को सीधा रखें'],
      mistakesEn: ['Avoid rushing reps'],
      mistakesHi: ['रेप्स में जल्दबाजी न करें'],
      safetyNotesEn: 'Warm up prior to loading',
      safetyNotesHi: 'अभ्यास से पूर्व वार्मअप करें',
      sets: 3,
      reps: '10-12',
      durationSec: 45,
      restSec: 45,
      videoUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      isPublished: true,
    });
    setIsExerciseModalOpen(true);
  };

  const handleSaveExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExercise?.nameEn) return;
    try {
      await saveExercise(editingExercise as ExerciseItem);
      setIsExerciseModalOpen(false);
      showFeedback('Exercise successfully saved to Firestore!');
    } catch (err: any) {
      alert('Error saving exercise: ' + err.message);
    }
  };

  const handleDeleteExercise = async (id: string) => {
    if (window.confirm('Delete this exercise from Firestore?')) {
      await deleteExercise(id);
      showFeedback('Exercise deleted.');
    }
  };

  // Handlers for Video
  const handleOpenVideoModal = (vid?: VideoLessonItem) => {
    setEditingVideo(vid || {
      id: `vid-${Date.now()}`,
      titleEn: '',
      titleHi: '',
      descriptionEn: '',
      descriptionHi: '',
      category: 'silat',
      level: 'all',
      duration: '10:00',
      instructor: 'Jeevan Chauhan',
      youtubeUrl: '',
      videoThumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
      isPublished: true,
      isFeatured: false,
    });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo?.titleEn) return;
    try {
      await saveVideo(editingVideo as VideoLessonItem);
      setIsVideoModalOpen(false);
      showFeedback('Video lesson saved to Firestore!');
    } catch (err: any) {
      alert('Error saving video: ' + err.message);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Delete this video lesson?')) {
      await deleteVideo(id);
      showFeedback('Video deleted.');
    }
  };

  // Handlers for Announcement
  const handleOpenAnnouncementModal = (ann?: AnnouncementItem) => {
    setEditingAnnouncement(ann || {
      id: `ann-${Date.now()}`,
      titleEn: '',
      titleHi: '',
      contentEn: '',
      contentHi: '',
      isPinned: false,
      date: new Date().toISOString().split('T')[0],
    });
    setIsAnnouncementModalOpen(true);
  };

  const handleSaveAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnnouncement?.titleEn) return;
    try {
      await saveAnnouncement(editingAnnouncement as AnnouncementItem);
      setIsAnnouncementModalOpen(false);
      showFeedback('Announcement published!');
    } catch (err: any) {
      alert('Error saving announcement: ' + err.message);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (window.confirm('Delete announcement?')) {
      await deleteAnnouncement(id);
      showFeedback('Announcement removed.');
    }
  };

  // Handlers for Settings
  const handleSaveSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveAppSettings(settingsForm);
      showFeedback('Brand settings updated!');
    } catch (err: any) {
      alert('Error saving settings: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Admin Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#161420] to-[#0D121B] border-2 border-amber-500/40 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
              INSTRUCTOR & ADMIN CONSOLE
            </span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Coach Jeevan Chauhan Dashboard
          </h1>
          <p className="text-xs text-slate-300">
            Authenticated via {currentUser.email} • Zero-Trust Firestore ABAC Active
          </p>
        </div>

        <button
          onClick={async () => {
            await seedDatabaseIfEmpty();
            showFeedback('Initial catalog synced to Firestore!');
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-lime-400 shrink-0 active:scale-95 transition-all"
          title="Ensure Firestore database has all foundational items"
        >
          <Database className="w-4 h-4" />
          <span>Sync Seed Catalog</span>
        </button>
      </div>

      {feedbackMsg && (
        <div className="p-3 rounded-2xl bg-lime-500/10 border border-lime-500/30 text-lime-300 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-lime-400 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-2xl bg-[#121620] border border-white/10 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: ShieldCheck },
          { id: 'exercises', label: `Exercises (${exercises.length})`, icon: Dumbbell },
          { id: 'videos', label: `Videos (${videos.length})`, icon: Video },
          { id: 'announcements', label: `Announcements (${announcements.length})`, icon: Bell },
          { id: 'settings', label: 'Brand & Contact', icon: Settings },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[110px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Exercises</div>
              <div className="text-2xl font-black text-lime-400 mt-1">{exercises.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Video Lessons</div>
              <div className="text-2xl font-black text-amber-400 mt-1">{videos.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Announcements</div>
              <div className="text-2xl font-black text-white mt-1">{announcements.length}</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#121620] border border-white/10 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Security State</div>
              <div className="text-sm font-black text-lime-400 mt-2">Zero-Trust Rules</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[#121620] border border-white/10 space-y-3">
            <h3 className="text-sm font-extrabold text-white">Quick Administration Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => { setActiveTab('exercises'); handleOpenExerciseModal(); }}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 text-left transition-all"
              >
                <div className="p-2 rounded-xl bg-lime-400/20 text-lime-400">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Add Exercise</div>
                  <div className="text-[10px] text-slate-400">Technique, sets & safety</div>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('videos'); handleOpenVideoModal(); }}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 text-left transition-all"
              >
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Add Video Lesson</div>
                  <div className="text-[10px] text-slate-400">Embed YouTube URL</div>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('announcements'); handleOpenAnnouncementModal(); }}
                className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 text-left transition-all"
              >
                <div className="p-2 rounded-xl bg-cyan-400/20 text-cyan-400">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Post Announcement</div>
                  <div className="text-[10px] text-slate-400">Message to all athletes</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXERCISES MANAGER */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Workout & Technique Exercises</h3>
            <button
              onClick={() => handleOpenExerciseModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-400 text-black font-extrabold text-xs hover:bg-lime-300"
            >
              <Plus className="w-4 h-4" />
              <span>New Exercise</span>
            </button>
          </div>

          <div className="space-y-2">
            {exercises.map((ex) => (
              <div
                key={ex.id}
                className="p-3.5 rounded-2xl bg-[#121620] border border-white/10 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-lime-400">{ex.category} • {ex.difficulty}</span>
                    {ex.isPublished ? (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">Published</span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-slate-400">Draft</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mt-0.5">{ex.nameEn} ({ex.nameHi})</h4>
                  <div className="text-[10px] text-slate-400">{ex.sets} sets × {ex.reps} • {ex.muscleGroups}</div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenExerciseModal(ex)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteExercise(ex.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VIDEOS MANAGER */}
      {activeTab === 'videos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Video Lessons Library</h3>
            <button
              onClick={() => handleOpenVideoModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300"
            >
              <Plus className="w-4 h-4" />
              <span>Add Video</span>
            </button>
          </div>

          <div className="space-y-2">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="p-3.5 rounded-2xl bg-[#121620] border border-white/10 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-11 rounded-lg overflow-hidden bg-zinc-900 shrink-0">
                    <img src={vid.videoThumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-amber-400">{vid.category} • {vid.duration}</span>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{vid.titleEn}</h4>
                    <span className="text-[10px] text-slate-500 truncate max-w-xs block">{vid.youtubeUrl}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenVideoModal(vid)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(vid.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white">Instructor Announcements</h3>
            <button
              onClick={() => handleOpenAnnouncementModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-400 text-black font-extrabold text-xs hover:bg-cyan-300"
            >
              <Plus className="w-4 h-4" />
              <span>New Announcement</span>
            </button>
          </div>

          <div className="space-y-2">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-2xl bg-[#121620] border border-white/10 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                    {ann.isPinned && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 uppercase font-bold">Pinned</span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">{ann.titleEn}</h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{ann.contentEn}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenAnnouncementModal(ann)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAnnouncement(ann.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BRAND & CONTACT SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettingsSubmit} className="p-5 sm:p-6 rounded-3xl bg-[#121620] border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Public Brand & Contact Configuration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Official Email</label>
              <input
                type="email"
                required
                value={settingsForm.email}
                onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Phone / WhatsApp</label>
              <input
                type="text"
                value={settingsForm.phone}
                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value, whatsapp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={settingsForm.youtube}
                onChange={(e) => setSettingsForm({ ...settingsForm, youtube: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Instagram URL</label>
              <input
                type="text"
                value={settingsForm.instagram}
                onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">About Bio (English)</label>
            <textarea
              rows={3}
              value={settingsForm.aboutBioEn}
              onChange={(e) => setSettingsForm({ ...settingsForm, aboutBioEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">About Bio (Hindi)</label>
            <textarea
              rows={3}
              value={settingsForm.aboutBioHi}
              onChange={(e) => setSettingsForm({ ...settingsForm, aboutBioHi: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Coaching Philosophy</label>
            <textarea
              rows={2}
              value={settingsForm.coachingPhilosophyEn}
              onChange={(e) => setSettingsForm({ ...settingsForm, coachingPhilosophyEn: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-lg shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save App Settings</span>
          </button>
        </form>
      )}

      {/* Exercise Edit Modal */}
      {isExerciseModalOpen && editingExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121620] border border-white/10 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-white">Configure Exercise</h3>

            <form onSubmit={handleSaveExerciseSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Name (English)</label>
                  <input
                    type="text"
                    required
                    value={editingExercise.nameEn || ''}
                    onChange={(e) => setEditingExercise({ ...editingExercise, nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Name (Hindi)</label>
                  <input
                    type="text"
                    required
                    value={editingExercise.nameHi || ''}
                    onChange={(e) => setEditingExercise({ ...editingExercise, nameHi: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:border-lime-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Category</label>
                  <select
                    value={editingExercise.category || 'strength'}
                    onChange={(e) => setEditingExercise({ ...editingExercise, category: e.target.value as any })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  >
                    <option value="strength">Strength</option>
                    <option value="running">Running</option>
                    <option value="bodyweight">Bodyweight</option>
                    <option value="mobility">Mobility</option>
                    <option value="silat">Pencak Silat</option>
                    <option value="judo">Judo</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Difficulty</label>
                  <select
                    value={editingExercise.difficulty || 'beginner'}
                    onChange={(e) => setEditingExercise({ ...editingExercise, difficulty: e.target.value as any })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Sets / Reps</label>
                  <input
                    type="text"
                    value={editingExercise.reps || '10 reps'}
                    onChange={(e) => setEditingExercise({ ...editingExercise, reps: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Muscle Groups</label>
                <input
                  type="text"
                  value={editingExercise.muscleGroups || ''}
                  onChange={(e) => setEditingExercise({ ...editingExercise, muscleGroups: e.target.value })}
                  placeholder="e.g. Quads, Core, Glutes"
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Safety Notes</label>
                <input
                  type="text"
                  value={editingExercise.safetyNotesEn || ''}
                  onChange={(e) => setEditingExercise({ ...editingExercise, safetyNotesEn: e.target.value, safetyNotesHi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExerciseModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-lime-400 text-black font-extrabold text-xs"
                >
                  Save Exercise
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Edit Modal */}
      {isVideoModalOpen && editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121620] border border-white/10 rounded-3xl w-full max-w-lg p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-white">Configure Video Lesson</h3>

            <form onSubmit={handleSaveVideoSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Lesson Title (English)</label>
                <input
                  type="text"
                  required
                  value={editingVideo.titleEn || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, titleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Lesson Title (Hindi)</label>
                <input
                  type="text"
                  required
                  value={editingVideo.titleHi || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, titleHi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">YouTube URL</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={editingVideo.youtubeUrl || ''}
                  onChange={(e) => setEditingVideo({ ...editingVideo, youtubeUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Category</label>
                  <select
                    value={editingVideo.category || 'silat'}
                    onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value as any })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  >
                    <option value="silat">Pencak Silat</option>
                    <option value="judo">Judo</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="strength">Strength</option>
                    <option value="mobility">Mobility</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingVideo.duration || '12:00'}
                    onChange={(e) => setEditingVideo({ ...editingVideo, duration: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Instructor</label>
                  <input
                    type="text"
                    value={editingVideo.instructor || 'Jeevan Chauhan'}
                    onChange={(e) => setEditingVideo({ ...editingVideo, instructor: e.target.value })}
                    className="w-full px-2 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs"
                >
                  Save Video Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Edit Modal */}
      {isAnnouncementModalOpen && editingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121620] border border-white/10 rounded-3xl w-full max-w-lg p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-white">Create Announcement</h3>

            <form onSubmit={handleSaveAnnouncementSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Title (English)</label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.titleEn || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, titleEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Title (Hindi)</label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.titleHi || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, titleHi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Content (English)</label>
                <textarea
                  rows={3}
                  required
                  value={editingAnnouncement.contentEn || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, contentEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Content (Hindi)</label>
                <textarea
                  rows={3}
                  required
                  value={editingAnnouncement.contentHi || ''}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, contentHi: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-400 text-black font-extrabold text-xs"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
