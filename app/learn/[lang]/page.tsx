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
  BookOpen, Code2, Lightbulb, Trophy, ChevronDown, ChevronUp,
  Target, AlertCircle, FlaskConical, Pencil
} from 'lucide-react';

const SUPPORTED_LANGS = ['python', 'javascript', 'typescript', 'java', 'c', 'rust', 'sql'];

function extractDemo(content: string): { code: string; lang: string } | null {
  const match = content.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!match) return null;
  const lang = match[1]?.toLowerCase() || '';
  if (!SUPPORTED_LANGS.includes(lang)) return null;
  return { lang, code: match[2].trim() };
}

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
    if (e.includes('no such table')) return 'Table introuvable : vérifie le nom de la table.';
    if (e.includes('no such column')) return 'Colonne introuvable : vérifie le nom de la colonne.';
    if (e.includes('syntax error')) return 'Erreur de syntaxe SQL : vérifie la structure de ta requête.';
  }
  return '';
}

function renderContent(text: string) {
  return text
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre class="bg-[#0d1117] rounded-lg p-4 my-3 overflow-x-auto text-sm text-white/80 font-mono leading-relaxed border border-white/5"><code>$1</code></pre>')
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

type Tab = 'cours' | 'demo' | 'exercice';

const difficultyLabel: Record<string, string> = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
};

const difficultyColor: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-yellow-500/20 text-yellow-400',
  advanced: 'bg-red-500/20 text-red-400',
};

const difficultyDot: Record<string, string> = {
  beginner: 'bg-green-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-red-400',
};

const CodeEditor = dynamic(() => import('@/components/editor/CodeEditor'), { ssr: false });

function LearnPageInner({ params }: { params: { lang: string } }) {
  const searchParams = useSearchParams();
  const curriculum = getCurriculum(params.lang);
  const supabase = createClient();

  const allLessons = curriculum?.chapters.flatMap(ch => ch.lessons) || [];
  const initLesson = searchParams.get('lesson')
    ? allLessons.findIndex(l => l.id === searchParams.get('lesson'))
    : 0;

  const [currentIndex, setCurrentIndex] = useState(Math.max(0, initLesson));
  const [activeTab, setActiveTab] = useState<Tab>('cours');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [outputError, setOutputError] = useState(false);
  const [running, setRunning] = useState(false);
  const [demoOutput, setDemoOutput] = useState('');
  const [demoError, setDemoError] = useState(false);
  const [demoRunning, setDemoRunning] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showExpected, setShowExpected] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const lesson = allLessons[currentIndex];
  const demo = lesson ? extractDemo(lesson.content) : null;

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
    if (lesson) {
      setCode(lesson.code);
      setOutput('');
      setOutputError(false);
      setShowHint(false);
      setShowExpected(false);
      setDemoOutput('');
      setDemoError(false);
      setActiveTab('cours');
    }
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

  const runDemo = async () => {
    if (!demo) return;
    setDemoRunning(true);
    setDemoOutput(demo.lang === 'python' ? '⏳ Chargement de Python...' : '');
    setDemoError(false);
    const result = await executeCode(demo.lang, demo.code);
    setDemoOutput(result.output);
    setDemoError(result.error);
    setDemoRunning(false);
  };

  const markComplete = async () => {
    if (!lesson || completedLessons.has(lesson.id)) return;
    setCompletedLessons(prev => new Set([...prev, lesson.id]));
    if (userId) {
      await supabase.from('progress').upsert({
        user_id: userId, language: params.lang, lesson_id: lesson.id, lesson_type: lesson.type
      });
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

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: 'cours', label: '① Cours', icon: BookOpen },
    { id: 'demo', label: '② Démo', icon: FlaskConical },
    { id: 'exercice', label: '③ Exercice', icon: Pencil },
  ];

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
            <BookOpen size={13} /> Cours complet
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/5 overflow-y-auto flex-shrink-0 py-3 hidden lg:block">
          {chapters.map(chapter => (
            <div key={chapter.id} className="mb-4">
              <p className="text-xs text-white/25 uppercase tracking-widest px-3 mb-2">{chapter.title}</p>
              {chapter.lessons.map((l) => {
                const globalIndex = allLessons.findIndex(al => al.id === l.id);
                const done = completedLessons.has(l.id);
                const active = l.id === lesson.id;
                return (
                  <button key={l.id} onClick={() => setCurrentIndex(globalIndex)}
                    className={`w-full text-left px-3 py-2 text-xs transition-all flex items-center gap-2 ${active
                      ? 'text-green-400 bg-green-500/10 border-r border-green-500'
                      : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${done ? 'bg-green-400' : difficultyDot[l.difficulty] || 'bg-white/20'} ${!done && 'opacity-50'}`} />
                    <span className="truncate flex-1">{l.title}</span>
                    {done && <CheckCircle2 size={11} className="text-green-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel — 3 tabs */}
          <div className="flex-1 flex flex-col overflow-hidden border-r border-white/5 min-w-0">
            {/* Lesson title + difficulty */}
            <div className="px-5 pt-4 pb-3 flex-shrink-0 border-b border-white/5">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${difficultyColor[lesson.difficulty]}`}>
                  {difficultyLabel[lesson.difficulty]}
                </span>
                <span className="text-xs text-white/30 flex items-center gap-1">
                  <Trophy size={11} /> {lesson.xp} XP
                </span>
                {completedLessons.has(lesson.id) && (
                  <span className="text-xs text-green-400 flex items-center gap-1 ml-auto">
                    <CheckCircle2 size={11} /> Complétée
                  </span>
                )}
              </div>
              <h1 className="text-base font-bold text-white">{lesson.title}</h1>
              <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{lesson.description}</p>
            </div>

            {/* Tab navigation */}
            <div className="flex border-b border-white/5 flex-shrink-0">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-green-400 border-b-2 border-green-400 bg-green-500/5'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                  }`}>
                  <tab.icon size={12} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto">

              {/* ① COURS */}
              {activeTab === 'cours' && (
                <div className="px-5 py-4">
                  <div className="text-sm" dangerouslySetInnerHTML={{ __html: renderContent(lesson.content) }} />
                  <button onClick={() => setActiveTab('demo')}
                    className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-sm font-medium py-3 rounded-xl transition-all">
                    <FlaskConical size={15} /> Voir la démo →
                  </button>
                </div>
              )}

              {/* ② DÉMO */}
              {activeTab === 'demo' && (
                <div className="px-5 py-4">
                  {demo ? (
                    <>
                      <p className="text-xs text-white/40 mb-3 uppercase tracking-widest">Exemple de code — exécutable</p>
                      <pre className="bg-[#0d1117] border border-white/5 rounded-xl p-4 text-sm text-white/85 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap mb-3">
                        {demo.code}
                      </pre>
                      <button onClick={runDemo} disabled={demoRunning}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all mb-3">
                        <Play size={14} fill="white" />
                        {demoRunning ? 'Exécution...' : 'Exécuter la démo'}
                      </button>
                      {demoOutput && (
                        <div className={`rounded-xl border p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap ${demoError ? 'border-red-500/20 bg-red-500/5 text-red-400' : 'border-green-500/20 bg-green-500/5 text-green-400'}`}>
                          {demoOutput}
                        </div>
                      )}
                      <button onClick={() => setActiveTab('exercice')}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 text-sm font-medium py-3 rounded-xl transition-all">
                        <Pencil size={15} /> À toi de jouer →
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <FlaskConical size={32} className="text-white/20 mx-auto mb-3" />
                      <p className="text-white/40 text-sm">Pas de démo disponible pour cette leçon.</p>
                      <button onClick={() => setActiveTab('exercice')}
                        className="mt-4 flex items-center justify-center gap-2 mx-auto bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 text-orange-400 text-sm font-medium px-6 py-2.5 rounded-xl transition-all">
                        <Pencil size={15} /> Aller à l'exercice →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ③ EXERCICE */}
              {activeTab === 'exercice' && (
                <div className="px-5 py-4">
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-4 mb-4">
                    <p className="text-xs text-orange-400 font-medium uppercase tracking-widest mb-1">Objectif</p>
                    <p className="text-sm text-white/80 leading-relaxed">{lesson.description}</p>
                  </div>

                  {/* Hint */}
                  <div className="rounded-xl overflow-hidden border border-yellow-500/20 mb-4">
                    <button onClick={() => setShowHint(!showHint)}
                      className="w-full flex items-center gap-2 px-4 py-3 bg-yellow-500/10 text-yellow-400 text-sm font-medium">
                      <Lightbulb size={14} />
                      Indice
                      {showHint ? <ChevronUp size={13} className="ml-auto" /> : <ChevronDown size={13} className="ml-auto" />}
                    </button>
                    {showHint && (
                      <div className="px-4 py-3 bg-yellow-500/5 text-white/70 text-sm"
                        dangerouslySetInnerHTML={{ __html: renderContent(lesson.hint) }} />
                    )}
                  </div>

                  {/* Expected output */}
                  {lesson.expectedOutput && (
                    <div className="rounded-xl overflow-hidden border border-purple-500/20">
                      <button onClick={() => setShowExpected(!showExpected)}
                        className="w-full flex items-center gap-2 px-4 py-3 bg-purple-500/10 text-purple-400 text-sm font-medium">
                        <Target size={14} />
                        Résultat attendu
                        {showExpected ? <ChevronUp size={13} className="ml-auto" /> : <ChevronDown size={13} className="ml-auto" />}
                      </button>
                      {showExpected && (
                        <pre className="px-4 py-3 bg-purple-500/5 font-mono text-sm text-purple-300 leading-relaxed whitespace-pre-wrap">
                          {lesson.expectedOutput}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
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
              <span className="text-xs text-white/30 ml-2">
                {params.lang === 'javascript' ? 'js' : params.lang === 'typescript' ? 'ts' : params.lang}
              </span>
              <div className="ml-auto flex items-center gap-2">
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

            {/* Output */}
            <div className="border-t border-white/5 flex flex-col flex-shrink-0" style={{ minHeight: '9rem', maxHeight: '12rem' }}>
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                <Code2 size={13} className="text-white/30" />
                <span className="text-xs text-white/40">Sortie</span>
              </div>
              <div className={`flex-1 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed whitespace-pre-wrap ${outputError ? 'text-red-400' : output ? 'text-green-400' : 'text-white/30 italic'}`}>
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
