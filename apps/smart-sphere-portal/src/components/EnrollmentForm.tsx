import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { handleEnrollmentCheck } from '../services/enrollment';
import { DOMAINS } from '@smart-sphere/core';
import type { Domain } from '@smart-sphere/core';

export const EnrollmentForm = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // State for inputs
  const [lexileScore, setLexileScore] = useState<number>(400); // Default to a reasonable baseline
  const [domainScores, setDomainScores] = useState<Record<Domain, number>>({
    [DOMAINS.LISTENING]: 50,
    [DOMAINS.SPEAKING]: 50,
    [DOMAINS.READING]: 50,
    [DOMAINS.WRITING]: 50,
    [DOMAINS.THINKING]: 50,
  });

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'vi' : 'en');
  };

  const handleDomainChange = (domain: Domain, value: number) => {
    setDomainScores(prev => ({
      ...prev,
      [domain]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const studentData = {
      lexileScore,
      domains: domainScores,
    };

    const outcome = await handleEnrollmentCheck(studentData);
    setResult(outcome);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <div className="flex justify-end">
        <button onClick={toggleLanguage} className="text-xs font-bold text-blue-600 uppercase hover:text-blue-800 transition-colors">
          {i18n.language === 'en' ? 'Tiếng Việt' : 'English'}
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
        <p className="text-gray-500 mt-2">{t('description')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Lexile Score Input */}
        <div>
          <label htmlFor="lexile" className="block text-sm font-medium text-gray-700">
            Lexile Score (0 - 2000)
          </label>
          <input
            type="number"
            id="lexile"
            min="0"
            max="2000"
            value={lexileScore}
            onChange={(e) => setLexileScore(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
          />
        </div>

        {/* Domain Sliders */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Domain Assessment</h3>
          {(Object.values(DOMAINS) as Domain[]).map((domain) => (
            <div key={domain} className="space-y-1">
              <div className="flex justify-between text-sm">
                <label htmlFor={domain} className="font-medium text-gray-700 capitalize">
                  {domain}
                </label>
                <span className="text-gray-500">{domainScores[domain]}</span>
              </div>
              <input
                type="range"
                id={domain}
                min="0"
                max="100"
                value={domainScores[domain]}
                onChange={(e) => handleDomainChange(domain, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : t('button')}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
          <h3 className="font-bold text-green-800 mb-1">{t('result_title')}</h3>
          <p className="text-green-700 font-medium">{result.recommendation}</p>
          <p className="text-sm text-green-600 mt-2 border-t border-green-200 pt-2">
            {t('hub_label')}
          </p>
        </div>
      )}
    </div>
  );
};
