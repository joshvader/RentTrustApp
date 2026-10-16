import React, { useRef } from 'react';
import { SAMPLE_CONTRACTS, SampleContract } from '../sampleContracts';
import { Sparkles, FileText, Upload, RefreshCw, AlertCircle } from 'lucide-react';

interface ContractInputSectionProps {
  contractText: string;
  setContractText: (text: string) => void;
  onProcess: () => void;
  isLoading: boolean;
  activePresetId: string;
  onSelectPreset: (preset: SampleContract) => void;
}

export const ContractInputSection: React.FC<ContractInputSectionProps> = ({
  contractText,
  setContractText,
  onProcess,
  isLoading,
  activePresetId,
  onSelectPreset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setContractText(content);
      }
    };
    reader.readAsText(file);
  };

  const charCount = contractText.length;
  const wordCount = contractText.trim() ? contractText.trim().split(/\s+/).length : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Header and Preset Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-500" />
            Contrato o Borrador de Arriendo Inmobiliario
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingresa o carga un texto legal para extraer identidades, wallets Avalanche, división USDC y auditoría de la Ley de Arrendamiento Urbano.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.doc,.docx,.pdf,.md"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Subir Archivo (.txt / doc)</span>
          </button>

          <button
            onClick={() => setContractText('')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-colors"
            title="Limpiar texto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* Preset Templates Selector */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-300 block mb-2">
          Plantillas de Ejemplo Verificadas (Haz clic para cargar):
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {SAMPLE_CONTRACTS.map((sample) => {
            const isSelected = activePresetId === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => onSelectPreset(sample)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-500/10 text-white ring-1 ring-rose-500/30'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold truncate text-slate-100 flex items-center justify-between">
                  <span className="truncate">{sample.title}</span>
                  {sample.category === 'Auditoría de Riesgo' && (
                    <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1 rounded ml-1 font-mono">
                      Riesgo
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {sample.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Textarea Area */}
      <div className="relative rounded-xl border border-slate-800 bg-slate-950 focus-within:border-rose-500/80 focus-within:ring-1 focus-within:ring-rose-500/30 transition-all">
        <textarea
          value={contractText}
          onChange={(e) => setContractText(e.target.value)}
          placeholder="Pega aquí el texto completo del contrato de arriendo, con los datos de las partes, cánones, comisiones de corretaje y cláusulas legales..."
          rows={11}
          className="w-full bg-transparent text-slate-200 text-xs sm:text-sm p-4 font-mono leading-relaxed outline-none resize-y placeholder:text-slate-600"
        />

        <div className="flex items-center justify-between px-3 py-2 border-t border-slate-800/60 bg-slate-950/90 text-xs text-slate-500 font-mono rounded-b-xl">
          <div>
            <span>{charCount.toLocaleString()} caracteres</span> • <span>{wordCount.toLocaleString()} palabras</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Soporta Ley 18.101 & Wallets Avalanche C-Chain
          </span>
        </div>
      </div>

      {/* Execute Button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>
            RentTrust-AI procesará identidades, wallets C-Chain, cálculos exactos de USDC y parámetros del contrato inteligente.
          </span>
        </div>

        <button
          onClick={onProcess}
          disabled={isLoading || !contractText.trim()}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Procesando en Oráculo...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ejecutar Oráculo RentTrust-AI</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
