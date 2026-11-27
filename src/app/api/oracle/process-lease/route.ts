import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import { parseEnhancedDeterministicResponse, computeContractHash } from '@/src/oracleEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contractText } = body;

    if (!contractText || typeof contractText !== 'string' || contractText.trim().length === 0) {
      return NextResponse.json(
        { error: 'contractText is required and must not be empty' },
        { status: 400 }
      );
    }

    // Try with Gemini API if key is configured
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const contractHash = computeContractHash(contractText);
        const leaseId = '0x' + crypto.createHash('sha256').update(contractHash + '_lease').digest('hex');

        const prompt = `Actúa como "RentTrust-AI", un asistente legal inmobiliario y oráculo descentralizado para contratos de arriendo en la blockchain de Avalanche (C-Chain).
Tu objetivo es procesar borradores o textos de contratos de arriendo y generar:
1. Extracción de identidades y direcciones de billetera (Arrendador, Arrendatario y Corredora).
2. Cálculo financiero exacto de la división mensual en stablecoins (USDC con 6 decimales), separando el pago neto del propietario y la comisión de la corredora.
3. Evaluación de cumplimiento legal según la ley de arrendamiento urbano (detección de cláusulas de reajuste IPC/UF, multas de salida y depósito de garantía).
4. Generación de los parámetros listos para alimentar la llamada del Smart Contract en Avalanche.
Responde ÚNICAMENTE con el objeto JSON estructurado según el esquema provisto.

Texto:
"""
${contractText.slice(0, 15000)}
"""`;

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction:
              'Eres RentTrust-AI, asistente legal inmobiliario y oráculo para contratos de arriendo en Avalanche C-Chain. Responde ÚNICAMENTE con el JSON estructurado solicitado.',
            responseMimeType: 'application/json',
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API timeout')), 4000)
        );

        const response = (await Promise.race([geminiPromise, timeoutPromise])) as any;

        if (response?.text) {
          const parsed = JSON.parse(response.text.trim());
          parsed.oracle.network = 'Avalanche C-Chain';
          parsed.oracle.chainId = 43114;
          parsed.oracle.contractVerificationHash = contractHash;
          parsed.oracle.leaseId = leaseId;
          parsed.avalancheSmartContract.chainId = 43114;
          parsed.avalancheSmartContract.testnetChainId = 43113;
          parsed.avalancheSmartContract.usdcTokenAddress = '0xB97EF82363ba55263ec6DA2Cdf220551381395E3';
          if (!parsed.avalancheSmartContract.rentVaultContractAddress) {
            parsed.avalancheSmartContract.rentVaultContractAddress = '0xC14f82029B884D5580D41c2c4F49Fa87c53e87B1';
          }
          return NextResponse.json(parsed);
        }
      } catch (apiError: any) {
        console.warn('Gemini API call bypassed, applying deterministic engine:', apiError?.message);
      }
    }

    const fallback = parseEnhancedDeterministicResponse(contractText);
    return NextResponse.json(fallback);
  } catch (err: any) {
    console.error('Error in process-lease API route:', err);
    const fallback = parseEnhancedDeterministicResponse('Arriendo');
    return NextResponse.json(fallback);
  }
}
