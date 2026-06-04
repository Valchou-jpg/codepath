import { NextRequest, NextResponse } from 'next/server';

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

const LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
  c:    { language: 'c',    version: '10.2.0' },
  java: { language: 'java', version: '15.0.2' },
  rust: { language: 'rust', version: '1.50.0' },
};

export async function POST(req: NextRequest) {
  const { language, code } = await req.json();

  const lang = LANGUAGE_MAP[language];
  if (!lang) {
    return NextResponse.json({
      output: `L'exécution de ${language.toUpperCase()} n'est pas encore supportée.`,
      error: false,
    });
  }

  try {
    const res = await fetch(PISTON_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: lang.language,
        version: lang.version,
        files: [{ content: code }],
      }),
    });

    const data = await res.json();
    const stdout = data.run?.stdout || '';
    const stderr = data.run?.stderr || '';
    const compileStderr = data.compile?.stderr || '';

    if (compileStderr) return NextResponse.json({ output: compileStderr, error: true });
    if (stderr)        return NextResponse.json({ output: stderr, error: true });

    return NextResponse.json({ output: stdout || '(aucune sortie)', error: false });
  } catch (e: unknown) {
    return NextResponse.json({ output: `Erreur serveur : ${(e as Error).message}`, error: true });
  }
}
