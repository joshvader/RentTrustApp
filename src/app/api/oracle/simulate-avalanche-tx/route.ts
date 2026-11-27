import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leaseId, landlord, tenant, broker, rentTotal, deposit } = body;
    const txHash = '0x' + crypto.randomBytes(32).toString('hex');
    const blockNumber = 48920150 + Math.floor(Math.random() * 100);
    const gasUsed = 124500 + Math.floor(Math.random() * 8500);

    return NextResponse.json({
      status: 'SUCCESS',
      transactionHash: txHash,
      network: 'Avalanche C-Chain (Fuji Testnet / Mainnet)',
      chainId: 43113,
      blockNumber,
      gasUsed,
      gasPriceGwei: '25.5 nAVAX',
      blockExplorerUrl: `https://snowtrace.io/tx/${txHash}`,
      fujiExplorerUrl: `https://testnet.snowtrace.io/tx/${txHash}`,
      eventsEmitted: [
        {
          event: 'LeaseStreamCreated',
          leaseId: leaseId || '0x' + crypto.randomBytes(32).toString('hex'),
          landlord,
          tenant,
          broker,
          rentTotalUsdcUnits: rentTotal,
          depositUsdcUnits: deposit,
        },
        {
          event: 'OracleAttestationVerified',
          oracleSigner: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
          timestamp: Math.floor(Date.now() / 1000),
        },
      ],
    });
  } catch (err: any) {
    console.error('Error in simulate-avalanche-tx:', err);
    return NextResponse.json({ error: 'Simulation failed' }, { status: 500 });
  }
}
