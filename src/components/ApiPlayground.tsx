import React, { useState } from 'react';
import { Terminal, Copy, Check, Code, ExternalLink } from 'lucide-react';

export const ApiPlayground: React.FC = () => {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedJs, setCopiedJs] = useState(false);

  const curlSnippet = `curl -X POST https://your-domain.run.app/api/oracle/process-lease \\
  -H "Content-Type: application/json" \\
  -d '{
    "contractText": "CONTRATO DE ARRIENDO... Renta: 1200 USDC... Billetera Arrendador: 0x4838B1... Billetera Corredora: 0xBcd404... Comision: 10%..."
  }'`;

  const jsSnippet = `const response = await fetch('/api/oracle/process-lease', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contractText: leaseDocumentText })
});

// Responde ÚNICAMENTE con el objeto JSON estructurado:
const oracleData = await response.json();
console.log(oracleData.financialBreakdown.rawUnits);
console.log(oracleData.avalancheSmartContract.parameters);`;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <Terminal className="w-5 h-5 text-rose-500" />
        <h3 className="text-base font-bold text-slate-100">
          Integración API para Oráculos & Scripts Web3
        </h3>
      </div>
      <p className="text-xs text-slate-400 mb-4">
        Cualquier bot de Chainlink Functions, Gelato Keeper, backend de corredora o dApp puede consumir directamente el endpoint REST del oráculo RentTrust-AI y recibir exclusivamente el objeto JSON estructurado.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* cURL */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-rose-400 uppercase">cURL Request</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(curlSnippet);
                setCopiedCurl(true);
                setTimeout(() => setCopiedCurl(false), 2000);
              }}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
            >
              {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCurl ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <pre className="text-slate-300 overflow-x-auto p-2 bg-slate-900/60 rounded">
            <code>{curlSnippet}</code>
          </pre>
        </div>

        {/* Node.js / TypeScript */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-blue-400 uppercase">JavaScript / TypeScript Fetch</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(jsSnippet);
                setCopiedJs(true);
                setTimeout(() => setCopiedJs(false), 2000);
              }}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
            >
              {copiedJs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJs ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <pre className="text-slate-300 overflow-x-auto p-2 bg-slate-900/60 rounded">
            <code>{jsSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
