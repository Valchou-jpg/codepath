'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, BookOpen, Trophy, Users, ArrowRight, Zap, Shield, Globe } from 'lucide-react';

const languages = [
  { id: 'python', name: 'Python', icon: '🐍', color: '#3B82F6' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', color: '#F59E0B' },
  { id: 'typescript', name: 'TypeScript', icon: '🔷', color: '#60A5FA' },
  { id: 'java', name: 'Java', icon: '☕', color: '#EF4444' },
  { id: 'c', name: 'C', icon: '⚙️', color: '#8B5CF6' },
  { id: 'sql', name: 'SQL', icon: '🗄️', color: '#10B981' },
  { id: 'rust', name: 'Rust', icon: '🦀', color: '#F97316' },
];

const features = [
  { icon: Code2, title: 'Éditeur Monaco', desc: 'Le même éditeur que VS Code, directement dans le navigateur.' },
  { icon: BookOpen, title: 'Cours complets', desc: 'Théorie détaillée + exercices pratiques pour chaque concept.' },
  { icon: Trophy, title: 'Progression', desc: 'XP, streaks et certificats pour rester motivé.' },
  { icon: Zap, title: 'Exécution en direct', desc: 'Teste ton code instantanément sans rien installer.' },
  { icon: Shield, title: 'Compte sécurisé', desc: 'Progression sauvegardée et synchronisée partout.' },
  { icon: Globe, title: 'Multi-langages', desc: '7 langages couverts, de Python à Rust.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center text-black font-bold text-sm">
            CP
          </div>
          <span className="font-semibold text-white">CodePath</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-2">
            Se connecter
          </Link>
          <Link href="/auth/signup" className="text-sm bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Commencer gratuitement
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-white/60 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            7 langages · Cours + Exercices · Progression sauvegardée
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Apprends à coder<br />
            <span className="text-gradient">sans limite</span>
          </h1>
          
          <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Des cours complets + des exercices interactifs pour maîtriser tous les langages. 
            De Python à Rust, avec un vrai éditeur de code intégré.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg">
              Commencer gratuitement <ArrowRight size={20} />
            </Link>
            <Link href="/courses" className="flex items-center justify-center gap-2 glass glass-hover text-white px-8 py-4 rounded-xl transition-all text-lg">
              Voir les cours
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Languages */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-white/40 text-sm mb-8 uppercase tracking-widest">Langages disponibles</p>
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/courses/${lang.id}`}
                  className="flex items-center gap-2.5 glass glass-hover px-5 py-3 rounded-xl transition-all group">
                  <span className="text-xl">{lang.icon}</span>
                  <span className="text-white/80 group-hover:text-white text-sm font-medium">{lang.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Tout ce qu'il faut pour apprendre
          </h2>
          <p className="text-white/40 text-center mb-16">Une plateforme conçue pour te faire progresser vraiment.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center border-t border-white/5">
        <h2 className="text-4xl font-bold text-white mb-4">Prêt à coder ?</h2>
        <p className="text-white/50 mb-8">Gratuit. Aucune carte bancaire requise.</p>
        <Link href="/auth/signup"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg">
          Créer mon compte <ArrowRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-white/30 text-sm">
        © 2024 CodePath — Apprends à coder
      </footer>
    </div>
  );
}
