import type { Domain } from '../constants';

export interface StudentDNA {
  lexileScore: number;
  domains: Record<Domain, number>;
}

export interface StudentProfile extends StudentDNA {
  id: string;
  tenantId: string; // "smart-sphere-hcmc" for Phase 1
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  lastAssessmentDate: string;
  currentTier: 'Tier 1 Core' | 'Tier 2 Targeted' | 'Tier 3 Intensive';
}
