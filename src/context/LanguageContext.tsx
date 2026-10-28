import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  hi: {
    // Brand & Slogan
    appName: 'JFZ — जीवन फिट ज़ोन',
    tagline: 'ट्रेन स्मार्ट। मूव स्ट्रॉन्ग। लिव फिट।',
    founderTitle: 'संस्थापक एवं मुख्य प्रशिक्षक: जीवन चौहान',

    // Nav
    navHome: 'होम',
    navTraining: 'ट्रेनिंग',
    navVideos: 'वीडियो',
    navProgress: 'प्रगति',
    navProfile: 'प्रोफ़ाइल',
    navHybrid: 'हाइब्रिड ट्रेनिंग',
    navFitness: 'फिटनेस वर्कआउट्स',
    navMartialArts: 'मार्शल आर्ट्स अकादमी',
    navSilat: 'पेंचक सिलाट',
    navJudo: 'जूडो',
    navPlans: 'ट्रेनिंग प्रोग्राम्स',
    navAbout: 'जीवन चौहान के बारे में',
    navContact: 'संपर्क करें',
    navSettings: 'सेटिंग्स',
    navAdmin: 'एडमिन पैनल',
    navAiCoach: 'JFZ AI कोच',
    navPrivacy: 'गोपनीयता नीति',
    navTerms: 'नियम और शर्तें',

    // Dashboard
    greetingMorning: 'शुभ प्रभात',
    greetingAfternoon: 'शुभ दोपहर',
    greetingEvening: 'शुभ संध्या',
    athlete: 'एथलीट',
    welcomeBannerTitle: 'जीवन फिट ज़ोन (JFZ) में आपका स्वागत है',
    welcomeBannerDesc: 'हाइब्रिड एथलेटिक कंडीशनिंग, शक्ति, सहनशक्ति और पेंचक सिलाट व जूडो की दुनिया में आपका स्वागत है।',
    btnStartTraining: 'ट्रेनिंग शुरू करें',
    btnExploreVideos: 'वीडियो देखें',
    btnViewProgress: 'मेरी प्रगति देखें',
    todaysWorkout: 'आज का अनुशंसित वर्कआउट',
    startWorkout: 'वर्कआउट शुरू करें',
    weeklyActivitySummary: 'साप्ताहिक गतिविधि सारांश',
    totalWorkouts: 'कुल वर्कआउट्स',
    trainingMinutes: 'ट्रेनिंग मिनट',
    runningDistance: 'रनिंग दूरी (किमी)',
    emptyProgressTitle: 'अभी तक कोई वर्कआउट रिकॉर्ड नहीं है',
    emptyProgressDesc: 'अपना पहला वर्कआउट पूरा करें या नीचे लॉग दर्ज करें ताकि आपकी प्रगति यहाँ दिखे।',
    featuredCategories: 'ट्रेनिंग श्रेणियां',
    featuredVideosTitle: 'विशेष वीडियो पाठ',
    recommendedPlansTitle: 'अनुशंसित ट्रेनिंग प्रोग्राम्स',
    announcementsTitle: 'जीवन चौहान के संदेश व घोषणाएं',

    // Training Modules
    hybridTrainingTitle: 'हाइब्रिड एथलेटिक ट्रेनिंग',
    hybridTrainingSubtitle: 'दौड़, शक्ति, सहनशक्ति, लचीलापन और संतुलन का संपूर्ण संगम।',
    fitnessTitle: 'फिटनेस वर्कआउट्स लाइब्रेरी',
    fitnessSubtitle: 'कार्यात्मक गतिशीलता, कोर स्थिरता, और समग्र फिटनेस।',
    martialArtsTitle: 'JFZ मार्शल आर्ट्स अकादमी',
    martialArtsSubtitle: 'पेंचक सिलाट और जूडो: अनुशासन, तकनीक, सुरक्षा और संतुलन।',

    // Martial Arts Sections
    silatTitle: 'पेंचक सिलाट (Pencak Silat)',
    silatDesc: 'इंडोनेशिया की पारंपरिक मार्शल आर्ट्स जिसमें संतुलन, 8-दिशाओं का रुख, गति और आत्मरक्षा शामिल है।',
    judoTitle: 'जूडो (Judo)',
    judoDesc: 'कोडोकान जूडो: "लचीला रास्ता"। सुरक्षित गिरना (उकेमी), संतुलन बिगाड़ना (कुजुशी), और थ्रो तकनीक।',
    safetyNoticeTitle: 'सुरक्षित अभ्यास का नियम',
    safetyNoticeText: 'ऑनलाइन वीडियो केवल शैक्षिक मार्गदर्शन के लिए हैं। कभी भी खतरनाक थ्रो या तकनीकों का अभ्यास बिना प्रमाणित कोच, मैट और सुरक्षा गियर के न करें। ऑनलाइन वीडियो देखने से कोई बेल्ट या प्रमाणपत्र नहीं मिलता।',

    // Actions & Common
    viewDetails: 'विवरण देखें',
    back: 'वापस',
    close: 'बंद करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    loading: 'लोड हो रहा है...',
    completed: 'पूर्ण',
    markCompleted: 'पूर्ण चिह्नित करें',
    duration: 'अवधि',
    difficulty: 'कठिनाई',
    level: 'स्तर',
    beginner: 'आरंभिक (Beginner)',
    intermediate: 'मध्यम (Intermediate)',
    advanced: 'उन्नत (Advanced)',
    sets: 'सेट्स',
    reps: 'रेप्स',
    rest: 'विश्राम',
    safetyNotes: 'सुरक्षा निर्देश',
    commonMistakes: 'सामान्य गलतियां',
    muscleTargeted: 'लक्षित मांसपेशियां',
    searchPlaceholder: 'व्यायाम या वीडियो खोजें...',
    logWorkoutTitle: 'वर्कआउट लॉग दर्ज करें',
    personalRecords: 'व्यक्तिगत रिकॉर्ड्स (PR)',
    addRecord: 'रिकॉर्ड जोड़ें',
    signInRequired: 'कृपया व्यक्तिगत प्रगति और रिकॉर्ड सहेजने के लिए लॉगिन करें।',
    signIn: 'लॉगिन करें',
    signUp: 'साइन अप करें',
    signOut: 'लॉगआउट करें',
    guestMode: 'अतिथि के रूप में जारी रखें',
    adminAccess: 'प्रमाणित एडमिन',
  },
  en: {
    // Brand & Slogan
    appName: 'JFZ — Jeevan Fit Zone',
    tagline: 'Train Smart. Move Strong. Live Fit.',
    founderTitle: 'Founder & Head Coach: Jeevan Chauhan',

    // Nav
    navHome: 'Home',
    navTraining: 'Training',
    navVideos: 'Videos',
    navProgress: 'Progress',
    navProfile: 'Profile',
    navHybrid: 'Hybrid Training',
    navFitness: 'Fitness Workouts',
    navMartialArts: 'Martial Arts Academy',
    navSilat: 'Pencak Silat',
    navJudo: 'Judo',
    navPlans: 'Training Plans',
    navAbout: 'About Jeevan',
    navContact: 'Contact',
    navSettings: 'Settings',
    navAdmin: 'Admin Dashboard',
    navAiCoach: 'JFZ AI Coach',
    navPrivacy: 'Privacy Policy',
    navTerms: 'Terms & Conditions',

    // Dashboard
    greetingMorning: 'Good morning',
    greetingAfternoon: 'Good afternoon',
    greetingEvening: 'Good evening',
    athlete: 'Athlete',
    welcomeBannerTitle: 'Welcome to Jeevan Fit Zone',
    welcomeBannerDesc: 'Professional hybrid athletic conditioning, functional strength, endurance, and elite martial arts education.',
    btnStartTraining: 'Start Training',
    btnExploreVideos: 'Explore Videos',
    btnViewProgress: 'View My Progress',
    todaysWorkout: "Today's Featured Workout",
    startWorkout: 'Start Workout',
    weeklyActivitySummary: 'Weekly Activity Summary',
    totalWorkouts: 'Workouts',
    trainingMinutes: 'Training Min',
    runningDistance: 'Running (km)',
    emptyProgressTitle: 'No workouts logged yet',
    emptyProgressDesc: 'Complete your first workout or manually log a session below to start seeing your real training statistics.',
    featuredCategories: 'Training Disciplines',
    featuredVideosTitle: 'Featured Video Lessons',
    recommendedPlansTitle: 'Recommended Programs',
    announcementsTitle: 'Announcements by Jeevan Chauhan',

    // Training Modules
    hybridTrainingTitle: 'Hybrid Athletic Training',
    hybridTrainingSubtitle: 'Combining running, strength, endurance, mobility, and functional movement.',
    fitnessTitle: 'Fitness Workouts Library',
    fitnessSubtitle: 'Full-body conditioning, core stability, and targeted movement work.',
    martialArtsTitle: 'JFZ Martial Arts Academy',
    martialArtsSubtitle: 'Pencak Silat & Judo: discipline, movement mechanics, and athletic safety.',

    // Martial Arts Sections
    silatTitle: 'Pencak Silat',
    silatDesc: 'Indonesian cultural martial art emphasizing multi-directional footwork (Langkah), grounded stances, and agile evasion.',
    judoTitle: 'Kodokan Judo',
    judoDesc: 'The Gentle Way: Breakfalls (Ukemi), off-balancing (Kuzushi), and dynamic throwing mechanics.',
    safetyNoticeTitle: 'Supervised Training Mandate',
    safetyNoticeText: 'Online video lessons are educational references only. High-impact throws, falling, or sparring must strictly be practiced under certified in-person supervision on approved mats. Online lessons do not award ranks or certifications.',

    // Actions & Common
    viewDetails: 'View Details',
    back: 'Back',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    completed: 'Completed',
    markCompleted: 'Mark as Completed',
    duration: 'Duration',
    difficulty: 'Difficulty',
    level: 'Level',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    sets: 'Sets',
    reps: 'Reps',
    rest: 'Rest',
    safetyNotes: 'Safety Notes',
    commonMistakes: 'Common Mistakes',
    muscleTargeted: 'Muscles Targeted',
    searchPlaceholder: 'Search exercises, videos, or plans...',
    logWorkoutTitle: 'Log Workout Session',
    personalRecords: 'Personal Records (PR)',
    addRecord: 'Add Record',
    signInRequired: 'Please sign in to track personal progress and save history.',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    guestMode: 'Continue as Guest',
    adminAccess: 'Authorized Admin',
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'hi',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: () => '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is Hindi as requested
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('jfz_language');
    return (saved === 'en' || saved === 'hi') ? saved : 'hi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('jfz_language', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
