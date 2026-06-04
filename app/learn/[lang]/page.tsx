'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getCurriculum } from '@/data';
import { createClient } from '@/lib/supabase';
import { executeCode } from '@/lib/executor';
import {
  ChevronLeft, ChevronRight, Play, RotateCcw, CheckCircle2,
  BookOpen, Code2, Lightbulb, Trophy, ChevronDown, ChevronUp, Target, AlertCircle
} from 'lucide-react';

function explainError(error: string, language: string): string {
  const e = error.toLowerCase();
  if (language === 'python') {
    if (e.includes('syntaxerror')) return 'Erreur de syntaxe : vérifie tes parenthèses, guillemets et indentation.';
    if (e.includes('nameerror')) return 'Variable non définie : vérifie l\'orthographe ou déclare la variable avant usage.';
    if (e.includes('typeerror')) return 'Mauvais type : tu utilises une valeur avec une opération incompatible.';
    if (e.includes('indentationerror')) return 'Indentation incorrecte : utilise exactement 4 espaces.';
    if (e.includes('indexerror')) return 'Index hors limites : la liste est plus courte que tu ne le penses.';
    if (e.includes('zerodivisionerror')) return 'Division par zéro ! Vérifie que ton diviseur n\'est pas 0.';
    if (e.includes('attributeerror')) return 'Attribut inexistant : cette méthode ou propriété n\'existe pas sur cet objet.';
  }
  if (language === 'javascript' || language === 'typescript') {
    if (e.includes('syntaxerror')) return 'Erreur de syntaxe : vérifie tes accolades, parenthèses et virgules.';
    if (e.includes('is not defined')) return 'Variable non définie : déclare la variable avec let, const ou var.';
    if (e.includes('cannot read properties')) return 'Tu accèdes à une propriété d\'une valeur undefined ou null.';
    if (e.includes('typeerror')) return 'Mauvais type : vérifie les types de tes variables.';
  }
  if (language === 'java') {
    if (e.includes('cannot find symbol')) return 'Symbole introuvable : vérifie les noms de tes variables et méthodes.';
    if (e.includes("';' expected")) return 'Point-virgule manquant à la fin d\'une instruction.';
    if (e.includes('nullpointerexception')) return 'NullPointerException : tu utilises un objet qui vaut null.';
    if (e.includes('arrayindexoutofbounds')) return 'Index de tableau hors limites : vérifie la taille de ton tableau.';
    if (e.includes('illegal start of expression')) return 'Erreur de syntaxe : une accolade ou parenthèse est mal placée.';
  }
  if (language === 'c') {
    if (e.includes('undeclared')) return 'Variable non déclarée : déclare ton type avant d\'utiliser la variable.';
    if (e.includes('segmentation fault')) return 'Segmentation fault : accès mémoire invalide. Vérifie tes pointeurs.';
    if (e.includes('implicit declaration')) return 'Fonction non déclarée : ajoute le #include correspondant en haut.';
  }
  if (language === 'rust') {
    if (e.includes('cannot borrow')) return 'Erreur d\'ownership : une valeur ne peut être empruntée qu\'une fois à la fois.';
    if (e.includes('use of moved value')) return 'Valeur déplacée : après un move, tu ne peux plus utiliser la variable.';
    if (e.includes('mismatched types')) return 'Types incompatibles : vérifie que tes types correspondent.';
  }
  if (language === 'sql') {
    if (e.includes('no such table')) return 'Table introuvable : vérifie le nom de la table (utilise les tables disponibles dans l\'exercice).';
    if (e.includes('no such column')) return 'Colonne introuvable : vérifie le nom de la colonne.';
    if (e.includes('syntax error')) return 'Erreur de syntaxe SQL : vérifie la structure de ta requête.';
  }
  return '';
}

const CodeEditor = dynamic(() => import('@/components/editor/CodeEditor'), { ssr: false });

function renderContent(text: string) {
  return text
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="bg-[#0d1117] rounded-lg p-4 my-3 overflow-x-auto text-sm text-white/80 font-mono leading-relaxed"><code>$1</code></pre>')
    .replace(/`([^`\n]+)`/g, '<code class="bg-white/10 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-semibold text-white mt-5 mb-2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-medium text-white/90 mt-4 mb-2">$1</h3>')
    .replace(/^\| (.+) \|$/gm, (_, c) => '<tr class="border-b border-white/5">' + c.split(' | ').map((cell: string) => `<td class="py-1.5 pr-4 text-white/70 text-sm">${cell}</td>`).join('') + '</tr>')
    .replace(/(<tr.*<\/tr>\n?)+/g, m => `<table class="my-3 w-full">${m}</table>`)
    .replace(/^- (.+)$/gm, '<li class="text-white/70 text-sm ml-4 mb-1 list-disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul class="my-2">${m}</ul>`)
    .replace(/\n\n+/g, '<br/><br/>');
}

function LearnPageInner({ params }: { params: { lang: string } }) {
  const searchParams = useSearchParams();
  const curriculum = getCurriculum(params.lang);
  const supabase = createClient();

  const allLessons = curriculum?.chapters.flatMap(ch => ch.lessons) || [];
  const initLesson = searchParams.get('lesson')
    ? allLessons.findIndex(l => l.id === searchParams.get('lesson'))
    : 0;

  const [currentIndex, setCurrentIndex] = useState(Math.max(0, initLesson));
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [outputError, setOutputError] = useState(false);
  const [running, setRunning] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showExpected, setShowExpected] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const lesson = allLessons[currentIndex];

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        supabase.from('progress').select('lesson_id').eq('user_id', user.id).then(({ data }) => {
          if (data) setCompletedLessons(new Set(data.map((p: { lesson_id: string }) => p.lesson_id)));
        });
      }
    });
  }, []);

  useEffect(() => {
    if (lesson) { setCode(lesson.code); setOutput(''); setOutputError(false); setShowHint(false); setShowExpected(false); }
  }, [currentIndex, lesson?.id]);

  const runCode = async () => {
    setRunning(true);
    setOutput(params.lang === 'python' ? '⏳ Chargement de Python (première fois uniquement)...' : '');
    setOutputError(false);
    const result = await executeCode(params.lang, code);
    setOutput(result.output);
    setOutputError(result.error);
    setRunning(false);
  };

  const markComplete = async () => {
    if (!lesson || completedLessons.has(lesson.id)) return;
    setCompletedLessons(prev => new Set([...prev, lesson.id]));
    if (userId) {
      await supabase.from('progress').upsert({
        user_id: userId, language: params.lang, lesson_id: lesson.id, lesson_type: lesson.type
      });
      // Update XP
      const { error: rpcError } = await supabase.rpc('increment_xp', { user_id: userId, amount: lesson.xp });
      if (rpcError) {
        await supabase.from('profiles').update({ xp: lesson.xp }).eq('id', userId);
      }
    }
  };

  const goNext = async () => {
    await markComplete();
    if (currentIndex < allLessons.length - 1) setCurrentIndex(i => i + 1);
  };

  if (!curriculum || !lesson) return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center text-white/50">
      Langage introuvable. <Link href="/dashboard" className="text-green-400 ml-2">Retour</Link>
    </div>
  );

  const { language, chapters } = curriculum;
  const chapterForLesson = chapters.find(ch => ch.lessons.some(l => l.id === lesson.id));
  const progress = (completedLessons.size / allLessons.length) * 100;

  return (
    <div className="h-screen bg-[#0A0A0F] flex flex-col overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center px-4 py-3 border-b border-white/5 flex-shrink-0 gap-3">
        <Link href="/dashboard" className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors text-sm">
          <ChevronLeft size={15} />
        </Link>
        <span className="text-lg">{language.icon}</span>
        <span className="font-semibold text-white text-sm">{language.name}</span>
        <span className="text-white/30 text-sm hidden md:block">— {chapterForLesson?.title}</span>
        
        <div className="flex-1 mx-4 hidden md:flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all"
              style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs text-white/40">{completedLessons.size}/{allLessons.length}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link href={`/courses/${language.id}`} className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 glass px-3 py-1.5 rounded-lg transition-all">
            <BookOpen size={13} /> Cours
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/5 overflow-y-auto flex-shrink-0 py-3 hidden lg:block">
          {chapters.map(chapter => (
            <div key={chapter.id} className="mb-3">
              <p className="text-xs text-white/25 uppercase tracking-widest px-3 mb-1.5">{chapter.title}</p>
              {chapter.lessons.map((l, gi) => {
                const globalIndex = allLessons.findIndex(al => al.id === l.id);
                const done = completedLessons.has(l.id);
                const active = l.id === lesson.id;
                return (
                  <button key={l.id} onClick={() => setCurrentIndex(globalIndex)}
                    className={`w-full text-left px-3 py-2 text-xs transition-all flex items-center gap-2 ${active
                      ? 'text-green-400 bg-green-500/10 border-r border-green-500'
                      : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${done ? 'bg-green-500/20 text-green-400' : active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/30'}`}>
                      {done ? '✓' : gi + 1}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: lesson content */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-white/5">
            {/* Lesson header */}
            <div className="px-5 pt-5 pb-0 flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  lesson.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  lesson.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'}`}>
                  {lesson.difficulty}
                </span>
                <span className="text-xs text-white/30 flex items-center gap-1">
                  <Trophy size={11} /> {lesson.xp} XP
                </span>
                {completedLessons.has(lesson.id) && (
                  <span className="text-xs text-green-400 flex items-center gap-1"><CheckCircle2 size={11} /> Complétée</span>
                )}
              </div>
              <h1 className="text-xl font-bold text-white mb-1">{lesson.title}</h1>
              <p className="text-sm text-white/50 leading-relaxed mb-4">{lesson.description}</p>
              
              <button onClick={() => setShowContent(!showContent)}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 mb-3 transition-colors">
                {showContent ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {showContent ? 'Masquer le cours' : 'Voir le cours'}
              </button>
            </div>

            {/* Lesson content (collapsible) */}
            {showContent && (
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: renderContent(lesson.content) }} />
                
                {/* Hint */}
                <div className="mt-4 rounded-xl overflow-hidden border border-yellow-500/20">
                  <button onClick={() => setShowHint(!showHint)}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-yellow-500/10 text-yellow-400 text-sm font-medium">
                    <Lightbulb size={15} />
                    Indice
                    {showHint ? <ChevronUp size={13} className="ml-auto" /> : <ChevronDown size={13} className="ml-auto" />}
                  </button>
                  {showHint && (
                    <div className="px-4 py-3 bg-yellow-500/5 text-white/70 text-sm"
                      dangerouslySetInnerHTML={{ __html: renderContent(lesson.hint) }} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right: editor + output */}
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            {/* Editor toolbar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs text-white/30 ml-2">solution.{params.lang === 'javascript' ? 'js' : params.lang === 'typescript' ? 'ts' : params.lang}</span>
              <div className="ml-auto flex items-center gap-2">
                {lesson.expectedOutput && (
                  <button onClick={() => setShowExpected(!showExpected)} title="Résultat attendu"
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all ${showExpected ? 'bg-purple-500/20 text-purple-400' : 'text-white/30 hover:text-white/70 hover:bg-white/5'}`}>
                    <Target size={13} /> Attendu
                  </button>
                )}
                <button onClick={() => setCode(lesson.code)} title="Réinitialiser"
                  className="p-1.5 text-white/30 hover:text-white/70 hover:bg-white/5 rounded transition-all">
                  <RotateCcw size={14} />
                </button>
                <button onClick={runCode} disabled={running}
                  className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black font-semibold text-xs px-4 py-1.5 rounded-lg transition-all">
                  <Play size={13} fill="black" /> {running ? 'Exécution...' : 'Exécuter'}
                </button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
              <CodeEditor
                language={params.lang}
                value={code}
                onChange={setCode}
                height="100%"
              />
            </div>

            {/* Expected output panel */}
            {showExpected && lesson.expectedOutput && (
              <div className="border-t border-purple-500/20 bg-purple-500/5 flex-shrink-0">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-purple-500/10">
                  <Target size={13} className="text-purple-400" />
                  <span className="text-xs text-purple-400 font-medium">Résultat attendu</span>
                </div>
                <pre className="px-4 py-3 font-mono text-sm text-purple-300 leading-relaxed whitespace-pre-wrap">{lesson.expectedOutput}</pre>
              </div>
            )}

            {/* Output */}
            <div className="border-t border-white/5 flex flex-col flex-shrink-0" style={{ minHeight: '9rem', maxHeight: '12rem' }}>
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                <Code2 size={13} className="text-white/30" />
                <span className="text-xs text-white/40">Sortie</span>
              </div>
              <div className={`flex-1 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed ${outputError ? 'text-red-400' : output ? 'text-green-400' : 'text-white/30 italic'}`}>
                {output || 'Exécute ton code pour voir le résultat...'}
              </div>
              {outputError && output && (() => {
                const explanation = explainError(output, params.lang);
                return explanation ? (
                  <div className="flex items-start gap-2 px-4 py-2 bg-yellow-500/10 border-t border-yellow-500/20 text-xs text-yellow-300">
                    <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
                    <span>{explanation}</span>
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 flex-shrink-0">
        <button onClick={() => currentIndex > 0 && setCurrentIndex(i => i - 1)}
          disabled={currentIndex === 0}
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft size={16} /> Précédent
        </button>
        
        <span className="text-xs text-white/30">{currentIndex + 1} / {allLessons.length}</span>

        <button onClick={goNext}
          className="flex items-center gap-1.5 text-sm bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">
          {currentIndex < allLessons.length - 1 ? (
            <><CheckCircle2 size={15} /> Terminer & Suivant <ChevronRight size={15} /></>
          ) : (
            <><Trophy size={15} /> Terminer le cours</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function LearnPage({ params }: { params: { lang: string } }) {
  return (
    <Suspense>
      <LearnPageInner params={params} />
    </Suspense>
  );
}
