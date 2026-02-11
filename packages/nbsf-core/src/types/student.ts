import { Domain } from '../constants';

export interface StudentProfile {
  id: string;
  tenantId: string; // "smart-sphere-hcmc" for Phase 1
  cefrLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  lexileScore: number;
  domains: Record<Domain, number>; 
  lastAssessmentDate: string;
  currentTier: 'Tier 1 Core' | 'Tier 2 Targeted' | 'Tier 3 Intensive';
}
