'use client';
import { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';

type Props = {
  language: string;
  value: string;
  onChange: (value: string) => void;
  height?: string;
};

const LANG_MAP: Record<string, string> = {
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  java: 'java',
  c: 'c',
  sql: 'sql',
  rust: 'rust',
};

export default function CodeEditor({ language, value, onChange, height = '300px' }: Props) {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent));
  }, []);

  if (isMobile) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        style={{ height }}
        className="w-full bg-[#0d1117] text-white/90 font-mono text-sm p-4 resize-none outline-none border-none leading-relaxed"
      />
    );
  }

  return (
    <Editor
      height={height}
      language={LANG_MAP[language] || 'plaintext'}
      value={value}
      theme="vs-dark"
      onChange={(val) => onChange(val || '')}
      onMount={(editor) => { editorRef.current = editor; }}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineHeight: 22,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontLigatures: true,
        scrollBeyondLastLine: false,
        renderLineHighlight: 'line',
        lineNumbers: 'on',
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 3,
        automaticLayout: true,
        tabSize: 4,
        insertSpaces: true,
        wordWrap: 'on',
        padding: { top: 16, bottom: 16 },
        scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
        overviewRulerLanes: 0,
        renderWhitespace: 'none',
        contextmenu: false,
      }}
    />
  );
}
