export interface OracleMetadata {
  name: string;
  version: string;
  network: string;
  chainId: number;
  timestamp: number;
  oracleSigner: string;
  contractVerificationHash: string;
  leaseId: string;
}

export interface PartyIdentity {
  fullName?: string;
  agencyName?: string;
  agentName?: string;
  idNumber?: string;
  walletAddress: string;
  role: string;
  email?: string;
}

export interface FinancialBreakdown {
  tokenSymbol: string;
  tokenDecimals: number;
  usdcContractAddress: string;
  monthlyRentTotalUsdc: number;
  brokerFeePercentage: number;
  brokerFeeMonthlyUsdc: number;
  landlordNetMonthlyUsdc: number;
  securityDepositUsdc: number;
  paymentDay: number;
  leaseDurationMonths: number;
  currencyOriginal?: string;
  rawUnits: {
    monthlyRentTotal: string;
    brokerFeeMonthly: string;
    landlordNetMonthly: string;
    securityDeposit: string;
  };
}

export interface LegalClauseDetail {
  present: boolean;
  mechanism?: string;
  penaltyDescription?: string;
  amountInMonths?: number;
  refundTermDays?: number;
  legalAssessment: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface LegalCompliance {
  framework: string;
  overallStatus: 'COMPLIANT' | 'WARNING' | 'NON_COMPLIANT';
  complianceScore: number;
  clauses: {
    adjustmentClause: LegalClauseDetail;
    earlyTerminationPenalty: LegalClauseDetail;
    securityDeposit: LegalClauseDetail;
  };
  abusiveClausesDetected: string[];
  recommendations: string[];
}

export interface AvalancheSmartContractParams {
  targetNetwork: string;
  chainId: number;
  testnetChainId: number;
  usdcTokenAddress: string;
  rentVaultContractAddress: string;
  method: string;
  parameters: {
    leaseId: string;
    landlord: string;
    tenant: string;
    broker: string;
    rentTotal: string;
    landlordNet: string;
    brokerFee: string;
    deposit: string;
    paymentDay: number;
    durationMonths: number;
    contractHash: string;
  };
  solidityInterface: string;
  calldataHex: string;
  web3CallSnippet: string;
  oracleSignature: string;
}

export interface RentTrustOracleResponse {
  oracle: OracleMetadata;
  parties: {
    landlord: PartyIdentity;
    tenant: PartyIdentity;
    broker: PartyIdentity;
  };
  financialBreakdown: FinancialBreakdown;
  legalCompliance: LegalCompliance;
  avalancheSmartContract: AvalancheSmartContractParams;
}

export interface SimulationResult {
  status: string;
  transactionHash: string;
  network: string;
  chainId: number;
  blockNumber: number;
  gasUsed: number;
  gasPriceGwei: string;
  blockExplorerUrl: string;
  fujiExplorerUrl: string;
  eventsEmitted: Array<{
    event: string;
    leaseId?: string;
    landlord?: string;
    tenant?: string;
    broker?: string;
    rentTotalUsdcUnits?: string;
    depositUsdcUnits?: string;
    oracleSigner?: string;
    timestamp?: number;
  }>;
}
