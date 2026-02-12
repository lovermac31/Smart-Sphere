import React from 'react';

interface DiagnosticCardProps {
  result: {
    tier: string;
    recommendation: string;
    campaign: string;
    location: string;
  };
}

export const DiagnosticCard: React.FC<DiagnosticCardProps> = ({ result }) => {
  return (
    <div className="p-8 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl animate-fade-in relative overflow-hidden group hover:bg-white/70 transition-all duration-500">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-widest">Diagnostic Outcome</h3>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight mb-3">{result.tier}</h2>
          <p className="text-gray-700 text-lg font-light leading-relaxed border-l-4 border-blue-500/30 pl-4 py-1">
            {result.recommendation}
          </p>
        </div>

        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 border border-white/60 shadow-sm min-w-[160px] text-right transform group-hover:scale-105 transition-transform duration-300">
          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Assigned Hub</div>
          <div className="font-bold text-blue-900 text-xl tracking-tight">{result.location}</div>
          <div className="text-xs text-blue-800/60 mt-1 font-medium">{result.campaign}</div>
        </div>
      </div>
    </div>
  );
};
