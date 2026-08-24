export interface ExperienceEntry {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  description: string[];
  links?: { label: string; url: string }[];
}

export const experience: ExperienceEntry[] = [
  {
    id: 'independent',
    title: 'Independent QA Automation Engineer & AI Tooling Developer',
    company: 'Self-employed',
    location: 'Paripiranga, Bahia, Brazil',
    type: 'Remote',
    period: 'August 2020 — Present',
    description: [
      'Built and publicly deployed Argus, an autonomous AI QA agent with 313 passing tests that generates deterministic Playwright tests, triages failures, and files GitHub issues.',
      'Built and published Cerberus CI to npm and GitHub Marketplace — an AI-powered CI quality gate with 237 tests, 88% coverage, and provider-agnostic AI architecture.',
      'Built Enlace, a full-stack ISP operations platform with Fastify backend, React/Vite web app, Tauri desktop NOC, and Expo mobile — deployed on Railway and Vercel.',
      'Developed API/UI automation, CI/CD quality gates, and LLM evaluation tools using Playwright, Cypress, TypeScript, and GitHub Actions.',
    ],
  },
  {
    id: 'intern',
    title: 'Software Development Intern',
    company: 'Ages',
    location: 'Paripiranga, Bahia, Brazil',
    type: 'On-site · Internship',
    period: 'June 2019 — June 2020',
    description: [
      'University internship project: C#/.NET desktop ERP built in a 6-person team using a 3-tier architecture (BLL, DAL, GUI, and Model) with SQL Server/T-SQL.',
      'Contributions included business-logic and data-access development, database integration, and collaborative Git-based development. Also worked with Java during the internship.',
    ],
    links: [
      { label: 'projeto-erp (team project)', url: 'https://github.com/EvertonSt/projeto-erp' },
    ],
  },
];
