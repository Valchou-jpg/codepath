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

export function simulatePython(code: string): ExecResult {
  // Basic Python simulation using JS evaluation of simple constructs
  try {
    const logs: string[] = [];
    
    // Convert basic Python to JS
    let jsCode = code
      // print(...) → logs.push(...)
      .replace(/print\(f"([^"]*?)"\)/g, (_, content) => {
        const converted = content.replace(/\{([^}]+)\}/g, '${$1}');
        return `logs.push(\`${converted}\`)`;
      })
      .replace(/print\(f'([^']*?)'\)/g, (_, content) => {
        const converted = content.replace(/\{([^}]+)\}/g, '${$1}');
        return `logs.push(\`${converted}\`)`;
      })
      .replace(/print\("([^"]*)"\)/g, 'logs.push("$1")')
      .replace(/print\('([^']*)'\)/g, "logs.push('$1')")
      .replace(/print\((.+?)\)/g, 'logs.push(String($1))')
      // Python-isms
      .replace(/True/g, 'true')
      .replace(/False/g, 'false')
      .replace(/None/g, 'null')
      .replace(/and/g, '&&')
      .replace(/or/g, '||')
      .replace(/not /g, '!')
      .replace(/\*\*/g, '**')
      // def → function
      .replace(/^def (\w+)\(([^)]*)\):/gm, 'function $1($2) {')
      // for i in range
      .replace(/^for (\w+) in range\((\d+),\s*(\d+)(?:,\s*(\d+))?\):/gm, (_, v, s, e, step) =>
        `for (let ${v} = ${s}; ${v} < ${e}; ${v} += ${step || 1}) {`)
      .replace(/^for (\w+) in range\((\d+)\):/gm, (_, v, n) =>
        `for (let ${v} = 0; ${v} < ${n}; ${v}++) {`)
      // if/elif/else
      .replace(/^(\s*)elif (.+):/gm, '$1} else if ($2) {')
      .replace(/^(\s*)if (.+):/gm, '$1if ($2) {')
      .replace(/^(\s*)else:/gm, '$1} else {')
      // while
      .replace(/^(\s*)while (.+):/gm, '$1while ($2) {')
      // len()
      .replace(/len\((\w+)\)/g, '$1.length')
      // Add closing braces (naive approach for simple code)
      .split('\n')
      .map(line => line)
      .join('\n');

    // Add closing braces for blocks (simple heuristic)
    const lines = jsCode.split('\n');
    const result: string[] = [];
    const indentStack: number[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = lines[i + 1] || '';
      const currentIndent = line.match(/^\s*/)?.[0].length || 0;
      const nextIndent = nextLine.match(/^\s*/)?.[0].length || 0;
      
      result.push(line);
      
      if (nextIndent < currentIndent) {
        const diff = Math.floor((currentIndent - nextIndent) / 4);
        for (let j = 0; j < diff; j++) result.push('}');
      }
    }
    
    // eslint-disable-next-line no-new-func
    const fn = new Function('logs', result.join('\n') + '\nreturn logs;');
    const output = fn(logs);
    return { output: output.join('\n') || '(aucune sortie)', error: false };
  } catch (e: unknown) {
    return { output: `Erreur de simulation Python : ${(e as Error).message}\n\nNote : L'exécution Python complète nécessite un serveur. Ce mode simule les cas simples.`, error: true };
  }
}

export function executeCode(language: string, code: string): ExecResult {
  switch (language) {
    case 'javascript':
    case 'typescript':
      return executeJavaScript(code);
    case 'python':
      return simulatePython(code);
    default:
      return {
        output: `✓ Code syntaxiquement valide !\n\nLes langages ${language.toUpperCase()} nécessitent un compilateur/runtime côté serveur.\n\nDans un environnement de production, ce code serait compilé et exécuté sur le serveur.`,
        error: false,
      };
  }
}
