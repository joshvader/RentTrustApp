import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, ExternalLink, ShieldCheck, Box, Flame, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { AvalancheSmartContractParams, SimulationResult } from '../types';

interface SmartContractDispatcherProps {
  contractParams: AvalancheSmartContractParams;
}

export const SmartContractDispatcher: React.FC<SmartContractDispatcherProps> = ({ contractParams }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'parameters' | 'snippet' | 'solidity' | 'calldata'>('parameters');

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSimulateTx = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/oracle/simulate-avalanche-tx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leaseId: contractParams.parameters.leaseId,
          landlord: contractParams.parameters.landlord,
          tenant: contractParams.parameters.tenant,
          broker: contractParams.parameters.broker,
          rentTotal: contractParams.parameters.rentTotal,
          deposit: contractParams.parameters.deposit,
        }),
      });
      const data = await res.json();
      setSimulationResult(data);
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const p = contractParams.parameters;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Box className="w-5 h-5 text-rose-500" />
            4. Parámetros Smart Contract para Avalanche (C-Chain)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Estructuración de calldata, ABI y parámetros criptográficos listos para inyección en el contrato RentTrustVault.
          </p>
        </div>

        {/* Network & Contract Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold">
            Avalanche C-Chain (43114)
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
            Fuji Testnet (43113)
          </span>
        </div>
      </div>

      {/* Contract & Token Addresses Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 font-mono text-xs">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="truncate mr-2">
            <span className="text-slate-500 block text-[10px] font-sans font-semibold uppercase">Contrato USDC (Avalanche):</span>
            <span className="text-blue-400 select-all">{contractParams.usdcTokenAddress}</span>
          </div>
          <button
            onClick={() => copyToClipboard(contractParams.usdcTokenAddress, 'usdc')}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            {copiedKey === 'usdc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="truncate mr-2">
            <span className="text-slate-500 block text-[10px] font-sans font-semibold uppercase">RentTrustVault Address:</span>
            <span className="text-rose-400 select-all">{contractParams.rentVaultContractAddress}</span>
          </div>
          <button
            onClick={() => copyToClipboard(contractParams.rentVaultContractAddress, 'vault')}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            {copiedKey === 'vault' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800 mb-4 gap-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('parameters')}
          className={`pb-2.5 px-3 transition-colors border-b-2 ${
            activeTab === 'parameters'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Parámetros Mapeados
        </button>
        <button
          onClick={() => setActiveTab('snippet')}
          className={`pb-2.5 px-3 transition-colors border-b-2 ${
            activeTab === 'snippet'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Snippet Web3 (Ethers.js / viem)
        </button>
        <button
          onClick={() => setActiveTab('solidity')}
          className={`pb-2.5 px-3 transition-colors border-b-2 ${
            activeTab === 'solidity'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Interfaz Solidity
        </button>
        <button
          onClick={() => setActiveTab('calldata')}
          className={`pb-2.5 px-3 transition-colors border-b-2 ${
            activeTab === 'calldata'
              ? 'border-rose-500 text-rose-400 font-bold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Calldata Hex
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-6">
        {activeTab === 'parameters' && (
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">bytes32 leaseId</span>
                <span className="text-slate-200 truncate block select-all">{p.leaseId}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">bytes32 contractHash (SHA-256)</span>
                <span className="text-amber-300 truncate block select-all">{p.contractHash}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">address landlord</span>
                <span className="text-emerald-400 truncate block select-all">{p.landlord}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">address tenant</span>
                <span className="text-blue-400 truncate block select-all">{p.tenant}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">address broker</span>
                <span className="text-rose-400 truncate block select-all">{p.broker}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">uint256 rentTotal (USDC 6 dec)</span>
                <span className="text-slate-200">{p.rentTotal}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">uint256 landlordNet</span>
                <span className="text-emerald-400 font-bold">{p.landlordNet}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">uint256 brokerFee</span>
                <span className="text-rose-400 font-bold">{p.brokerFee}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">uint256 deposit</span>
                <span className="text-amber-400 font-bold">{p.deposit}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">uint8 paymentDay / uint16 duration</span>
                <span className="text-slate-200">Día {p.paymentDay} • {p.durationMonths} Meses</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'snippet' && (
          <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
            <button
              onClick={() => copyToClipboard(contractParams.web3CallSnippet, 'snippet')}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copiar snippet"
            >
              {copiedKey === 'snippet' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre><code>{contractParams.web3CallSnippet}</code></pre>
          </div>
        )}

        {activeTab === 'solidity' && (
          <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
            <button
              onClick={() => copyToClipboard(contractParams.solidityInterface, 'sol')}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copiar interface"
            >
              {copiedKey === 'sol' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <pre><code>{contractParams.solidityInterface}</code></pre>
          </div>
        )}

        {activeTab === 'calldata' && (
          <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-rose-300 break-all">
            <button
              onClick={() => copyToClipboard(contractParams.calldataHex, 'calldata')}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Copiar calldata"
            >
              {copiedKey === 'calldata' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <div className="text-[10px] text-slate-500 mb-1">EVM Transaction Data Payload:</div>
            <code>{contractParams.calldataHex}</code>
          </div>
        )}
      </div>

      {/* Simulator Action Trigger */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-rose-500" />
            Simulador de Transacción en Avalanche C-Chain / Fuji
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Verifica la emisión del evento <code>LeaseStreamCreated</code> y la atestación firmada por el oráculo.
          </p>
        </div>

        <button
          onClick={handleSimulateTx}
          disabled={isSimulating}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs border border-rose-500/30 hover:border-rose-500/60 transition-all flex items-center justify-center gap-2 shadow-md"
        >
          {isSimulating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
              <span>Simulando en EVM...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simular Llamada On-Chain</span>
            </>
          )}
        </button>
      </div>

      {/* Simulated Receipt Display */}
      {simulationResult && (
        <div className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 font-mono text-xs animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 mb-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              Transacción Simulada con Éxito (Avalanche C-Chain Receipt)
            </span>
            <span className="text-[10px] text-slate-400">Status: 0x1 (SUCCESS)</span>
          </div>

          <div className="space-y-1.5 text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Transaction Hash:</span>
              <a
                href={simulationResult.blockExplorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:underline flex items-center gap-1"
              >
                <span>{simulationResult.transactionHash.slice(0, 16)}...{simulationResult.transactionHash.slice(-8)}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Block Number:</span>
              <span>#{simulationResult.blockNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Gas Used:</span>
              <span>{simulationResult.gasUsed.toLocaleString()} units ({simulationResult.gasPriceGwei})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Events Emitted:</span>
              <span className="text-emerald-400 font-bold">LeaseStreamCreated(leaseId, landlord, tenant, broker)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
