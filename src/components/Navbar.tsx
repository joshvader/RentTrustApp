import React from 'react';
import { ShieldCheck, Cpu, ExternalLink, Activity, Layers } from 'lucide-react';

interface NavbarProps {
  isSimulating?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-red-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-black text-rose-500 text-lg tracking-tighter">🔺</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                RentTrust<span className="text-rose-500">.AI</span>
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Avalanche C-Chain
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Oráculo Descentralizado Inmobiliario & Verificador Legal de Arriendos
            </p>
          </div>
        </div>

        {/* Network & Node Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Oracle Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden md:inline">Oráculo Node</span> Activo
          </div>

          {/* Chain & Token */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="text-rose-400 font-semibold">Chain: 43114</span>
            <span className="text-slate-600">|</span>
            <span className="text-blue-400 font-medium">USDC (6 dec)</span>
          </div>

          {/* Snowtrace Link */}
          <a
            href="https://snowtrace.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
          >
            <Activity className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Snowtrace</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
};
