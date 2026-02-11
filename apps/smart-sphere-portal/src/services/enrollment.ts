import type { StudentProfile } from '@smart-sphere/core';
import { calculateInterventionTier, getTierRecommendation } from '@smart-sphere/core';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const handleEnrollmentCheck = async (studentData: Partial<StudentProfile>) => {
  const tier = calculateInterventionTier(studentData as StudentProfile);
  const recommendation = getTierRecommendation(tier);

  const payload = {
    domains: studentData.domains,
    tier,
    recommendation,
    campaign: 'Global Explorer Summer Camp 2026',
    location: 'HCMC Hub',
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(
      collection(db, 'tenants', 'smart-sphere-hcmc', 'enrollments'),
      payload
    );
  } catch (error) {
    console.error('Failed to persist enrollment lead:', error);
  }

  return {
    tier,
    recommendation,
    campaign: payload.campaign,
    location: payload.location
  };
};
