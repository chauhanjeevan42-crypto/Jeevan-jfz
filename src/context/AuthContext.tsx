import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as fbSignOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  deleteUser as fbDeleteUser,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  deleteDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, Language } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfileData: (data: Partial<UserProfile>) => Promise<void>;
  deleteUserAccount: () => Promise<void>;
}

const ADMIN_EMAIL = 'chauhanjeevan42@gmail.com';

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  isAdmin: false,
  isLoading: true,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  resetPassword: async () => {},
  signOut: async () => {},
  updateUserProfileData: async () => {},
  deleteUserAccount: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync profile from Firestore
  const fetchUserProfile = async (user: User) => {
    try {
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      const isUserAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        setUserProfile(data);
        setIsAdmin(isUserAdmin);
      } else {
        // Initial profile creation
        const newProfile: UserProfile = {
          userId: user.uid,
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'Athlete',
          photoURL: user.photoURL || '',
          preferredLanguage: (localStorage.getItem('jfz_language') as Language) || 'hi',
          experienceLevel: 'beginner',
          trainingInterests: 'Hybrid Training, Martial Arts',
          trainingGoals: 'Build stamina and functional mobility',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await setDoc(userRef, {
          ...newProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        setUserProfile(newProfile);
        setIsAdmin(isUserAdmin);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Fallback local representation if offline
      setUserProfile({
        userId: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Athlete',
        photoURL: user.photoURL || '',
        preferredLanguage: 'hi',
        experienceLevel: 'beginner',
        trainingInterests: 'Hybrid Training',
        trainingGoals: 'Train Smart',
      });
      setIsAdmin(user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setCurrentUser(user);
        await fetchUserProfile(user);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error('Email sign in error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      if (cred.user) {
        await updateProfile(cred.user, { displayName: name });
        await fetchUserProfile(cred.user);
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const updateUserProfileData = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const path = `users/${currentUser.uid}`;
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      const updated = {
        ...data,
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, updated, { merge: true });
      setUserProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const deleteUserAccount = async () => {
    if (!currentUser) return;
    const uid = currentUser.uid;
    try {
      // Clean up user document
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch (e) {
        console.warn('Could not remove user doc before deletion:', e);
      }
      await fbDeleteUser(currentUser);
    } catch (error: any) {
      console.error('Account deletion error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        isLoading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        signOut,
        updateUserProfileData,
        deleteUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
