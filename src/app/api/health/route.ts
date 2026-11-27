import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    service: 'RentTrust-AI Oracle Next.js',
    network: 'Avalanche C-Chain',
    chainId: 43114,
    fujiChainId: 43113,
    usdcAddress: '0xB97EF82363ba55263ec6DA2Cdf220551381395E3',
    geminiAvailable: Boolean(process.env.GEMINI_API_KEY),
  });
}
