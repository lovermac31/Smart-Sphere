import { StudentProfile, calculateInterventionTier } from '@smart-sphere/core';

export const handleEnrollmentCheck = async (studentData: Partial<StudentProfile>) => {
  console.log('Validating with API Key:', import.meta.env.VITE_GEMINI_API_KEY ? 'Present' : 'Missing');

  const tier = calculateInterventionTier(studentData as StudentProfile);

  return {
    tier,
    campaign: 'Global Explorer Summer Camp 2026',
    location: 'HCMC Hub'
  };
};
