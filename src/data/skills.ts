export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Testing & Quality',
    skills: [
      'Playwright',
      'Cypress',
      'Mocha',
      'Chai',
      'API Testing',
      'Deterministic Test Generation',
      'Failure Triage',
      'Duplicate-Bug Detection',
    ],
  },
  {
    name: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C#', 'SQL'],
  },
  {
    name: 'AI & LLM',
    skills: [
      'Claude',
      'OpenAI',
      'DeepSeek',
      'Gemini',
      'Ollama',
      'LM Studio',
      'Prompt Engineering',
      'Model Evaluation',
      'LLM-Driven Test Generation',
    ],
  },
  {
    name: 'Full-Stack',
    skills: [
      'React',
      'Next.js',
      'Fastify',
      'Express',
      'REST APIs',
      'WebSockets',
      'Prisma',
      'Tauri',
      'Expo / React Native',
    ],
  },
  {
    name: 'Infrastructure',
    skills: [
      'GitHub Actions',
      'CI/CD',
      'Docker',
      'Vercel',
      'Railway',
      'PostgreSQL',
      'SQLite',
    ],
  },
];
