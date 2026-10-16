import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, XCircle, Info, ShieldAlert, BookOpen, Lightbulb } from 'lucide-react';
import { LegalCompliance } from '../types';

interface LegalComplianceSectionProps {
  compliance: LegalCompliance;
}

export const LegalComplianceSection: React.FC<LegalComplianceSectionProps> = ({ compliance }) => {
  const isCompliant = compliance.overallStatus === 'COMPLIANT';
  const isWarning = compliance.overallStatus === 'WARNING';

  const clauses = compliance.clauses;

  const renderRiskBadge = (risk: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (risk) {
      case 'LOW':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Riesgo Bajo (Conforme)
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Riesgo Moderado
          </span>
        );
      case 'HIGH':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Riesgo Crítico / No conforme
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-400" />
            3. Evaluación de Cumplimiento Legal (Ley de Arrendamiento Urbano)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Marco normativo: {compliance.framework}
          </p>
        </div>

        {/* Status & Score */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-500">Score Legal</div>
              <div className="text-sm font-black font-mono text-slate-100">
                {compliance.complianceScore}/100
              </div>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs bg-slate-900 border border-slate-700">
              {isCompliant ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : isWarning ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400" />
              )}
            </div>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold uppercase tracking-wider ${
              isCompliant
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : isWarning
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}
          >
            {compliance.overallStatus}
          </div>
        </div>
      </div>

      {/* 3 Core Clauses Evaluated */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Clause 1: Reajuste IPC/UF */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">Cláusula de Reajuste</span>
              {renderRiskBadge(clauses.adjustmentClause?.riskLevel || 'LOW')}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>{clauses.adjustmentClause?.present ? 'Detectada en Contrato' : 'No Detectada'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-2">
              {clauses.adjustmentClause?.mechanism || 'Sin mecanismo indexado'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {clauses.adjustmentClause?.legalAssessment}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-500">
            Regla: Reajuste objetivo por IPC / UF según derecho inmobiliario.
          </div>
        </div>

        {/* Clause 2: Multas de Salida y Desahucio */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">Multas de Salida / Desahucio</span>
              {renderRiskBadge(clauses.earlyTerminationPenalty?.riskLevel || 'LOW')}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>{clauses.earlyTerminationPenalty?.present ? 'Detectada en Contrato' : 'No Especificada'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-2">
              {clauses.earlyTerminationPenalty?.penaltyDescription || 'Sin penalización pactada'}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {clauses.earlyTerminationPenalty?.legalAssessment}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-500">
            Regla: Proporcionalidad obligatoria en indemnización por término anticipado.
          </div>
        </div>

        {/* Clause 3: Depósito de Garantía */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-200">Depósito de Garantía</span>
              {renderRiskBadge(clauses.securityDeposit?.riskLevel || 'LOW')}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>{clauses.securityDeposit?.present ? 'Detectada en Contrato' : 'No Detectada'}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 mb-2">
              Monto: {clauses.securityDeposit?.amountInMonths || 1} mes(es) • Plazo restitución: {clauses.securityDeposit?.refundTermDays || 30} días
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {clauses.securityDeposit?.legalAssessment}
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-500">
            Regla: Devolución perentoria con rendición de cuentas justificadas.
          </div>
        </div>
      </div>

      {/* Abusive Clauses Detected (Alert Zone) */}
      {compliance.abusiveClausesDetected && compliance.abusiveClausesDetected.length > 0 && (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 mb-4">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Alerta: Cláusulas Abusivas o Desproporcionadas Detectadas</span>
          </div>
          <ul className="space-y-1.5">
            {compliance.abusiveClausesDetected.map((item, idx) => (
              <li key={idx} className="text-xs text-rose-200 flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Legal Recommendations */}
      {compliance.recommendations && compliance.recommendations.length > 0 && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Lightbulb className="w-4 h-4" />
            <span>Recomendaciones Jurídicas del Oráculo RentTrust-AI</span>
          </div>
          <ul className="space-y-2">
            {compliance.recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-amber-400 font-mono font-bold shrink-0">{i + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
