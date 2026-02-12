import React from 'react';

interface TierBreakdownProps {
  currentTier: string;
}

const TIERS = [
  {
    id: 'Tier 1 Core',
    label: 'Tier 1',
    description: 'Core Support',
    color: 'bg-emerald-500',
    text: 'text-emerald-700'
  },
  {
    id: 'Tier 2 Targeted',
    label: 'Tier 2',
    description: 'Targeted Support',
    color: 'bg-amber-500',
    text: 'text-amber-700'
  },
  {
    id: 'Tier 3 Intensive',
    label: 'Tier 3',
    description: 'Intensive Support',
    color: 'bg-rose-500',
    text: 'text-rose-700'
  },
];

export const TierBreakdown: React.FC<TierBreakdownProps> = ({ currentTier }) => {
  return (
    <div className="w-full space-y-4 mt-6">
      <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
        <span>Intervention Level</span>
        <span>Severity</span>
      </div>

      <div className="flex w-full h-3 rounded-full overflow-hidden bg-gray-200/50 backdrop-blur-sm relative shadow-inner">
        {TIERS.map((tier) => {
          const isActive = tier.id === currentTier;
          return (
            <div
              key={tier.id}
              className={`flex-1 transition-all duration-700 ease-out ${isActive ? tier.color + ' opacity-100' : 'bg-transparent'} ${isActive ? 'shadow-[0_0_20px_rgba(0,0,0,0.2)] z-10' : ''}`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {TIERS.map((tier) => {
          const isActive = tier.id === currentTier;
          return (
            <div
              key={tier.id}
              className={`flex flex-col items-center text-center transition-all duration-500 ${isActive ? 'opacity-100 scale-105 transform' : 'opacity-40 grayscale blur-[1px]'}`}
            >
              <div className={`w-2 h-2 rounded-full mb-1 ${tier.color}`}></div>
              <div className="text-[10px] font-bold text-gray-700 tracking-wider uppercase">{tier.label}</div>
              <div className="text-[9px] text-gray-500 font-medium">{tier.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
