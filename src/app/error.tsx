'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-emerald-900 text-white px-6 py-32 relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-emerald-700/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="relative z-10 text-center bg-white/80 p-8 rounded-3xl shadow-2xl max-w-2xl animate-fade-in-up">
        {/* Error Symbol with subtle border */}
        <div className="w-24 h-24 bg-emerald-700/5 rounded-full flex items-center justify-center mx-auto mb-10 text-amber-500 shadow-lg shadow-amber-500/5 border border-amber-500/10">
          <AlertTriangle className="w-12 h-12" aria-hidden="true" />
        </div>
        
        <h2 className="text-xs font-medium uppercase tracking-[0.4em] text-amber-500 mb-6">
          System Encountered a Delay
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-sans font-bold mb-8 leading-[0.9] tracking-tighter text-emerald-900">
          Unexpected <span className="text-amber-500 italic">Encounter</span>
        </h1>
        
        <p className="text-lg md:text-xl text-emerald-800/70 font-medium mb-12 max-w-md mx-auto leading-relaxed">
          While we refine your experience, an unforeseen error occurred. Our concierge team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <button
            onClick={() => reset()}
            className="group relative overflow-hidden bg-emerald-900 hover:bg-amber-500 text-stone-100 hover:text-emerald-900 px-12 py-5 rounded-2xl font-medium text-sm uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl active:scale-95 flex items-center gap-3"
          >
            Try Again
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" aria-hidden="true" />
          </button>
          
          <Link
            href="/"
            className="group border-2 border-emerald-900/10 hover:border-amber-500 text-emerald-900/60 hover:text-emerald-900 px-12 py-5 rounded-2xl font-medium text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3"
          >
            Back home
            <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
