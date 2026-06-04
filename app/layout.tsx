import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'CodePath — Apprends à coder gratuitement',
  description: 'Plateforme gratuite pour apprendre Python, JavaScript, Java, C, Rust, SQL et TypeScript avec un éditeur de code intégré, des exercices interactifs et un suivi de progression.',
  keywords: ['apprendre à coder', 'cours programmation', 'Python', 'JavaScript', 'Java', 'exercices code', 'débutant', 'gratuit'],
  authors: [{ name: 'CodePath' }],
  openGraph: {
    title: 'CodePath — Apprends à coder gratuitement',
    description: 'Cours + exercices interactifs pour maîtriser 7 langages de programmation. Éditeur de code intégré, progression sauvegardée, 100% gratuit.',
    url: 'https://codepath-tan.vercel.app',
    siteName: 'CodePath',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodePath — Apprends à coder gratuitement',
    description: 'Cours + exercices interactifs pour maîtriser Python, JavaScript, Java, C, Rust, SQL et TypeScript.',
  },
  metadataBase: new URL('https://codepath-tan.vercel.app'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0A0A0F] text-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
