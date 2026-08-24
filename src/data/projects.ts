import { links } from './links';

export interface ProjectLink {
  label: string;
  url: string;
  icon?: 'github' | 'external' | 'npm' | 'live';
}

export interface CaseStudySection {
  title: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  metrics?: { value: string; label: string }[];
  status?: 'live' | 'demo' | 'in-development' | 'reference';
  statusLabel?: string;
  caseStudy?: CaseStudySection[];
  featured: boolean;
}

export const flagshipProjects: Project[] = [
  {
    id: 'argus', title: 'Argus', subtitle: 'Autonomous AI QA Agent',
    description: 'An autonomous QA system that discovers application features, generates deterministic Playwright tests, triages failures, detects duplicate bugs, files GitHub issues, and enforces severity-based CI gates.',
    tags: ['TypeScript', 'Playwright', 'AI-Assisted Test Planning', 'Deterministic Test Generation', 'Failure Triage', 'Duplicate-Bug Detection', 'GitHub Issue Creation', 'Severity-Based CI Gates', '313 Tests'],
    links: [{ label: 'GitHub', url: links.argus, icon: 'github' }, { label: 'Live Dashboard', url: links.argusDashboard, icon: 'live' }],
    metrics: [{ value: '313', label: 'Tests passing' }, { value: '4/4', label: 'Features covered' }, { value: '2 + N', label: 'AI calls per run' }],
    status: 'live', statusLabel: 'Demonstration run — synthetic test data showing bug detection and triage', featured: true,
    caseStudy: [
      { title: 'Problem', content: 'Most QA systems rely entirely on AI (unreliable) or require manual tests (slow). Teams need autonomous discovery, reliable tests, and triage without blocking on flaky noise.' },
      { title: 'Architecture', content: 'Seven-stage pipeline: Ingest → Plan (Claude) → Codegen (templates-first) → Execute (Playwright) → Triage (AI) → File Bugs (GitHub Issues) → Report (CI gate + dashboard). 2 AI stages, rest deterministic.' },
      { title: 'Key Decisions', content: '1. Deterministic gate. 2. Templates first. 3. No auto-fix. 4. Verdict cache (SHA-256, ~60% cost savings).' },
      { title: 'Evidence', content: '313 tests. Live dashboard on Vercel. 100% templated. Severity-based CI gate.' },
    ],
  },
  {
    id: 'cerberus-ci', title: 'Cerberus CI', subtitle: 'AI-Powered CI Quality Gate',
    description: 'A provider-agnostic CI quality system that distinguishes flaky tests from real regressions, detects performance degradation, and publishes plain-English quality reports on pull requests.',
    tags: ['Three-Tier Classification', 'Flaky vs Regression', 'Performance Detection', 'GitHub Actions', 'PR Reports', 'Provider-Agnostic AI', '237 Tests', '88% Coverage', 'npm Published'],
    links: [{ label: 'GitHub', url: links.cerberusCi, icon: 'github' }, { label: 'Product Site', url: links.cerberusSite, icon: 'external' }, { label: 'npm', url: links.cerberusNpm, icon: 'npm' }],
    metrics: [{ value: '237', label: 'Tests' }, { value: '88%', label: 'Coverage' }, { value: '<1', label: 'API calls/run' }],
    status: 'live', featured: true,
    caseStudy: [
      { title: 'Problem', content: 'Flaky tests erode trust. Performance regressions invisible for 2-4 weeks. Both compound.' },
      { title: 'Architecture', content: 'Rules (<1ms) → Cache (<5ms) → AI. ~40/30/30 split. SQLite. Deterministic gate.' },
      { title: 'Key Decisions', content: '1. AI never decides pass/fail. 2. openai-compatible adapter. 3. Zero-cost mock mode. 4. Statistical perf comparison.' },
      { title: 'Evidence', content: '237 tests, 88% coverage. npm v0.1.0. GitHub Action. Dogfooded.' },
    ],
  },
  {
    id: 'enlace', title: 'Enlace', subtitle: 'Full-Stack ISP Operations Platform',
    description: 'A multi-platform ISP management system — customer portal, NOC desktop, mobile app, and AI-assisted triage.',
    tags: ['Fastify', 'React/Vite', 'Tauri', 'Expo', 'JWT', 'WebSocket', 'AI Triage', 'Railway + Vercel', 'PostgreSQL'],
    links: [{ label: 'GitHub', url: links.enlace, icon: 'github' }, { label: 'Live Demo', url: links.enlaceDashboard, icon: 'live' }],
    metrics: [{ value: '4', label: 'Apps' }, { value: '2', label: 'Languages' }, { value: '5', label: 'Incidents shown' }],
    status: 'demo', statusLabel: 'Demo data — synthetic incidents, sample billing', featured: true,
    caseStudy: [
      { title: 'Problem', content: 'ISPs lose money on ticket floods, phone-based coordination, and communication-driven churn.' },
      { title: 'Architecture', content: 'Monorepo: Web (React 19 + Vite), Desktop (Tauri 2.x), Mobile (Expo), Server (Fastify + PostgreSQL + WebSocket + Claude). Shared core.' },
      { title: 'Infrastructure', content: 'Vercel (web). Railway (server + Postgres). Tauri (desktop). Expo (mobile). GitHub Actions CI.' },
      { title: 'Status', content: 'Phase 1 complete. Backend, desktop, AI triage in development. All demo data synthetic.' },
    ],
  },
];

export const additionalProjects: Project[] = [
  { id: 'qa-testing-suite', title: 'QA Testing Suite', subtitle: '', description: 'Automated API and UI testing suite using Mocha, Chai, Cypress, GitHub Actions, and HTML reports.', tags: ['Mocha', 'Chai', 'Cypress', 'GitHub Actions'], links: [{ label: 'GitHub', url: links.qaTestingSuite, icon: 'github' }], featured: false },
  { id: 'local-qa-copilot', title: 'Local QA Copilot', subtitle: '', description: 'Self-hosted AI QA assistant using Ollama with deterministic offline fallback. 138 passing tests.', tags: ['Ollama', 'Gherkin', 'Deterministic Fallback'], links: [{ label: 'GitHub', url: links.localQaCopilot, icon: 'github' }], featured: false },
  { id: 'ai-test-case-generator', title: 'AI Test Case Generator', subtitle: '', description: 'Converts plain-English feature descriptions into structured Gherkin-style test cases and Mocha scaffolding.', tags: ['Claude API', 'Gherkin', 'Mocha'], links: [{ label: 'GitHub', url: links.aiTestCaseGenerator, icon: 'github' }], featured: false },
  { id: 'bug-report-generator', title: 'Bug Report Generator', subtitle: '', description: 'CLI that auto-detects environment info, suggests severity, flags duplicate bugs, and standardizes defect reports.', tags: ['CLI', 'Severity', 'Duplicate Detection'], links: [{ label: 'GitHub', url: links.bugReportGenerator, icon: 'github' }], featured: false },
  { id: 'ai-content-testing', title: 'AI Content Testing', subtitle: '', description: 'Readability scoring, SEO analysis, grammar checks, and AI-generated-versus-human content detection.', tags: ['Readability', 'SEO', 'Grammar', 'AI Detection'], links: [{ label: 'GitHub', url: links.aiContentTesting, icon: 'github' }], featured: false },
  { id: 'forge-pro', title: 'Forge-Pro', subtitle: '', description: 'AI-native template marketplace with automated QA gate, vendor portal, and zero-cost Vercel deployment.', tags: ['Astro', 'Next.js', 'Supabase'], links: [{ label: 'GitHub', url: links.forgePro, icon: 'github' }], status: 'in-development', statusLabel: 'In development', featured: false },
  { id: 'aiopedia', title: 'AIopedia', subtitle: '', description: 'AI encyclopedia covering models, benchmarks, companies, ethics, and terminology.', tags: ['Static HTML', 'AI Reference'], links: [{ label: 'GitHub', url: links.aiopedia, icon: 'github' }], status: 'reference', statusLabel: 'Reference site', featured: false },
  { id: 'local-ai-website', title: 'Local AI Website', subtitle: '', description: 'Directory of local AI tools, engines, models, and hardware for self-hosted AI.', tags: ['Static HTML', 'Local AI'], links: [{ label: 'GitHub', url: links.localAiWebsite, icon: 'github' }], status: 'reference', statusLabel: 'Reference site', featured: false },
];
