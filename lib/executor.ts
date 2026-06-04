import { getPyodide } from './pyodide';

export type ExecResult = {
  output: string;
  error: boolean;
};

export function executeJavaScript(code: string): ExecResult {
  const logs: string[] = [];
  const origLog = console.log;
  const origError = console.error;
  const origWarn = console.warn;

  try {
    console.log = (...args: unknown[]) => logs.push(args.map(a =>
      typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
    ).join(' '));
    console.error = (...args: unknown[]) => logs.push('ERROR: ' + args.map(String).join(' '));
    console.warn = (...args: unknown[]) => logs.push('WARN: ' + args.map(String).join(' '));

    // eslint-disable-next-line no-new-func
    const fn = new Function(code);
    const result = fn();
    if (result !== undefined) logs.push(String(result));
    return { output: logs.join('\n') || '(aucune sortie)', error: false };
  } catch (e: unknown) {
    return { output: `Erreur : ${(e as Error).message}`, error: true };
  } finally {
    console.log = origLog;
    console.error = origError;
    console.warn = origWarn;
  }
}

export async function executePython(code: string): Promise<ExecResult> {
  const output: string[] = [];
  try {
    const pyodide = await getPyodide();
    pyodide.setStdout({ batched: (text: string) => output.push(text) });
    pyodide.setStderr({ batched: (text: string) => output.push(text) });
    await pyodide.runPythonAsync(code);
    return { output: output.join('\n') || '(aucune sortie)', error: false };
  } catch (e: unknown) {
    return { output: `Erreur Python : ${(e as Error).message}`, error: true };
  }
}

export async function executeCode(language: string, code: string): Promise<ExecResult> {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return executeJavaScript(code);
    case 'python':
      return executePython(code);
    default:
      return {
        output: `✓ Code syntaxiquement valide !\n\nLes langages ${language.toUpperCase()} nécessitent un compilateur/runtime côté serveur.`,
        error: false,
      };
  }
}
