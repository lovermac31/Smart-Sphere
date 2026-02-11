import { StudentDNA } from '@smart-sphere/core/types/student';
import { assessReadiness } from '@smart-sphere/core/intervention';

export const handleEnrollmentCheck = async (studentData: Partial<StudentDNA>) => {
  // Use the import.meta.env key for any AI-powered validation if needed later
  console.log('Validating with API Key:', import.meta.env.VITE_GEMINI_API_KEY ? 'Present' : 'Missing');

  // Perform the core NBSF logic check
  const result = assessReadiness(studentData as StudentDNA);
  
  return {
    ...result,
    campaign: 'Global Explorer Summer Camp 2026',
    location: 'HCMC Hub'
  };
};
