import { assessReadiness } from '@smart-sphere/core';
import type { StudentDNA } from '@smart-sphere/core';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

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
