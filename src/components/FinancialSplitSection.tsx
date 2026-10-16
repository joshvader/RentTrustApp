import React, { useState } from 'react';
import { DollarSign, ArrowRight, Percent, Calendar, Lock, Coins, Layers, Check, Copy } from 'lucide-react';
import { FinancialBreakdown } from '../types';

interface FinancialSplitSectionProps {
  financials: FinancialBreakdown;
}

export const FinancialSplitSection: React.FC<FinancialSplitSectionProps> = ({ financials }) => {
  const [copiedRaw, setCopiedRaw] = useState<string | null>(null);

  const rentTotal = financials.monthlyRentTotalUsdc || 0;
  const brokerPct = financials.brokerFeePercentage || 0;
  const brokerFee = financials.brokerFeeMonthlyUsdc || 0;
  const landlordNet = financials.landlordNetMonthlyUsdc || 0;
  const deposit = financials.securityDepositUsdc || 0;
  const duration = financials.leaseDurationMonths || 12;
  const paymentDay = financials.paymentDay || 5;

  const totalVolume = rentTotal * duration;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRaw(id);
    setTimeout(() => setCopiedRaw(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Coins className="w-5 h-5 text-blue-400" />
            2. Cálculo Financiero Exacto & División de Stablecoins (USDC)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Separación mensual automatizada del canon en USDC (6 decimales) entre Propietario y Corredora de Propiedades.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
            USDC Decimals: 6
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
            Día de Pago: {paymentDay} de c/mes
          </span>
        </div>
      </div>

      {/* Main Visual Stream / Split Diagram */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
          <span>Flujo de Distribución Mensual Automatizado (On-Chain Stream)</span>
          <span className="text-rose-400 font-mono text-[11px]">Avalanche C-Chain USDC Engine</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Tenant Total */}
          <div className="lg:col-span-4 p-4 rounded-xl bg-slate-900/90 border border-blue-500/30 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block mb-1">
              Pago Mensual Arrendatario
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
              {rentTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-sm font-bold text-blue-400 ml-1.5">USDC</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              100% canon bruto mensual pactado
            </p>
          </div>

          {/* Smart Contract Splitter Arrow */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-2">
            <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-rose-400 shadow-md">
              <ArrowRight className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 mt-1.5 text-center">
              Smart Vault Splitter
            </span>
          </div>

          {/* Landlord Net & Broker Fee Splits */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Landlord Net */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                  Neto Propietario
                </span>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  {100 - brokerPct}%
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                {landlordNet.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-xs text-emerald-400 ml-1">USDC</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Liquidación mensual directa a su wallet
              </p>
            </div>

            {/* Broker Fee */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-rose-500/30 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                  Comisión Corredora
                </span>
                <span className="text-xs font-mono font-bold text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded">
                  {brokerPct}%
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                {brokerFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="text-xs text-rose-400 ml-1">USDC</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Honorarios devengados en tiempo real
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Financial Badges: Guarantee Deposit & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Depósito de Garantía (Escrow)</div>
            <div className="text-base font-bold text-slate-100 font-mono">
              {deposit.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDC
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Duración del Contrato</div>
            <div className="text-base font-bold text-slate-100 font-mono">
              {duration} Meses Forzosos
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Volumen Total del Contrato</div>
            <div className="text-base font-bold text-slate-100 font-mono">
              {totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDC
            </div>
          </div>
        </div>
      </div>

      {/* EVM Raw Units Table (Solidity 6 decimals) */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Parámetros Raw Units para Smart Contract (Factor 10⁶ para USDC)
            </h4>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">uint256 EVM Encoded</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-2 font-semibold">Parámetro Solidity</th>
                <th className="pb-2 font-semibold">Monto Humano</th>
                <th className="pb-2 font-semibold">Unidades Base (USDC wei)</th>
                <th className="pb-2 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-blue-300">rentTotal</td>
                <td className="py-2.5">{rentTotal} USDC</td>
                <td className="py-2.5 text-rose-400 font-semibold">{financials.rawUnits.monthlyRentTotal}</td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => copyToClipboard(financials.rawUnits.monthlyRentTotal, 'rent')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Copiar raw uint"
                  >
                    {copiedRaw === 'rent' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-300">landlordNet</td>
                <td className="py-2.5">{landlordNet} USDC</td>
                <td className="py-2.5 text-rose-400 font-semibold">{financials.rawUnits.landlordNetMonthly}</td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => copyToClipboard(financials.rawUnits.landlordNetMonthly, 'landlord')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Copiar raw uint"
                  >
                    {copiedRaw === 'landlord' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-rose-300">brokerFee</td>
                <td className="py-2.5">{brokerFee} USDC ({brokerPct}%)</td>
                <td className="py-2.5 text-rose-400 font-semibold">{financials.rawUnits.brokerFeeMonthly}</td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => copyToClipboard(financials.rawUnits.brokerFeeMonthly, 'broker')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Copiar raw uint"
                  >
                    {copiedRaw === 'broker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-amber-300">deposit</td>
                <td className="py-2.5">{deposit} USDC</td>
                <td className="py-2.5 text-rose-400 font-semibold">{financials.rawUnits.securityDeposit}</td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => copyToClipboard(financials.rawUnits.securityDeposit, 'deposit')}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Copiar raw uint"
                  >
                    {copiedRaw === 'deposit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
