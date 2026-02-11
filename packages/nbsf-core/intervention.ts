import { StudentDNA } from './types/student';

export const assessReadiness = (student: StudentDNA) => {
  const isLanguageReady = student.lexileScore >= 1100; // Target for NYU/Oxford
  const isThinkingReady = student.domains['Thinking'] >= 85;

  return {
    universityReady: isLanguageReady && isThinkingReady,
    recommendation: isLanguageReady && isThinkingReady 
      ? 'Transfer to Study Abroad Agency Ecosystem' 
      : 'Continue NBSF Summer Camp Program'
  };
};
