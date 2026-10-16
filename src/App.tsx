/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ContractInputSection } from './components/ContractInputSection';
import { PartiesSection } from './components/PartiesSection';
import { FinancialSplitSection } from './components/FinancialSplitSection';
import { LegalComplianceSection } from './components/LegalComplianceSection';
import { SmartContractDispatcher } from './components/SmartContractDispatcher';
import { JsonRawViewer } from './components/JsonRawViewer';
import { ApiPlayground } from './components/ApiPlayground';
import { SAMPLE_CONTRACTS, SampleContract } from './sampleContracts';
import { RentTrustOracleResponse } from './types';
import { LayoutDashboard, Code, Terminal, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [selectedPreset, setSelectedPreset] = useState<SampleContract>(SAMPLE_CONTRACTS[0]);
  const [contractText, setContractText] = useState<string>(SAMPLE_CONTRACTS[0].text);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [oracleResponse, setOracleResponse] = useState<RentTrustOracleResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeViewMode, setActiveViewMode] = useState<'dashboard' | 'json' | 'api'>('dashboard');

  // Trigger processing
  const handleProcessLease = async (textToProcess?: string) => {
    const text = textToProcess || contractText;
    if (!text.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/oracle/process-lease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractText: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data: RentTrustOracleResponse = await response.json();
      setOracleResponse(data);
    } catch (err: any) {
      console.error('Error invoking RentTrust-AI oracle:', err);
      setErrorMessage(
        'No se pudo conectar con el servicio oráculo. Verificando procesamiento de contingencia...'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Process initial sample on mount
  useEffect(() => {
    handleProcessLease(SAMPLE_CONTRACTS[0].text);
  }, []);

  const handleSelectPreset = (preset: SampleContract) => {
    setSelectedPreset(preset);
    setContractText(preset.text);
    handleProcessLease(preset.text);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Banner */}
      <div className="relative border-b border-slate-900 bg-gradient-to-b from-slate-900/60 to-slate-950 px-4 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>Oráculo Descentralizado Inmobiliario • Avalanche C-Chain</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                RentTrust<span className="text-rose-500">-AI</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 leading-relaxed">
                Asistente legal inmobiliario y oráculo inteligente para contratos de arriendo en la blockchain de Avalanche (C-Chain).
                Extrae identidades y billeteras, divide automáticamente cánones y comisiones de corredora en USDC (6 decimales),
                audita el cumplimiento de la Ley de Arrendamiento Urbano y genera los parámetros listos para el Smart Contract.
              </p>
            </div>

            {/* Quick Oracle Stats Cards */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 min-w-[130px]">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Blockchain Target</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">Avalanche C-Chain</div>
                <div className="text-[10px] text-rose-400 font-mono">ChainID: 43114</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 min-w-[130px]">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Stablecoin Engine</div>
                <div className="text-sm font-bold text-blue-400 mt-0.5">Native USDC</div>
                <div className="text-[10px] text-slate-400 font-mono">Decimals: 6</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 min-w-[130px]">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Auditoría Legal</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">Ley 18.101 & 21.461</div>
                <div className="text-[10px] text-slate-400 font-mono">Chile / LatAm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        {/* Error notification if any */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Input Section */}
        <ContractInputSection
          contractText={contractText}
          setContractText={setContractText}
          onProcess={() => handleProcessLease(contractText)}
          isLoading={isLoading}
          activePresetId={selectedPreset.id}
          onSelectPreset={handleSelectPreset}
        />

        {/* Results Container with View Selector */}
        {oracleResponse && (
          <div className="space-y-6">
            {/* View Mode Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-slate-900/90 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
                <button
                  onClick={() => setActiveViewMode('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeViewMode === 'dashboard'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Dashboard Visual (4 Pilares)</span>
                </button>

                <button
                  onClick={() => setActiveViewMode('json')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeViewMode === 'json'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>JSON Puro (Oráculo Avalanche)</span>
                </button>

                <button
                  onClick={() => setActiveViewMode('api')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeViewMode === 'api'
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>API / cURL Web3</span>
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3 px-3 text-xs">
                <span className="text-slate-400 hidden md:inline">
                  Contrato Hash SHA-256:
                </span>
                <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]">
                  {oracleResponse.oracle.contractVerificationHash.slice(0, 16)}...
                </span>
              </div>
            </div>

            {/* View Mode 1: Dashboard */}
            {activeViewMode === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* 1. Parties Section */}
                <PartiesSection parties={oracleResponse.parties} />

                {/* 2. Financial Split Section */}
                <FinancialSplitSection financials={oracleResponse.financialBreakdown} />

                {/* 3. Legal Compliance Section */}
                <LegalComplianceSection compliance={oracleResponse.legalCompliance} />

                {/* 4. Smart Contract Dispatcher */}
                <SmartContractDispatcher contractParams={oracleResponse.avalancheSmartContract} />
              </div>
            )}

            {/* View Mode 2: Pure JSON */}
            {activeViewMode === 'json' && (
              <div className="animate-in fade-in duration-300">
                <JsonRawViewer data={oracleResponse} />
              </div>
            )}

            {/* View Mode 3: API Playground */}
            {activeViewMode === 'api' && (
              <div className="animate-in fade-in duration-300">
                <ApiPlayground />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-rose-500 font-bold">RentTrust-AI</span>
            <span>• Oráculo Descentralizado para Contratos de Arriendo Inmobiliario en Avalanche</span>
          </div>
          <div className="font-mono text-[11px] text-slate-600">
            C-Chain Network (43114) • ERC-20 USDC Integration
          </div>
        </div>
      </footer>
    </div>
  );
}
