import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  query, 
  where,
  getDocs
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthContext';
import { 
  ExerciseItem, 
  WorkoutSession, 
  TrainingProgramPlan, 
  VideoLessonItem, 
  AnnouncementItem, 
  AppSettingsData,
  WorkoutLogEntry,
  LessonProgressItem
} from '../types';
import { 
  INITIAL_EXERCISES, 
  INITIAL_WORKOUTS, 
  INITIAL_TRAINING_PLANS, 
  INITIAL_VIDEOS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_APP_SETTINGS 
} from '../data/seedData';

interface DataContextType {
  exercises: ExerciseItem[];
  workouts: WorkoutSession[];
  trainingPlans: TrainingProgramPlan[];
  videos: VideoLessonItem[];
  announcements: AnnouncementItem[];
  appSettings: AppSettingsData;
  userWorkoutLogs: WorkoutLogEntry[];
  userLessonProgress: Record<string, LessonProgressItem>;
  isLoadingData: boolean;
  
  // User actions
  logWorkout: (data: Omit<WorkoutLogEntry, 'id' | 'userId' | 'createdAt'>) => Promise<string>;
  updateWorkoutLog: (id: string, data: Partial<WorkoutLogEntry>) => Promise<void>;
  deleteWorkoutLog: (id: string) => Promise<void>;
  toggleLessonFavorite: (lessonId: string) => Promise<void>;
  toggleLessonCompleted: (lessonId: string) => Promise<void>;

  // Admin actions
  saveExercise: (exercise: ExerciseItem) => Promise<void>;
  deleteExercise: (exerciseId: string) => Promise<void>;
  saveWorkout: (workout: WorkoutSession) => Promise<void>;
  deleteWorkout: (workoutId: string) => Promise<void>;
  saveTrainingPlan: (plan: TrainingProgramPlan) => Promise<void>;
  deleteTrainingPlan: (planId: string) => Promise<void>;
  saveVideo: (video: VideoLessonItem) => Promise<void>;
  deleteVideo: (videoId: string) => Promise<void>;
  saveAnnouncement: (announcement: AnnouncementItem) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  saveAppSettings: (settings: AppSettingsData) => Promise<void>;
  seedDatabaseIfEmpty: () => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  exercises: INITIAL_EXERCISES,
  workouts: INITIAL_WORKOUTS,
  trainingPlans: INITIAL_TRAINING_PLANS,
  videos: INITIAL_VIDEOS,
  announcements: INITIAL_ANNOUNCEMENTS,
  appSettings: INITIAL_APP_SETTINGS,
  userWorkoutLogs: [],
  userLessonProgress: {},
  isLoadingData: false,
  logWorkout: async () => '',
  updateWorkoutLog: async () => {},
  deleteWorkoutLog: async () => {},
  toggleLessonFavorite: async () => {},
  toggleLessonCompleted: async () => {},
  saveExercise: async () => {},
  deleteExercise: async () => {},
  saveWorkout: async () => {},
  deleteWorkout: async () => {},
  saveTrainingPlan: async () => {},
  deleteTrainingPlan: async () => {},
  saveVideo: async () => {},
  deleteVideo: async () => {},
  saveAnnouncement: async () => {},
  deleteAnnouncement: async () => {},
  saveAppSettings: async () => {},
  seedDatabaseIfEmpty: async () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  const [exercises, setExercises] = useState<ExerciseItem[]>(INITIAL_EXERCISES);
  const [workouts, setWorkouts] = useState<WorkoutSession[]>(INITIAL_WORKOUTS);
  const [trainingPlans, setTrainingPlans] = useState<TrainingProgramPlan[]>(INITIAL_TRAINING_PLANS);
  const [videos, setVideos] = useState<VideoLessonItem[]>(INITIAL_VIDEOS);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [appSettings, setAppSettings] = useState<AppSettingsData>(INITIAL_APP_SETTINGS);
  const [userWorkoutLogs, setUserWorkoutLogs] = useState<WorkoutLogEntry[]>([]);
  const [userLessonProgress, setUserLessonProgress] = useState<Record<string, LessonProgressItem>>({});
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Sync exercises
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'exercises'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as ExerciseItem));
        setExercises(list);
      } else {
        setExercises(INITIAL_EXERCISES);
      }
    }, (error) => {
      console.warn('Exercises snapshot info (falling back to initial seed):', error.message);
      setExercises(INITIAL_EXERCISES);
    });
    return () => unsub();
  }, []);

  // Sync workouts
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'workouts'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as WorkoutSession));
        setWorkouts(list);
      } else {
        setWorkouts(INITIAL_WORKOUTS);
      }
    }, (error) => {
      console.warn('Workouts snapshot info:', error.message);
      setWorkouts(INITIAL_WORKOUTS);
    });
    return () => unsub();
  }, []);

  // Sync trainingPlans
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'trainingPlans'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as TrainingProgramPlan));
        setTrainingPlans(list);
      } else {
        setTrainingPlans(INITIAL_TRAINING_PLANS);
      }
    }, (error) => {
      console.warn('TrainingPlans snapshot info:', error.message);
      setTrainingPlans(INITIAL_TRAINING_PLANS);
    });
    return () => unsub();
  }, []);

  // Sync videos
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'videos'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as VideoLessonItem));
        setVideos(list);
      } else {
        setVideos(INITIAL_VIDEOS);
      }
    }, (error) => {
      console.warn('Videos snapshot info:', error.message);
      setVideos(INITIAL_VIDEOS);
    });
    return () => unsub();
  }, []);

  // Sync announcements
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'announcements'), (snap) => {
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as AnnouncementItem));
        setAnnouncements(list);
      } else {
        setAnnouncements(INITIAL_ANNOUNCEMENTS);
      }
    }, (error) => {
      console.warn('Announcements snapshot info:', error.message);
      setAnnouncements(INITIAL_ANNOUNCEMENTS);
    });
    return () => unsub();
  }, []);

  // Sync appSettings
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'appSettings', 'main'), (snap) => {
      if (snap.exists()) {
        setAppSettings(snap.data() as AppSettingsData);
      } else {
        setAppSettings(INITIAL_APP_SETTINGS);
      }
    }, (error) => {
      console.warn('AppSettings snapshot info:', error.message);
      setAppSettings(INITIAL_APP_SETTINGS);
    });
    return () => unsub();
  }, []);

  // Sync user workoutLogs
  useEffect(() => {
    if (!currentUser) {
      setUserWorkoutLogs([]);
      setIsLoadingData(false);
      return;
    }

    const q = query(collection(db, 'workoutLogs'), where('userId', '==', currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as WorkoutLogEntry));
      list.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
      setUserWorkoutLogs(list);
      setIsLoadingData(false);
    }, (error) => {
      console.warn('User workout logs listener notice:', error.message);
      setIsLoadingData(false);
    });

    return () => unsub();
  }, [currentUser]);

  // Sync user lessonProgress
  useEffect(() => {
    if (!currentUser) {
      setUserLessonProgress({});
      return;
    }

    const q = query(collection(db, 'lessonProgress'), where('userId', '==', currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      const map: Record<string, LessonProgressItem> = {};
      snap.docs.forEach(d => {
        const item = { id: d.id, ...d.data() } as LessonProgressItem;
        map[item.lessonId] = item;
      });
      setUserLessonProgress(map);
    }, (error) => {
      console.warn('Lesson progress listener notice:', error.message);
    });

    return () => unsub();
  }, [currentUser]);

  // User Actions
  const logWorkout = async (data: Omit<WorkoutLogEntry, 'id' | 'userId' | 'createdAt'>): Promise<string> => {
    if (!currentUser) throw new Error('Sign in required to log workout');
    const path = 'workoutLogs';
    try {
      const newDoc = {
        ...data,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(db, path), newDoc);
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const updateWorkoutLog = async (id: string, data: Partial<WorkoutLogEntry>) => {
    if (!currentUser) return;
    const path = `workoutLogs/${id}`;
    try {
      await updateDoc(doc(db, 'workoutLogs', id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const deleteWorkoutLog = async (id: string) => {
    if (!currentUser) return;
    const path = `workoutLogs/${id}`;
    try {
      await deleteDoc(doc(db, 'workoutLogs', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const toggleLessonFavorite = async (lessonId: string) => {
    if (!currentUser) throw new Error('Sign in required to save favorites');
    const existing = userLessonProgress[lessonId];
    const path = existing ? `lessonProgress/${existing.id}` : 'lessonProgress';
    try {
      if (existing) {
        await updateDoc(doc(db, 'lessonProgress', existing.id), {
          isFavorite: !existing.isFavorite,
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'lessonProgress'), {
          userId: currentUser.uid,
          lessonId,
          isCompleted: false,
          isFavorite: true,
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const toggleLessonCompleted = async (lessonId: string) => {
    if (!currentUser) throw new Error('Sign in required to record progress');
    const existing = userLessonProgress[lessonId];
    const path = existing ? `lessonProgress/${existing.id}` : 'lessonProgress';
    try {
      if (existing) {
        await updateDoc(doc(db, 'lessonProgress', existing.id), {
          isCompleted: !existing.isCompleted,
          lastWatchedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else {
        await addDoc(collection(db, 'lessonProgress'), {
          userId: currentUser.uid,
          lessonId,
          isCompleted: true,
          isFavorite: false,
          lastWatchedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Admin Actions
  const saveExercise = async (exercise: ExerciseItem) => {
    const path = `exercises/${exercise.id}`;
    try {
      await setDoc(doc(db, 'exercises', exercise.id), exercise, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteExercise = async (exerciseId: string) => {
    const path = `exercises/${exerciseId}`;
    try {
      await deleteDoc(doc(db, 'exercises', exerciseId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const saveWorkout = async (workout: WorkoutSession) => {
    const path = `workouts/${workout.id}`;
    try {
      await setDoc(doc(db, 'workouts', workout.id), workout, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteWorkout = async (workoutId: string) => {
    const path = `workouts/${workoutId}`;
    try {
      await deleteDoc(doc(db, 'workouts', workoutId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const saveTrainingPlan = async (plan: TrainingProgramPlan) => {
    const path = `trainingPlans/${plan.id}`;
    try {
      await setDoc(doc(db, 'trainingPlans', plan.id), plan, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteTrainingPlan = async (planId: string) => {
    const path = `trainingPlans/${planId}`;
    try {
      await deleteDoc(doc(db, 'trainingPlans', planId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const saveVideo = async (video: VideoLessonItem) => {
    const path = `videos/${video.id}`;
    try {
      await setDoc(doc(db, 'videos', video.id), video, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteVideo = async (videoId: string) => {
    const path = `videos/${videoId}`;
    try {
      await deleteDoc(doc(db, 'videos', videoId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const saveAnnouncement = async (announcement: AnnouncementItem) => {
    const path = `announcements/${announcement.id}`;
    try {
      await setDoc(doc(db, 'announcements', announcement.id), announcement, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    const path = `announcements/${id}`;
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const saveAppSettings = async (settings: AppSettingsData) => {
    const path = 'appSettings/main';
    try {
      await setDoc(doc(db, 'appSettings', 'main'), settings, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Seed default items into Firestore so the database is pre-populated
  const seedDatabaseIfEmpty = async () => {
    try {
      for (const ex of INITIAL_EXERCISES) {
        await setDoc(doc(db, 'exercises', ex.id), ex, { merge: true });
      }
      for (const wo of INITIAL_WORKOUTS) {
        await setDoc(doc(db, 'workouts', wo.id), wo, { merge: true });
      }
      for (const pl of INITIAL_TRAINING_PLANS) {
        await setDoc(doc(db, 'trainingPlans', pl.id), pl, { merge: true });
      }
      for (const vd of INITIAL_VIDEOS) {
        await setDoc(doc(db, 'videos', vd.id), vd, { merge: true });
      }
      for (const an of INITIAL_ANNOUNCEMENTS) {
        await setDoc(doc(db, 'announcements', an.id), an, { merge: true });
      }
      await setDoc(doc(db, 'appSettings', 'main'), INITIAL_APP_SETTINGS, { merge: true });
    } catch (err) {
      console.error('Seeding error:', err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        exercises,
        workouts,
        trainingPlans,
        videos,
        announcements,
        appSettings,
        userWorkoutLogs,
        userLessonProgress,
        isLoadingData,
        logWorkout,
        updateWorkoutLog,
        deleteWorkoutLog,
        toggleLessonFavorite,
        toggleLessonCompleted,
        saveExercise,
        deleteExercise,
        saveWorkout,
        deleteWorkout,
        saveTrainingPlan,
        deleteTrainingPlan,
        saveVideo,
        deleteVideo,
        saveAnnouncement,
        deleteAnnouncement,
        saveAppSettings,
        seedDatabaseIfEmpty,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
