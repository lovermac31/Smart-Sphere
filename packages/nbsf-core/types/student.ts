import { Domain } from '../constants';

export interface StudentDNA {
  id: string;
  tenantId: string; // The Language School Ecosystem ID
  lexileScore: number;
  domains: Record<Domain, number>; // L, S, R, W + Thinking
  behavioral: {
    grit: number;
    resilience: number;
    adaptability: number;
    criticalThinking: number;
  };
  lastAssessment: string;
  tier: 'Core' | 'Targeted' | 'Intensive';
}
