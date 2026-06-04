'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Eye, EyeOff, Github } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
    if (error) { setError(error.message); setLoading(false); }
    else setSuccess(true);
  };

  const handleGithub = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: `${window.location.origin}/dashboard` } });
  };

  if (success) return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="text-center glass rounded-2xl p-12 max-w-md">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="text-xl font-bold text-white mb-2">Vérifie tes emails !</h2>
        <p className="text-white/50">Un lien de confirmation a été envoyé à <strong className="text-white">{email}</strong></p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-400 rounded-lg flex items-center justify-center text-black font-bold text-sm">CP</div>
            <span className="font-semibold text-white">CodePath</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Crée ton compte</h1>
          <p className="text-white/50 mt-1">Gratuit · Aucune carte requise</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <button onClick={handleGithub} className="w-full flex items-center justify-center gap-2 glass glass-hover py-3 rounded-xl text-white/80 hover:text-white text-sm font-medium transition-all mb-6">
            <Github size={18} /> Continuer avec GitHub
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">ou</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 transition-colors"
                placeholder="toi@exemple.com" />
            </div>
            <div>
              <label className="text-sm text-white/60 mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 transition-colors"
                  placeholder="Minimum 8 caractères" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all">
              {loading ? 'Création...' : 'Créer mon compte'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="text-green-400 hover:text-green-300">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
