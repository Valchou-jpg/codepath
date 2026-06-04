'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { getAllLanguages, getCurriculum } from '@/data';
import { Flame, Trophy, BookOpen, Code2, LogOut, ChevronRight, Star, Medal } from 'lucide-react';

type LeaderEntry = { username: string; xp: number; streak: number };

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const languages = getAllLanguages();
  const [user, setUser] = useState<{ email: string; username: string; xp: number; streak: number } | null>(null);
  const [completedByLang, setCompletedByLang] = useState<Record<string, number>>({});
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) { router.push('/auth/login'); return; }

      const [{ data: profile }, { data: progress }, { data: leaders }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', authUser.id).single(),
        supabase.from('progress').select('language').eq('user_id', authUser.id),
        supabase.from('profiles').select('username, xp, streak').order('xp', { ascending: false }).limit(5),
      ]);

      setUser({
        email: authUser.email || '',
        username: profile?.username || authUser.email?.split('@')[0] || 'Codeur',
        xp: profile?.xp || 0,
        streak: profile?.streak || 0,
      });

      // Count completed per language
      const byLang: Record<string, number> = {};
      progress?.forEach((p: { language: string }) => {
        byLang[p.language] = (byLang[p.language] || 0) + 1;
      });
      setCompletedByLang(byLang);
      setLeaderboard(leaders || []);
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
  const totalCompleted = Object.values(completedByLang).reduce((a, b) => a + b, 0);

  const medalColors = ['text-yellow-400', 'text-gray-300', 'text-orange-400'];

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">
            Bonjour, <span className="text-gradient">{user?.username}</span> 👋
          </h1>
          <p className="text-white/50">Continue ta progression !</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Star, label: 'Niveau', value: level, color: 'text-yellow-400' },
            { icon: Trophy, label: 'XP total', value: `${user?.xp || 0} XP`, color: 'text-green-400' },
            { icon: Flame, label: 'Streak', value: `${user?.streak || 0} j`, color: 'text-orange-400' },
            { icon: BookOpen, label: 'Leçons', value: totalCompleted, color: 'text-blue-400' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-xl p-5">
              <stat.icon size={20} className={`${stat.color} mb-3`} />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* XP bar */}
        <div className="glass rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Niveau {level} → {level + 1}</span>
            <span className="text-sm text-white/60">{xpInLevel}/100 XP</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-500"
              style={{ width: `${xpInLevel}%` }} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Progression par langage */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-white mb-4">Progression par langage</h2>
            <div className="space-y-3">
              {languages.map(lang => {
                const curriculum = getCurriculum(lang.id);
                const total = curriculum?.chapters.flatMap(ch => ch.lessons).length || 0;
                const done = completedByLang[lang.id] || 0;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <Link key={lang.id} href={`/learn/${lang.id}`}
                    className="glass glass-hover rounded-xl p-4 flex items-center gap-4 group transition-all block">
                    <span className="text-2xl flex-shrink-0">{lang.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-white">{lang.name}</span>
                        <span className="text-xs text-white/40">{done}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: lang.color }} />
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <span className="text-xs text-white/40">{pct}%</span>
                      <ChevronRight size={15} className="text-white/20 group-hover:text-white/50 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Medal size={18} className="text-yellow-400" /> Classement
            </h2>
            <div className="glass rounded-xl overflow-hidden">
              {leaderboard.length === 0 ? (
                <div className="p-6 text-center text-white/30 text-sm">Aucun classement disponible</div>
              ) : (
                leaderboard.map((entry, i) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < leaderboard.length - 1 ? 'border-b border-white/5' : ''} ${entry.username === user?.username ? 'bg-green-500/5' : ''}`}>
                    <span className={`text-sm font-bold w-5 text-center ${medalColors[i] || 'text-white/40'}`}>
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
                    </span>
                    <span className={`text-sm flex-1 truncate ${entry.username === user?.username ? 'text-green-400 font-medium' : 'text-white/70'}`}>
                      {entry.username}
                      {entry.username === user?.username && ' (toi)'}
                    </span>
                    <span className="text-xs text-white/40">{entry.xp} XP</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/courses" className="glass glass-hover rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                <BookOpen size={20} className="text-purple-400" />
                <span className="text-xs text-white/60">Cours théoriques</span>
              </Link>
              <Link href="/learn" className="glass glass-hover rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                <Code2 size={20} className="text-cyan-400" />
                <span className="text-xs text-white/60">Exercices</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
