import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { handleEnrollmentCheck } from '../services/enrollment';

interface DomainScores {
  Listening: number;
  Speaking: number;
  Reading: number;
  Writing: number;
  Thinking: number;
}

const DOMAIN_KEYS: Array<{ key: keyof DomainScores; i18nKey: string }> = [
  { key: 'Listening', i18nKey: 'domain_listening' },
  { key: 'Speaking', i18nKey: 'domain_speaking' },
  { key: 'Reading', i18nKey: 'domain_reading' },
  { key: 'Writing', i18nKey: 'domain_writing' },
  { key: 'Thinking', i18nKey: 'domain_thinking' },
];

export const EnrollmentForm = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    tier: string;
    recommendation: string;
    campaign: string;
    location: string;
  } | null>(null);

  const [scores, setScores] = useState<DomainScores>({
    Listening: 50,
    Speaking: 50,
    Reading: 50,
    Writing: 50,
    Thinking: 50,
  });

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  const handleSliderChange = (domain: keyof DomainScores, value: number) => {
    setScores((prev) => ({ ...prev, [domain]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const studentData = {
      id: crypto.randomUUID(),
      tenantId: 'smart-sphere-hcmc',
      cefrLevel: 'B1' as const,
      lexileScore: 1000,
      domains: scores,
      lastAssessmentDate: new Date().toISOString(),
      currentTier: 'Tier 1 Core' as const,
    };

    const outcome = await handleEnrollmentCheck(studentData);
    setResult(outcome);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="animate-fade-in-up w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        {/* Language toggle */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleLanguage}
            className="text-xs font-bold text-blue-600 uppercase tracking-wide hover:text-blue-800 transition-colors"
          >
            {i18n.language === 'en' ? 'Tiếng Việt' : 'English'}
          </button>
        </div>

        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
          <p className="mt-2 text-gray-500 text-sm">{t('description')}</p>
        </div>

        {/* Slider form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {DOMAIN_KEYS.map(({ key, i18nKey }) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center">
                <label
                  htmlFor={`slider-${key}`}
                  className="text-sm font-medium text-gray-700"
                >
                  {t(i18nKey)}
                </label>
                <span className="text-sm font-semibold text-blue-600 tabular-nums">
                  {scores[key]}
                </span>
              </div>
              <input
                id={`slider-${key}`}
                type="range"
                min={0}
                max={100}
                value={scores[key]}
                onChange={(e) => handleSliderChange(key, Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-blue-600"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={[
              'w-full py-3 px-4 rounded-xl font-semibold text-white transition-all',
              'bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed',
              loading ? 'animate-pulse-glow' : '',
            ].join(' ')}
          >
            {loading ? '...' : t('button')}
          </button>
        </form>

        {/* Result display */}
        {result && (
          <div className="mt-2 p-5 bg-green-50 rounded-2xl border border-green-200 space-y-2">
            <h3 className="font-bold text-green-800">{t('result_title')}</h3>
            <p className="text-green-700">{result.recommendation}</p>
            <p className="text-xs text-green-600 font-medium">{result.tier}</p>
            <p className="text-sm text-green-600 mt-1">{t('hub_label')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
