import React, { useState } from 'react';
import { Copy, Check, Download, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import { RentTrustOracleResponse } from '../types';

interface JsonRawViewerProps {
  data: RentTrustOracleResponse;
}

export const JsonRawViewer: React.FC<JsonRawViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `renttrust-oracle-${data.oracle.leaseId.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Schema Validated (JSON Oracle Output)</span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Hash: {data.oracle.contractVerificationHash.slice(0, 14)}...
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all border border-slate-700"
            title="Descargar JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Descargar .json</span>
          </button>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>¡Copiado al Portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar JSON Puro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="relative p-4 sm:p-6 bg-slate-950 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto max-h-[700px] leading-relaxed">
        <pre className="text-slate-200 selection:bg-rose-500/30 selection:text-white">
          <code>{jsonString}</code>
        </pre>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-rose-400" />
          Listo para inyección en Smart Contract de Avalanche C-Chain
        </span>
        <span className="font-mono text-slate-500">
          Bytes: {new Blob([jsonString]).size} | Tokens: USDC (6 dec)
        </span>
      </div>
    </div>
  );
};
