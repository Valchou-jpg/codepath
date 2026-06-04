'use client';
import Link from 'next/link';
import { getAllLanguages } from '@/data';
import { BookOpen, ArrowRight, ChevronLeft } from 'lucide-react';

export default function CoursesPage() {
  const languages = getAllLanguages();

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm">
          <ChevronLeft size={16} /> Dashboard
        </Link>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center text-black font-bold text-xs">CP</div>
          <span className="font-semibold text-white text-sm">CodePath</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <BookOpen size={20} className="text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Cours théoriques</h1>
          </div>
          <p className="text-white/50 ml-14">
            Lis les cours complets sans exercices. Idéal pour une lecture rapide ou une révision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {languages.map(lang => (
            <Link key={lang.id} href={`/courses/${lang.id}`}
              className="glass glass-hover rounded-2xl p-6 group transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: lang.color + '20' }}>
                  {lang.icon}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">{lang.name}</h2>
                  <p className="text-sm text-white/50 leading-relaxed mt-1">{lang.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap mb-4">
                {lang.usedFor.map(use => (
                  <span key={use} className="text-xs px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: lang.color + '20', color: lang.color }}>
                    {use}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-white/40 group-hover:text-white/70 transition-colors">
                Lire le cours <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
