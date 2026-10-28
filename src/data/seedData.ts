import { ExerciseItem, WorkoutSession, TrainingProgramPlan, VideoLessonItem, AnnouncementItem, AppSettingsData } from '../types';

export const OFFICIAL_LOGO_URL = '/assets/aistudio/1000139092_enhanced.jpg_b23ec628.png';

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    titleEn: 'Welcome to JFZ — Jeevan Fit Zone Academy',
    titleHi: 'JFZ — जीवन फिट ज़ोन अकादमी में आपका स्वागत है',
    contentEn: 'Our mission is to help athletes, martial artists, and fitness enthusiasts build functional strength, mobility, and unbreakable discipline. Check out our new Hybrid Foundation and Martial Arts modules!',
    contentHi: 'हमारा उद्देश्य हर एथलीट और फिटनेस प्रेमी को कार्यात्मक शक्ति, लचीलापन और अटूट अनुशासन देना है। हमारे नए हाइब्रिड फाउंडेशन और मार्शल आर्ट्स मॉड्यूल्स जरूर देखें!',
    isPinned: true,
    date: '2026-10-28',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'ann-2',
    titleEn: 'Safety First in Martial Arts Practice',
    titleHi: 'मार्शल आर्ट्स अभ्यास में सुरक्षा सर्वोपरि',
    contentEn: 'Please remember: Online video lessons are educational guides. Never practice high-impact throws or full-contact sparring without mats, certified in-person coaches, and proper safety equipment.',
    contentHi: 'कृपया ध्यान दें: ऑनलाइन वीडियो केवल शैक्षिक मार्गदर्शन के लिए हैं। बिना मैट, प्रमाणित कोच और सुरक्षात्मक गियर के कभी भी जोखिम भरे थ्रो या स्पैरिंग का अभ्यास न करें।',
    isPinned: false,
    date: '2026-10-25',
    createdAt: new Date().toISOString(),
  }
];

export const INITIAL_APP_SETTINGS: AppSettingsData = {
  email: 'chauhanjeevan42@gmail.com',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  youtube: 'https://youtube.com/@JeevanFitZone',
  instagram: 'https://instagram.com/jeevanfitzone',
  facebook: 'https://facebook.com/jeevanfitzone',
  aboutBioEn: 'Jeevan Chauhan is a dedicated fitness trainer, athletic conditioning specialist, and martial arts practitioner specializing in Pencak Silat and Judo. Through JFZ, he blends traditional combat discipline with modern sports science, hybrid conditioning, and functional movement.',
  aboutBioHi: 'जीवन चौहान एक समर्पित फिटनेस ट्रेनर, एथलेटिक कंडीशनिंग विशेषज्ञ और मार्शल आर्ट्स (पेंचक सिलाट व जूडो) के अभ्यासी हैं। JFZ के माध्यम से वे पारंपरिक युद्ध कला अनुशासन को आधुनिक खेल विज्ञान और हाइब्रिड ट्रेनिंग से जोड़ते हैं।',
  coachingPhilosophyEn: 'Train Smart. Move Strong. Live Fit. We prioritize movement mechanics, progressive overload, injury resilience, and mental fortitude over short-term shortcuts.',
  coachingPhilosophyHi: 'ट्रेन स्मार्ट। मूव स्ट्रॉन्ग। लिव फिट। हम शॉर्टकट के बजाय सही तकनीक, सुरक्षित प्रगति, चोट से बचाव और मानसिक दृढ़ता को प्राथमिकता देते हैं।',
  achievementsEn: 'National martial arts athlete, certified conditioning specialist, founder of Jeevan Fit Zone training academy.',
  achievementsHi: 'राष्ट्रीय स्तर के मार्शल आर्ट्स एथलीट, प्रमाणित कंडीशनिंग कोच, जीवन फिट ज़ोन अकादमी के संस्थापक।',
  updatedAt: new Date().toISOString(),
};

export const INITIAL_EXERCISES: ExerciseItem[] = [
  {
    id: 'ex-1',
    nameEn: 'Pencak Silat Kuda-Kuda (Stance Flow)',
    nameHi: 'पेंचक सिलाट कुदा-कुदा (स्टांस फ्लो)',
    category: 'silat',
    difficulty: 'beginner',
    muscleGroups: 'Quadriceps, Glutes, Adductors, Core',
    descriptionEn: 'The foundational base of Pencak Silat. Strengthens lower body stability, weight distribution, and readiness to move in 8 compass directions.',
    descriptionHi: 'पेंचक सिलाट का मूल आधार। पैरों की स्थिरता, वजन का संतुलन और 8 दिशाओं में त्वरित गति की तैयारी को मजबूत करता है।',
    instructionsEn: [
      'Sink hips low into a wide horse stance (Kuda-Kuda Tengah).',
      'Keep your spine erect and chest open, hands up in guarded position.',
      'Transition smoothly from front stance (Depan) to side and back stance.',
      'Breathe rhythmically and maintain ground contact.'
    ],
    instructionsHi: [
      'पैरों को चौड़ा रखकर कूल्हों को नीचे लाएं (कुदा-कुदा तेंगह)।',
      'रीढ़ सीधी रखें, सीना खुला और हाथ रक्षात्मक मुद्रा में रखें।',
      'सामने के रुख से साइड और पिछले रुख में संतुलन के साथ बदलें।',
      'नियमित सांस लें और जमीन पर पकड़ बनाए रखें।'
    ],
    mistakesEn: ['Knees caving inwards', 'Hunching shoulders forward', 'Rising too high between shifts'],
    mistakesHi: ['घुटनों का अंदर की ओर झुकना', 'कंधों को आगे झुकाना', 'रुख बदलते समय बहुत ऊंचा उठना'],
    safetyNotesEn: 'Warm up hip flexors and ankles thoroughly. Rest if knee pressure is felt.',
    safetyNotesHi: 'अभ्यास से पहले कूल्हों और टखनों का अच्छा वार्मअप करें। घुटने में दर्द होने पर रुकें।',
    sets: 3,
    reps: '45 seconds',
    durationSec: 45,
    restSec: 30,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
  },
  {
    id: 'ex-2',
    nameEn: 'Judo Ukemi (Breakfall Conditioning)',
    nameHi: 'जूडो उकेमी (सुरक्षित गिरने का अभ्यास)',
    category: 'judo',
    difficulty: 'beginner',
    muscleGroups: 'Core, Neck Stabilizers, Lats, Shoulders',
    descriptionEn: 'The art of falling safely without injury. Essential for every martial artist to protect the spine, wrists, and head.',
    descriptionHi: 'बिना चोट खाए सुरक्षित रूप से गिरने की कला। रीढ़, कलाई और सिर की सुरक्षा के लिए अनिवार्य तकनीक।',
    instructionsEn: [
      'Begin seated or squatting low on a padded training mat.',
      'Tuck your chin firmly against your chest to protect the head.',
      'Roll back smoothly along the curve of your spine.',
      'Slap the mat firmly with both palms and forearms at a 45-degree angle simultaneously.'
    ],
    instructionsHi: [
      'मैट पर नीचे बैठकर या स्क्वैट स्थिति में शुरू करें।',
      'सिर को बचाने के लिए अपनी ठुड्डी को सीने से सटाकर रखें।',
      'रीढ़ की हड्डी के घुमाव पर धीरे से पीछे रोल करें।',
      'दोनों हथेलियों और बांहों से 45 डिग्री के कोण पर मैट पर जोरदार स्लैप करें।'
    ],
    mistakesEn: ['Letting head hit the ground', 'Landing flat with elbows bent backward', 'Reaching with stiff arms'],
    mistakesHi: ['सिर को जमीन से टकराने देना', 'कोहनियों को पीछे मोड़कर गिरना', 'सीधे सख्त हाथों से जमीन छूना'],
    safetyNotesEn: 'Must be performed ONLY on a quality crash mat or tatami. Never perform on concrete or hard floors.',
    safetyNotesHi: 'केवल उचित जूडो मैट या टाटामी पर ही अभ्यास करें। कंक्रीट या सख्त फर्श पर कभी न करें।',
    sets: 4,
    reps: '10 rolls',
    durationSec: 60,
    restSec: 45,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
  },
  {
    id: 'ex-3',
    nameEn: 'Hybrid Interval Sprints (Aerobic Engine)',
    nameHi: 'हाइब्रिड इंटरवल स्प्रिंट (एरोबिक इंजन)',
    category: 'running',
    difficulty: 'intermediate',
    muscleGroups: 'Hamstrings, Calves, Quadriceps, Cardiovascular System',
    descriptionEn: 'High intensity interval run designed to maximize VO2 max, sprint recovery rate, and athletic stamina.',
    descriptionHi: 'उच्च तीव्रता वाला इंटरवल रन जो VO2 मैक्स, गति और एथलेटिक स्टैमिना को बढ़ाने के लिए तैयार किया गया है।',
    instructionsEn: [
      'Perform a 5-minute dynamic running drill warm-up.',
      'Sprint at 85-90% effort for 30 seconds maintaining upright posture.',
      'Jog slowly or walk for 60 seconds of active recovery.',
      'Repeat for the prescribed number of rounds.'
    ],
    instructionsHi: [
      '5 मिनट का डायनामिक रनिंग ड्रिल वार्मअप करें।',
      'शरीर को सीधा रखते हुए 30 सेकंड तक 85-90% क्षमता से तेज दौड़ें।',
      'रिकवरी के लिए 60 सेकंड धीमी जॉगिंग या वॉक करें।',
      'निर्धारित राउंड्स पूरे करें।'
    ],
    mistakesEn: ['Starting with a 100% all-out sprint without warm-up', 'Slouching when fatigued', 'Stopping dead still after sprint'],
    mistakesHi: ['बिना वार्मअप के 100% तेज दौड़ना', 'थकने पर झुकना', 'स्प्रिंट के तुरंत बाद अचानक बैठ जाना'],
    safetyNotesEn: 'Wear proper running shoes. Hydrate well. Cease if you feel chest pain or dizziness.',
    safetyNotesHi: 'अच्छे रनिंग जूते पहनें। पर्याप्त पानी पिएं। चक्कर या सीने में तकलीफ पर तुरंत रुकें।',
    sets: 6,
    reps: '30s sprint / 60s rest',
    durationSec: 30,
    restSec: 60,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
  },
  {
    id: 'ex-4',
    nameEn: 'Kettlebell Goblet Squat',
    nameHi: 'केटलबेल गॉब्लेट स्क्वैट',
    category: 'strength',
    difficulty: 'beginner',
    muscleGroups: 'Quads, Glutes, Core, Upper Back',
    descriptionEn: 'Superior strength foundation movement for athletic hip drive, deep knee flexion, and thoracic posture.',
    descriptionHi: 'कूल्हों की ताकत, घुटनों के लचीलेपन और पीठ की सीधी मुद्रा के लिए बेहतरीन शक्ति व्यायाम।',
    instructionsEn: [
      'Hold a kettlebell or dumbbell close to your chest at collarbone level.',
      'Set feet slightly wider than shoulder-width, toes turned 15-30 degrees out.',
      'Hinge hips back and descend between knees keeping chest proud.',
      'Drive feet into floor and stand tall, exhaling at the top.'
    ],
    instructionsHi: [
      'केटलबेल या डंबल को सीने के करीब कॉलरबोन स्तर पर दोनों हाथों से पकड़ें।',
      'पैरों को कंधों से थोड़ा चौड़ा रखें, पंजों को हल्का बाहर की ओर मोड़ें।',
      'कूल्हों को पीछे करते हुए नीचे बैठें और सीना सीधा रखें।',
      'पैरों से जमीन को दबाकर ऊपर उठें और सांस छोड़ें।'
    ],
    mistakesEn: ['Heels lifting off ground', 'Rounding the lower spine', 'Holding breath'],
    mistakesHi: ['एड़ियों का जमीन से उठना', 'पीठ के निचले हिस्से को मोड़ना', 'सांस रोककर रखना'],
    safetyNotesEn: 'Start with light weight to master depth before adding load.',
    safetyNotesHi: 'वजन बढ़ाने से पहले हल्की लोड पर सही गहराई का अभ्यास करें।',
    sets: 3,
    reps: '12 reps',
    durationSec: 45,
    restSec: 60,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
  },
  {
    id: 'ex-5',
    nameEn: 'Hollow Body Hold & Rock',
    nameHi: 'होलो बॉडी होल्ड (कोर स्टेबिलिटी)',
    category: 'bodyweight',
    difficulty: 'intermediate',
    muscleGroups: 'Rectus Abdominis, Transverse Abdominis, Hip Flexors',
    descriptionEn: 'Gymnastic and martial arts core tension builder for transferring kinetic force.',
    descriptionHi: 'जिमनास्टिक और मार्शल आर्ट्स में प्रयुक्त कोर व्यायाम, जो पूरे शरीर में ऊर्जा संचरण को बढ़ाता है।',
    instructionsEn: [
      'Lie flat on back with arms extended overhead and legs straight.',
      'Press lower back firmly into the floor so there is zero gap.',
      'Lift shoulders and legs 4-6 inches off the floor creating a shallow banana curve.',
      'Hold the braced position while breathing controlled breaths.'
    ],
    instructionsHi: [
      'पीठ के बल लेटें, हाथ सिर के ऊपर सीधे और पैर सीधे रखें।',
      'कमर के निचले हिस्से को जमीन पर मजबूती से दबाएं ताकि कोई खाली जगह न रहे।',
      'कंधों और पैरों को जमीन से 4-6 इंच ऊपर उठाएं।',
      'पेट को सख्त रखते हुए नियंत्रित सांस लें।'
    ],
    mistakesEn: ['Arching lower back off floor', 'Jerking the neck', 'Holding breath'],
    mistakesHi: ['कमर का जमीन से उठ जाना', 'गर्दन को झटका देना', 'सांस रोक लेना'],
    safetyNotesEn: 'If lower back arches, bend knees toward chest to reduce leverage.',
    safetyNotesHi: 'यदि कमर उठने लगे, तो घुटने सीने की ओर मोड़कर सहारा लें।',
    sets: 3,
    reps: '30 seconds',
    durationSec: 30,
    restSec: 45,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
  },
  {
    id: 'ex-6',
    nameEn: 'Full 90/90 Hip Mobility Flow',
    nameHi: '90/90 हिप मोबिलिटी फ्लो (लचीलापन)',
    category: 'mobility',
    difficulty: 'beginner',
    muscleGroups: 'Hip Capsule, Piriformis, Gluteus Medius, Psoas',
    descriptionEn: 'Essential hip internal and external rotation recovery drill for combat athletes and runners.',
    descriptionHi: 'कूल्हों के आंतरिक और बाहरी लचीलेपन को सुधारने के लिए धावकों और मार्शल आर्ट्स खिलाड़ियों का जरूरी अभ्यास।',
    instructionsEn: [
      'Sit on floor with front leg bent at 90 degrees and back leg bent at 90 degrees.',
      'Keep spine tall, hinging slightly over front shin to feel gentle stretch in hip.',
      'Hold 5 seconds, then without hands touch floor if possible, pivot knees to opposite side.',
      'Repeat with slow, controlled transitions.'
    ],
    instructionsHi: [
      'जमीन पर बैठें, आगे का पैर 90 डिग्री और पीछे का पैर 90 डिग्री पर रखें।',
      'रीढ़ सीधी रखें और आगे के पैर पर हल्का झुककर खिंचाव महसूस करें।',
      '5 सेकंड रुकें, फिर घुटनों को दूसरी तरफ मोड़ें।',
      'धीमी और नियंत्रित गति से दोनों तरफ दोहराएं।'
    ],
    mistakesEn: ['Slumping through lower back', 'Forcing painful knee torque'],
    mistakesHi: ['पीठ को झुकाकर बैठना', 'घुटने पर अत्यधिक दबाव डालना'],
    safetyNotesEn: 'Move within a pain-free range. Never force stiffness into pain.',
    safetyNotesHi: 'केवल बिना दर्द के आरामदायक सीमा में ही खिंचाव दें।',
    sets: 2,
    reps: '10 switches',
    durationSec: 60,
    restSec: 30,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
  }
];

export const INITIAL_WORKOUTS: WorkoutSession[] = [
  {
    id: 'wo-1',
    titleEn: 'Hybrid Engine: Speed & Lower Power',
    titleHi: 'हाइब्रिड इंजन: गति और लोअर बॉडी पावर',
    descriptionEn: 'A balanced combination of interval sprints, goblet squats, and core stability to build a strong athletic engine.',
    descriptionHi: 'स्प्रिंट इंटरवल, गॉब्लेट स्क्वैट और कोर स्टेबिलिटी का बेहतरीन तालमेल जो एक मजबूत एथलेटिक इंजन बनाता है।',
    category: 'hybrid',
    level: 'intermediate',
    estimatedMinutes: 35,
    exercises: [
      { exerciseId: 'ex-4', nameEn: 'Kettlebell Goblet Squat', nameHi: 'केटलबेल गॉब्लेट स्क्वैट', sets: 4, reps: '12 reps', restSec: 60, durationSec: 45 },
      { exerciseId: 'ex-3', nameEn: 'Hybrid Interval Sprints', nameHi: 'हाइब्रिड इंटरवल स्प्रिंट', sets: 5, reps: '30s sprint', restSec: 60, durationSec: 30 },
      { exerciseId: 'ex-5', nameEn: 'Hollow Body Hold', nameHi: 'होलो बॉडी होल्ड', sets: 3, reps: '30s hold', restSec: 45, durationSec: 30 },
      { exerciseId: 'ex-6', nameEn: '90/90 Hip Mobility Flow', nameHi: '90/90 हिप मोबिलिटी फ्लो', sets: 2, reps: '8 switches', restSec: 30, durationSec: 60 }
    ],
    isSample: true,
    isPublished: true,
  },
  {
    id: 'wo-2',
    titleEn: 'Pencak Silat: Footwork & Core Foundation',
    titleHi: 'पेंचक सिलाट: फुटवर्क और कोर फाउंडेशन',
    descriptionEn: 'Mastering the 8 compass directions, stance transitions, lower body endurance, and trunk rigidity.',
    descriptionHi: '8 दिशाओं में फुटवर्क, स्टांस ट्रांजिशन, पैरों की सहनशक्ति और कोर मजबूती का संपूर्ण अभ्यास।',
    category: 'martial_arts',
    level: 'beginner',
    estimatedMinutes: 30,
    exercises: [
      { exerciseId: 'ex-1', nameEn: 'Pencak Silat Kuda-Kuda Flow', nameHi: 'पेंचक सिलाट कुदा-कुदा फ्लो', sets: 4, reps: '45 seconds', restSec: 30, durationSec: 45 },
      { exerciseId: 'ex-5', nameEn: 'Hollow Body Hold', nameHi: 'होलो बॉडी होल्ड', sets: 3, reps: '30s hold', restSec: 45, durationSec: 30 },
      { exerciseId: 'ex-6', nameEn: '90/90 Hip Mobility Flow', nameHi: '90/90 हिप मोबिलिटी फ्लो', sets: 2, reps: '10 switches', restSec: 30, durationSec: 60 }
    ],
    isSample: true,
    isPublished: true,
  },
  {
    id: 'wo-3',
    titleEn: 'Judo Athlete: Breakfall & Grip Conditioning',
    titleHi: 'जूडो एथलीट: सुरक्षित फॉल और ग्रिप कंडीशनिंग',
    descriptionEn: 'Essential safety training for throwing arts: Ukemi rolls, rotational core stability, and hip opening.',
    descriptionHi: 'जूडो के लिए अनिवार्य सुरक्षा प्रशिक्षण: उकेमी रोल्स, रोटेशनल कोर स्टेबिलिटी और हिप ओपनिंग।',
    category: 'martial_arts',
    level: 'beginner',
    estimatedMinutes: 25,
    exercises: [
      { exerciseId: 'ex-2', nameEn: 'Judo Ukemi Breakfall Drills', nameHi: 'जूडो उकेमी ब्रेकफॉल ड्रिल्स', sets: 4, reps: '10 rolls', restSec: 45, durationSec: 60 },
      { exerciseId: 'ex-4', nameEn: 'Kettlebell Goblet Squat', nameHi: 'केटलबेल गॉब्लेट स्क्वैट', sets: 3, reps: '10 reps', restSec: 60, durationSec: 45 },
      { exerciseId: 'ex-6', nameEn: '90/90 Hip Mobility Flow', nameHi: '90/90 हिप मोबिलिटी फ्लो', sets: 2, reps: '8 switches', restSec: 30, durationSec: 60 }
    ],
    isSample: true,
    isPublished: true,
  }
];

export const INITIAL_TRAINING_PLANS: TrainingProgramPlan[] = [
  {
    id: 'plan-1',
    titleEn: 'Hybrid Athlete Foundation (4 Weeks)',
    titleHi: 'हाइब्रिड एथलीट फाउंडेशन (4 सप्ताह)',
    descriptionEn: 'A structured blueprint combining strength training, aerobic running intervals, and dynamic recovery for all-around fitness.',
    descriptionHi: 'शक्ति प्रशिक्षण, एरोबिक रनिंग इंटरवल और रिकवरी का संतुलित 4-सप्ताह का एथलेटिक ब्लूप्रिंट।',
    category: 'hybrid',
    level: 'beginner',
    totalWeeks: 4,
    isPublished: true,
    isSample: true,
    schedule: [
      {
        week: 1,
        focusEn: 'Movement Quality & Aerobic Base',
        focusHi: 'मूवमेंट की गुणवत्ता और एरोबिक आधार',
        days: [
          { day: 1, titleEn: 'Lower Body Strength & Core', titleHi: 'लोअर बॉडी स्ट्रेंथ व कोर', durationMinutes: 35, restDay: false },
          { day: 2, titleEn: 'Easy Aerobic Run (3 km)', titleHi: 'आसान एरोबिक रन (3 किमी)', durationMinutes: 25, restDay: false },
          { day: 3, titleEn: 'Active Recovery & Mobility', titleHi: 'एक्टिव रिकवरी व मोबिलिटी', durationMinutes: 20, restDay: false },
          { day: 4, titleEn: 'Full Body Conditioning', titleHi: 'फुल बॉडी कंडीशनिंग', durationMinutes: 35, restDay: false },
          { day: 5, titleEn: 'Interval Running Drills', titleHi: 'इंटरवल रनिंग ड्रिल्स', durationMinutes: 30, restDay: false },
          { day: 6, titleEn: 'Dynamic Hip & Spine Flow', titleHi: 'डायनामिक हिप व स्पाइन फ्लो', durationMinutes: 25, restDay: false },
          { day: 7, titleEn: 'Full Rest Day', titleHi: 'पूर्ण विश्राम दिवस', durationMinutes: 0, restDay: true }
        ]
      },
      {
        week: 2,
        focusEn: 'Progressive Intensity & Work Capacity',
        focusHi: 'प्रगतिशील तीव्रता व कार्य क्षमता',
        days: [
          { day: 1, titleEn: 'Strength & Core Tempo', titleHi: 'स्ट्रेंथ व कोर टेम्पो', durationMinutes: 40, restDay: false },
          { day: 2, titleEn: 'Tempo Run (4 km)', titleHi: 'टेम्पो रन (4 किमी)', durationMinutes: 30, restDay: false },
          { day: 3, titleEn: 'Mobility & Joint Health', titleHi: 'मोबिलिटी व जोड़ों का स्वास्थ्य', durationMinutes: 20, restDay: false },
          { day: 4, titleEn: 'Hybrid Circuit Training', titleHi: 'हाइब्रिड सर्किट ट्रेनिंग', durationMinutes: 40, restDay: false },
          { day: 5, titleEn: 'Sprint Repeats (6x30s)', titleHi: 'स्प्रिंट रिपीट्स (6x30s)', durationMinutes: 30, restDay: false },
          { day: 6, titleEn: 'Yoga & Foam Rolling', titleHi: 'योग व फोम रोलिंग', durationMinutes: 25, restDay: false },
          { day: 7, titleEn: 'Full Rest Day', titleHi: 'पूर्ण विश्राम दिवस', durationMinutes: 0, restDay: true }
        ]
      }
    ]
  },
  {
    id: 'plan-2',
    titleEn: 'Pencak Silat Fundamentals (4 Weeks)',
    titleHi: 'पेंचक सिलाट फंडामेंटल्स (4 सप्ताह)',
    descriptionEn: 'Introduction to Indonesian traditional martial arts: stances (Kuda-kuda), 8-direction steps, defense blocks, and martial conditioning.',
    descriptionHi: 'पारंपरिक मार्शल आर्ट्स की शुरुआत: स्टांस (कुदा-कुदा), 8 दिशाओं के कदम, डिफेंस ब्लॉक्स और कंडीशनिंग।',
    category: 'silat',
    level: 'beginner',
    totalWeeks: 4,
    isPublished: true,
    isSample: true,
    schedule: [
      {
        week: 1,
        focusEn: 'Stances & Grounded Balance',
        focusHi: 'स्टांस और जमीनी संतुलन',
        days: [
          { day: 1, titleEn: 'Kuda-Kuda Depan & Tengah', titleHi: 'कुदा-कुदा देपन व तेंगह', durationMinutes: 30, restDay: false },
          { day: 2, titleEn: 'Leg Conditioning & Squats', titleHi: 'पैरों की कंडीशनिंग व स्क्वैट्स', durationMinutes: 25, restDay: false },
          { day: 3, titleEn: 'Rest & Hip Flexor Stretch', titleHi: 'विश्राम व हिप स्ट्रेच', durationMinutes: 15, restDay: false },
          { day: 4, titleEn: 'Pola Langkah (Step Patterns)', titleHi: 'पोला लांग्काह (स्टेप पैटर्न्स)', durationMinutes: 30, restDay: false },
          { day: 5, titleEn: 'Core Stability & Holds', titleHi: 'कोर स्टेबिलिटी व होल्ड्स', durationMinutes: 25, restDay: false },
          { day: 6, titleEn: 'Technique Revision & Flow', titleHi: 'तकनीक रिवीजन व फ्लो', durationMinutes: 30, restDay: false },
          { day: 7, titleEn: 'Full Rest Day', titleHi: 'पूर्ण विश्राम दिवस', durationMinutes: 0, restDay: true }
        ]
      }
    ]
  },
  {
    id: 'plan-3',
    titleEn: 'Judo Fundamentals & Breakfalls (4 Weeks)',
    titleHi: 'जूडो फंडामेंटल्स और उकेमी (4 सप्ताह)',
    descriptionEn: 'Learn essential falling skills (Ukemi), posture (Shisei), movement (Shintai), and basic off-balancing (Kuzushi) safely on mats.',
    descriptionHi: 'सुरक्षित गिरने की कला (उकेमी), सही पोस्चर (शिसेई), गति (शिंताई) और बुनियादी कुजुशी का सुरक्षित अभ्यास।',
    category: 'judo',
    level: 'beginner',
    totalWeeks: 4,
    isPublished: true,
    isSample: true,
    schedule: [
      {
        week: 1,
        focusEn: 'Ukemi: Safe Falling & Core Bracing',
        focusHi: 'उकेमी: सुरक्षित गिरना व कोर ब्रेसिंग',
        days: [
          { day: 1, titleEn: 'Ushiro Ukemi (Back Breakfall)', titleHi: 'उशिरो उकेमी (पीछे गिरना)', durationMinutes: 25, restDay: false },
          { day: 2, titleEn: 'Grip & Rotator Cuff Strength', titleHi: 'ग्रिप व शोल्डर स्ट्रेंथ', durationMinutes: 25, restDay: false },
          { day: 3, titleEn: 'Yoko Ukemi (Side Breakfall)', titleHi: 'योको उकेमी (साइड ब्रेकफॉल)', durationMinutes: 25, restDay: false },
          { day: 4, titleEn: 'Rest & Spinal Mobility', titleHi: 'विश्राम व स्पाइन मोबिलिटी', durationMinutes: 20, restDay: false },
          { day: 5, titleEn: 'Mae Mawari Ukemi (Forward Roll)', titleHi: 'माए मावारी उकेमी (फॉरवर्ड रोल)', durationMinutes: 30, restDay: false },
          { day: 6, titleEn: 'Kuzushi Drills with Bands', titleHi: 'रेजिस्टेंस बैंड कुजुशी ड्रिल्स', durationMinutes: 25, restDay: false },
          { day: 7, titleEn: 'Full Rest Day', titleHi: 'पूर्ण विश्राम दिवस', durationMinutes: 0, restDay: true }
        ]
      }
    ]
  }
];

export const INITIAL_VIDEOS: VideoLessonItem[] = [
  {
    id: 'vid-1',
    titleEn: 'Pencak Silat Kuda-Kuda: 6 Foundational Stances Explained',
    titleHi: 'पेंचक सिलाट कुदा-कुदा: 6 बुनियादी स्टांस का विश्लेषण',
    descriptionEn: 'Instructor Jeevan Chauhan explains correct weight distribution, foot alignment, and transitions between Kuda-Kuda Depan, Belakang, Tengah, and Samping.',
    descriptionHi: 'प्रशिक्षक जीवन चौहान कुदा-कुदा देपन, बेलाकांग, तेंगह और सम्पिंग के बीच सही वजन वितरण और पैरों के संतुलन को समझाते हैं।',
    category: 'silat',
    level: 'beginner',
    duration: '12:45',
    instructor: 'Jeevan Chauhan',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    videoThumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'vid-2',
    titleEn: 'Judo Ukemi: How to Protect Your Head & Spine During Throws',
    titleHi: 'जूडो उकेमी: थ्रो के दौरान सिर और रीढ़ की सुरक्षा कैसे करें',
    descriptionEn: 'Step-by-step masterclass on breakfalls. Learn chin tucking, arm slap angles, and mat rolling to prevent injuries during throws.',
    descriptionHi: 'सुरक्षित गिरने पर स्टेप-बाय-स्टेप मास्टरक्लास। थ्रो के दौरान चोटों से बचने के लिए चिन टकिंग और मैट स्लैपिंग तकनीक सीखें।',
    category: 'judo',
    level: 'beginner',
    duration: '15:20',
    instructor: 'Jeevan Chauhan',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    videoThumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'vid-3',
    titleEn: 'Hybrid Athlete Conditioning: Building Speed, Strength & Endurance',
    titleHi: 'हाइब्रिड एथलीट कंडीशनिंग: गति, शक्ति और सहनशक्ति का निर्माण',
    descriptionEn: 'Discover the JFZ methodology combining strength training, explosive plyometrics, and running mechanics without burning out.',
    descriptionHi: 'शक्ति प्रशिक्षण, प्लायोमेट्रिक्स और रनिंग मैकेनिक्स को बिना थके संतुलित करने की JFZ कार्यप्रणाली जानें।',
    category: 'hybrid',
    level: 'intermediate',
    duration: '18:10',
    instructor: 'Jeevan Chauhan',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    videoThumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'vid-4',
    titleEn: 'Pre-Workout Dynamic Warmup & Hip Capsule Mobility',
    titleHi: 'प्री-वर्कआउट डायनामिक वार्मअप और हिप मोबिलिटी',
    descriptionEn: '10-minute dynamic routine to unlock tight hips, activate glutes, and prepare your nervous system for high performance.',
    descriptionHi: 'टाइट हिप्स को खोलने, ग्लूट्स को सक्रिय करने और उच्च प्रदर्शन के लिए 10 मिनट का बेहतरीन वार्मअप।',
    category: 'mobility',
    level: 'all',
    duration: '10:30',
    instructor: 'Jeevan Chauhan',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    videoThumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    isPublished: true,
    isFeatured: false,
    createdAt: new Date().toISOString(),
  }
];
