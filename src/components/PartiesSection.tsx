import React, { useState } from 'react';
import { UserCheck, Building2, KeyRound, Copy, Check, ShieldCheck, Mail, Hash } from 'lucide-react';
import { PartyIdentity } from '../types';

interface PartiesSectionProps {
  parties: {
    landlord: PartyIdentity;
    tenant: PartyIdentity;
    broker: PartyIdentity;
  };
}

export const PartiesSection: React.FC<PartiesSectionProps> = ({ parties }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyAddress = (address: string, key: string) => {
    navigator.clipboard.writeText(address);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cards = [
    {
      key: 'landlord',
      title: 'Propietario / Arrendador',
      roleBadge: 'LANDLORD (Beneficiario Neto)',
      roleColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: <KeyRound className="w-5 h-5 text-emerald-400" />,
      name: parties.landlord?.fullName || 'Propietario Registrado',
      idNumber: parties.landlord?.idNumber || 'Sin C.I. especificada',
      wallet: parties.landlord?.walletAddress,
      email: parties.landlord?.email || 'propietario@arriendo.chain',
      description: 'Recibe el canon de arriendo neto mensual en USDC de manera directa y desintermediada en Avalanche C-Chain.',
    },
    {
      key: 'tenant',
      title: 'Arrendatario / Inquilino',
      roleBadge: 'TENANT (Deudor / Pagador)',
      roleColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: <UserCheck className="w-5 h-5 text-blue-400" />,
      name: parties.tenant?.fullName || 'Inquilino Registrado',
      idNumber: parties.tenant?.idNumber || 'Sin C.I. especificada',
      wallet: parties.tenant?.walletAddress,
      email: parties.tenant?.email || 'inquilino@arriendo.chain',
      description: 'Deposita mensualmente el canon en USDC en el smart contract y custodia el mes de garantía de cumplimiento.',
    },
    {
      key: 'broker',
      title: 'Corredora / Broker Inmobiliario',
      roleBadge: 'BROKER (Comisión Automatizada)',
      roleColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      icon: <Building2 className="w-5 h-5 text-rose-400" />,
      name: parties.broker?.agencyName || parties.broker?.agentName || 'Corredora Inmobiliaria',
      idNumber: parties.broker?.idNumber || (parties.broker?.agentName ? `Agente: ${parties.broker.agentName}` : 'RUT Agencia'),
      wallet: parties.broker?.walletAddress,
      email: parties.broker?.email || 'contacto@corredora.chain',
      description: 'Percibe automáticamente su porcentaje de honorarios de corretaje sin depender de transferencias manuales.',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            1. Identidades y Direcciones de Billetera (Avalanche C-Chain)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Extracción de partes contratantes, identificación tributaria y validación de direcciones EVM (0x format).
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-300">
          <span>Avalanche C-Chain Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.key}
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  {c.icon}
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c.roleColor}`}>
                  {c.roleBadge}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-100 leading-snug">{c.name}</h4>

              {c.idNumber && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-mono">
                  <Hash className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>RUT / ID: {c.idNumber}</span>
                </div>
              )}

              {c.email && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate">{c.email}</span>
                </div>
              )}

              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80 leading-relaxed">
                {c.description}
              </p>
            </div>

            {/* Wallet Address Box */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-semibold text-slate-300">Billetera Avalanche C-Chain:</span>
                <span className="text-emerald-400 font-mono text-[10px]">Checksum OK</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-mono text-xs text-rose-300 truncate mr-2 select-all">
                  {c.wallet || '0x0000000000000000000000000000000000000000'}
                </span>
                <button
                  onClick={() => c.wallet && copyAddress(c.wallet, c.key)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                  title="Copiar dirección"
                >
                  {copiedKey === c.key ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
