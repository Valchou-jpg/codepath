'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { getAllLanguages } from '@/data';
import { Flame, Trophy, BookOpen, Code2, LogOut, ChevronRight, Star } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const languages = getAllLanguages();
  const [user, setUser] = useState<{ email: string; username: string; xp: number; streak: number } | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) { router.push('/auth/login'); return; }

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', authUser.id).single();
      const { data: progress } = await supabase.from('progress').select('lesson_id').eq('user_id', authUser.id);

      setUser({
        email: authUser.email || '',
        username: profile?.username || authUser.email?.split('@')[0] || 'Codeur',
        xp: profile?.xp || 0,
        streak: profile?.streak || 0,
      });
      setCompletedLessons(progress?.map((p: { lesson_id: string }) => p.lesson_id) || []);
      setLoading(false);
    }
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
    </div>
  );

  const level = Math.floor((user?.xp || 0) / 100) + 1;
  const xpInLevel = (user?.xp || 0) % 100;

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center text-black font-bold text-sm">CP</div>
          <span className="font-semibold text-white">CodePath</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/courses" className="text-sm text-white/60 hover:text-white transition-colors">Cours</Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors">
            <LogOut size={15} /> Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-1">
            Bonjour, <span className="text-gradient">{user?.username}</span> 👋
          </h1>
          <p className="text-white/50">Continue ta progression !</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Star, label: 'Niveau', value: level, color: 'text-yellow-400' },
            { icon: Trophy, label: 'XP total', value: `${user?.xp || 0} XP`, color: 'text-green-400' },
            { icon: Flame, label: 'Streak', value: `${user?.streak || 0} jours`, color: 'text-orange-400' },
            { icon: BookOpen, label: 'Leçons', value: completedLessons.length, color: 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-xl p-5">
              <stat.icon size={20} className={`${stat.color} mb-3`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* XP progress */}
        <div className="glass rounded-xl p-5 mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Progression vers le niveau {level + 1}</span>
            <span className="text-sm text-white/60">{xpInLevel}/100 XP</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${xpInLevel}%` }} />
          </div>
        </div>

        {/* Languages */}
        <h2 className="text-xl font-semibold text-white mb-5">Continuer l'apprentissage</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {languages.map(lang => (
            <Link key={lang.id} href={`/learn/${lang.id}`}
              className="glass glass-hover rounded-xl p-5 flex items-center gap-4 group transition-all">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: lang.color + '20' }}>
                {lang.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">{lang.name}</span>
                </div>
                <p className="text-xs text-white/40 truncate">{lang.description}</p>
              </div>
              <ChevronRight size={18} className="text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Link href="/courses" className="glass glass-hover rounded-xl p-5 flex items-center gap-4 group">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <BookOpen size={22} className="text-purple-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Cours théoriques</div>
              <p className="text-xs text-white/40">Lire les cours sans exercices</p>
            </div>
          </Link>
          <Link href="/learn" className="glass glass-hover rounded-xl p-5 flex items-center gap-4 group">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Code2 size={22} className="text-cyan-400" />
            </div>
            <div>
              <div className="font-semibold text-white">Exercices pratiques</div>
              <p className="text-xs text-white/40">Coder et progresser</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
