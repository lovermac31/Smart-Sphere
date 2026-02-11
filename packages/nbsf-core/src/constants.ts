export const DOMAINS = {
  LISTENING: 'Listening',
  SPEAKING: 'Speaking',
  READING: 'Reading',
  WRITING: 'Writing',
  THINKING: 'Thinking'
} as const;

export type Domain = typeof DOMAINS[keyof typeof DOMAINS];

export const NBSF_LEVELS = ['Core', 'Targeted', 'Intensive'];
