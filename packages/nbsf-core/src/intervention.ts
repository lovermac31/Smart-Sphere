import { StudentProfile } from './types/student';

export const calculateInterventionTier = (student: StudentProfile) => {
  const averageDomainScore = Object.values(student.domains).reduce((a, b) => a + b, 0) / 5;
  
  // Logic: Low scores or Lexile stagnation triggers Tier escalation
  if (averageDomainScore < 40 || student.lexileScore < 400) {
    return 'Tier 3 Intensive';
  } else if (averageDomainScore < 70) {
    return 'Tier 2 Targeted';
  }
  
  return 'Tier 1 Core';
};

export const getTierRecommendation = (tier: string) => {
  switch (tier) {
    case 'Tier 3 Intensive': return '1-on-1 Specialist Intervention Required';
    case 'Tier 2 Targeted': return 'Small Group Skill-Focused Workshop';
    default: return 'Continue Core Global Explorer Curriculum';
  }
};
