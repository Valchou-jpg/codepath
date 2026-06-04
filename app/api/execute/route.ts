import { NextRequest, NextResponse } from 'next/server';

const WANDBOX_URL = 'https://wandbox.org/api/compile.json';

const COMPILERS: Record<string, string> = {
  c:          'gcc-head-c',
  java:       'openjdk-jdk-22+36',
  rust:       'rust-1.82.0',
  typescript: 'typescript-5.6.2',
  sql:        'sqlite-3.46.1',
};

export async function POST(req: NextRequest) {
  const { language, code } = await req.json();

  const compiler = COMPILERS[language];
  if (!compiler) {
    return NextResponse.json({
      output: `L'exécution de ${language.toUpperCase()} n'est pas encore supportée.`,
      error: false,
    });
  }

  try {
    const res = await fetch(WANDBOX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, compiler }),
    });

    const data = await res.json();

    if (data.compiler_error) {
      return NextResponse.json({ output: data.compiler_error, error: true });
    }

    const output = data.program_output || data.program_message || '';
    return NextResponse.json({ output: output || '(aucune sortie)', error: false });
  } catch (e: unknown) {
    return NextResponse.json({ output: `Erreur serveur : ${(e as Error).message}`, error: true });
  }
}
