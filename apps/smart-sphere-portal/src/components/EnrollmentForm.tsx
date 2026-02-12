import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { handleEnrollmentCheck } from '../services/enrollment';
import { DOMAINS } from '@smart-sphere/core';
import type { Domain } from '@smart-sphere/core';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { DiagnosticCard } from './DiagnosticCard';
import { TierBreakdown } from './TierBreakdown';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const EnrollmentForm = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Force English on mount to ensure consistent state
    if (!i18n.language.startsWith('en')) {
      i18n.changeLanguage('en');
    }
    // Trigger entrance animation
    setIsVisible(true);
  }, [i18n]);

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
    const nextLang = i18n.language.startsWith('en') ? 'vi' : 'en';
    i18n.changeLanguage(nextLang);
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

  const chartData = {
    labels: Object.values(DOMAINS).map(d => t(d)),
    datasets: [
      {
        label: 'Student Profile',
        data: Object.values(DOMAINS).map(d => domainScores[d]),
        backgroundColor: 'rgba(30, 58, 138, 0.2)', // WorldWise Blue transparent
        borderColor: 'rgba(30, 58, 138, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(30, 58, 138, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(30, 58, 138, 1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
            color: 'rgba(0, 0, 0, 0.05)'
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.05)'
        },
        pointLabels: {
            font: {
                size: 11,
                family: 'system-ui'
            },
            color: '#4b5563' // text-gray-600
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
            display: false // Hide numbers on the axes for cleaner look
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    maintainAspectRatio: true
  };

  return (
    <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'} max-w-lg mx-auto bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 sm:p-10 space-y-8`}>
      <div className="flex justify-end">
        <div className="w-20 text-right">
          <button onClick={toggleLanguage} className="text-xs font-bold text-blue-900 uppercase hover:text-blue-700 transition-colors tracking-wide">
            {i18n.language.startsWith('en') ? 'Tiếng Việt' : 'English'}
          </button>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t('title')}</h2>
        <p className="text-gray-600 text-lg font-light tracking-wide">{t('description')}</p>
      </div>

      <div className="w-48 h-48 mx-auto">
        <Radar data={chartData} options={chartOptions} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Lexile Score Input */}
        <div>
          <label htmlFor="lexile" className="block text-sm font-semibold text-gray-700 tracking-tight mb-2">
            Lexile Score (0 - 2000)
          </label>
          <input
            type="number"
            id="lexile"
            min="0"
            max="2000"
            value={lexileScore}
            onChange={(e) => setLexileScore(Number(e.target.value))}
            className="block w-full rounded-xl border-gray-200 bg-white/50 focus:bg-white transition-colors shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border"
          />
        </div>

        {/* Domain Sliders */}
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900 tracking-tight border-b border-gray-200 pb-2">Domain Assessment</h3>
          {(Object.values(DOMAINS) as Domain[]).map((domain) => (
            <div key={domain} className="space-y-2 group">
              <div className="flex justify-between text-sm items-center">
                <label htmlFor={domain} className="font-medium text-gray-700 capitalize tracking-tight group-hover:text-blue-900 transition-colors">
                  {t(domain)}
                </label>
                <span className="font-bold text-blue-900 bg-blue-50 px-2 py-1 rounded-md min-w-[2rem] text-center">{domainScores[domain]}</span>
              </div>
              <input
                type="range"
                id={domain}
                min="0"
                max="100"
                value={domainScores[domain]}
                onChange={(e) => handleDomainChange(domain, Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900 hover:accent-blue-700 transition-all"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-blue-900/20 hover:-translate-y-0.5 transform transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Processing...' : t('button')}
        </button>
      </form>

      {result && (
        <div className="mt-10 space-y-6 animate-fade-in-up">
          <DiagnosticCard result={result} />
          <TierBreakdown currentTier={result.tier} />
        </div>
      )}
    </div>
  );
};
