export type Language = {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  usedFor: string[];
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string; // markdown-like rich text
  code: string;
  expectedOutput?: string;
  hint: string;
  xp: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'lesson' | 'exercise';
};

export type Chapter = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type LanguageCurriculum = {
  language: Language;
  chapters: Chapter[];
  courseContent: CourseSection[];
};

export type CourseSection = {
  id: string;
  title: string;
  content: string;
  subsections?: CourseSection[];
};

export type UserProgress = {
  completedLessons: string[];
  xp: number;
  streak: number;
};
