import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RentTrust-AI | Oráculo Legal y Smart Contracts Avalanche C-Chain',
  description:
    'Asistente legal inmobiliario y oráculo descentralizado para contratos de arriendo en Avalanche C-Chain. División de pagos en USDC, auditoría de cláusulas y parámetros Web3.',
  openGraph: {
    title: 'RentTrust-AI | Oráculo Legal y Smart Contracts Avalanche C-Chain',
    description:
      'Asistente legal inmobiliario y oráculo descentralizado para contratos de arriendo en Avalanche C-Chain. División de pagos en USDC, auditoría de cláusulas y parámetros Web3.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
