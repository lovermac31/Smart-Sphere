import { assessReadiness } from '@smart-sphere/core';
import type { StudentDNA } from '@smart-sphere/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Placeholder Firebase configuration
// In a real application, these should come from environment variables.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD-PLACEHOLDER",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "smart-sphere-hcmc.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smart-sphere-hcmc",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "smart-sphere-hcmc.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handleEnrollmentCheck = async (studentData: Partial<StudentDNA>) => {
  // Use the import.meta.env key for any AI-powered validation if needed later
  console.log('Validating with API Key:', import.meta.env.VITE_GEMINI_API_KEY ? 'Present' : 'Missing');

  // Perform the core NBSF logic check
  const result = assessReadiness(studentData as StudentDNA);

  const finalResult = {
    ...result,
    campaign: 'Global Explorer Summer Camp 2026',
    location: 'HCMC Hub'
  };

  try {
    // Persist to HCMC Tenant specific collection
    await addDoc(collection(db, 'tenants/smart-sphere-hcmc/enrollments'), {
      studentData,
      result: finalResult,
      timestamp: serverTimestamp()
    });
    console.log('Enrollment saved to HCMC Hub persistence layer.');
  } catch (error) {
    console.error('Error saving enrollment:', error);
    // Proceed without failing the UI flow, as per resilient design
  }

  return finalResult;
};
