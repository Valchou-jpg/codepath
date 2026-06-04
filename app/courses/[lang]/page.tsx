'use client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurriculum } from '@/data';
import { ChevronLeft, Code2, BookOpen, ChevronRight } from 'lucide-react';
import { useState } from 'react';

function renderMarkdown(text: string) {
  // Simple markdown-to-html renderer
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/^\| (.+) \|$/gm, (_, content) => {
      const cells = content.split(' | ');
      return '<tr>' + cells.map((c: string) => `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|p|t|l|u|o|c|b|s|d])/gm, '');
}

export default function CoursePage({ params }: { params: { lang: string } }) {
  const curriculum = getCurriculum(params.lang);
  if (!curriculum) notFound();

  const { language, chapters, courseContent } = curriculum;
  const [activeSection, setActiveSection] = useState(courseContent[0]?.id || chapters[0]?.id);

  const allLessons = chapters.flatMap(ch => ch.lessons);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col">
      {/* Top bar */}
      <nav className="flex items-center gap-4 px-6 py-4 border-b border-white/5 flex-shrink-0">
        <Link href="/courses" className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm">
          <ChevronLeft size={16} /> Cours
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg">{language.icon}</span>
          <span className="font-semibold text-white">{language.name}</span>
          <span className="text-white/30">— Cours complet</span>
        </div>
        <Link href={`/learn/${language.id}`}
          className="ml-auto flex items-center gap-1.5 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          <Code2 size={15} /> Pratiquer
        </Link>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/5 overflow-y-auto flex-shrink-0 py-4">
          {/* Course content sections */}
          {courseContent.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-white/30 uppercase tracking-widest px-4 mb-2">Introduction</p>
              {courseContent.map(section => (
                <button key={section.id} onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-all ${activeSection === section.id
                    ? 'text-green-400 bg-green-500/10 border-r-2 border-green-500'
                    : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                  <BookOpen size={13} className="inline mr-2 opacity-60" />
                  {section.title}
                </button>
              ))}
            </div>
          )}

          {/* Chapters and lessons */}
          {chapters.map(chapter => (
            <div key={chapter.id} className="mb-4">
              <p className="text-xs text-white/30 uppercase tracking-widest px-4 mb-2">{chapter.title}</p>
              {chapter.lessons.map(lesson => (
                <button key={lesson.id} onClick={() => setActiveSection(lesson.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-all ${activeSection === lesson.id
                    ? 'text-green-400 bg-green-500/10 border-r-2 border-green-500'
                    : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                  {lesson.title}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10">
            {(() => {
              const courseSection = courseContent.find(s => s.id === activeSection);
              if (courseSection) return (
                <div className="prose-dark" dangerouslySetInnerHTML={{
                  __html: renderMarkdown(courseSection.content)
                }} />
              );

              const lesson = allLessons.find(l => l.id === activeSection);
              if (lesson) return (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      lesson.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      lesson.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>{lesson.difficulty}</span>
                    <span className="text-xs text-white/30">{lesson.xp} XP</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-6">{lesson.title}</h1>
                  <p className="text-white/60 text-lg mb-8 leading-relaxed">{lesson.description}</p>
                  <div className="prose-dark" dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }} />
                  
                  <div className="mt-10 pt-8 border-t border-white/10">
                    <Link href={`/learn/${language.id}?lesson=${lesson.id}`}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                      <Code2 size={18} /> Pratiquer cet exercice <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );

              return <p className="text-white/40">Sélectionne une section</p>;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
