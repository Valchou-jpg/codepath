interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
}

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

let instance: PyodideInterface | null = null;
let loadPromise: Promise<PyodideInterface> | null = null;

export async function getPyodide(): Promise<PyodideInterface> {
  if (instance) return instance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((res, rej) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        s.onload = () => res();
        s.onerror = () => rej(new Error('Impossible de charger Pyodide'));
        document.head.appendChild(s);
      });
    }
    instance = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
    });
    return instance;
  })();

  return loadPromise;
}
