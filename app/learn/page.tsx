import Link from 'next/link';
import { getAllLanguages } from '@/data';
import { ChevronLeft, Code2 } from 'lucide-react';

export default function LearnIndexPage() {
  const languages = getAllLanguages();
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm">
          <ChevronLeft size={16} /> Dashboard
        </Link>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
            <Code2 size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Exercices pratiques</h1>
            <p className="text-white/50 mt-0.5">Choisis un langage pour commencer</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {languages.map(lang => (
            <Link key={lang.id} href={`/learn/${lang.id}`}
              className="glass glass-hover rounded-2xl p-6 group flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: lang.color + '20' }}>
                {lang.icon}
              </div>
              <div>
                <h2 className="font-semibold text-white group-hover:text-green-400 transition-colors">{lang.name}</h2>
                <p className="text-sm text-white/40 mt-0.5">{lang.description.substring(0, 60)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
