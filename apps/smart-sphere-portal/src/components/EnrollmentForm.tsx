import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { handleEnrollmentCheck } from '../services/enrollment';

export const EnrollmentForm = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const mockStudent = {
      lexileScore: 1150,
      domains: { Thinking: 90, Listening: 80, Speaking: 75, Reading: 85, Writing: 70 },
      tier: 'Core'
    };
    const outcome = await handleEnrollmentCheck(mockStudent as any);
    setResult(outcome);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div className="flex justify-end">
        <button onClick={toggleLanguage} className="text-xs font-bold text-blue-600 uppercase">
          {i18n.language === 'en' ? 'Tiếng Việt' : 'English'}
        </button>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
      <p className="text-gray-500">{t('description')}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md">
          {loading ? '...' : t('button')}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="font-bold text-green-800">{t('result_title')}</h3>
          <p className="text-green-700">{result.recommendation}</p>
          <p className="text-sm text-green-600 mt-2">{t('hub_label')}</p>
        </div>
      )}
    </div>
  );
};
