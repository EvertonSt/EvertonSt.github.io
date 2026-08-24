export default {
  // Navigation
  'nav.work': 'Work',
  'nav.engineeringFocus': 'Engineering Focus',
  'nav.experience': 'Experience',
  'nav.about': 'About',
  'nav.contact': 'Contact',
  'nav.cta': "Let's talk",
  'nav.skipToContent': 'Skip to content',
  'nav.closeMenu': 'Close menu',
  'nav.openMenu': 'Open menu',
  'nav.mobileTitle': 'Mobile navigation',

  // Hero
  'hero.status': 'Open to remote QA/SDET opportunities',
  'hero.title.before': 'AI QA Engineer building systems that make software quality ',
  'hero.title.accent': 'observable, repeatable, and harder to ignore.',
  'hero.subtitle': 'I build autonomous QA agents, AI-powered CI quality gates, Playwright automation, and full-stack systems that help engineering teams find and understand failures earlier.',
  'hero.ctaWork': 'View my work',
  'hero.ctaGithub': 'GitHub',
  'hero.ctaLinkedin': 'LinkedIn',
  'hero.availability': 'Brazil-based · UTC-3 · Fluent English · Open to remote QA/SDET opportunities',

  // Proof Strip
  'proof.testsPassing': 'Tests passing',
  'proof.tests': 'Tests',
  'proof.coverage': 'Coverage',
  'proof.published': 'Published',
  'proof.liveDeployments': 'Live deployments',
  'proof.fluentEnglish': 'Fluent English',
  'proof.projectArgus': 'Argus',
  'proof.projectCerberus': 'Cerberus CI',
  'proof.projectAll': 'Argus, Cerberus CI, Enlace',
  'proof.projectBrazil': 'Brazil-based',

  // Work Section
  'work.title': 'Work',
  'work.subtitle': 'Flagship projects demonstrating AI-powered QA systems, CI quality gates, and full-stack engineering.',

  // Flagship Projects
  'fp.readCaseStudy': 'Read case study',
  'fp.hideCaseStudy': 'Hide case study',

  // Argus
  'argus.title': 'Argus',
  'argus.subtitle': 'Autonomous AI QA Agent',
  'argus.description': 'An autonomous QA system that discovers application features, generates deterministic Playwright tests, triages failures, detects duplicate bugs, files GitHub issues, and enforces severity-based CI gates.',
  'argus.statusLabel': 'Demonstration run — synthetic test data showing bug detection and triage',
  'argus.cs.problem.title': 'Problem',
  'argus.cs.problem.content': 'Most QA systems rely entirely on AI (unreliable) or require manual tests (slow). Teams need autonomous discovery, reliable tests, and triage without blocking on flaky noise.',
  'argus.cs.architecture.title': 'Architecture',
  'argus.cs.architecture.content': 'Seven-stage pipeline: Ingest → Plan (Claude) → Codegen (templates-first) → Execute (Playwright) → Triage (AI) → File Bugs (GitHub Issues) → Report (CI gate + dashboard). 2 AI stages, rest deterministic.',
  'argus.cs.keyDecisions.title': 'Key Decisions',
  'argus.cs.keyDecisions.content': '1. Deterministic gate. 2. Templates first. 3. No auto-fix. 4. Verdict cache (SHA-256, ~60% cost savings).',
  'argus.cs.evidence.title': 'Evidence',
  'argus.cs.evidence.content': '313 tests. Live dashboard on Vercel. 100% templated. Severity-based CI gate.',

  // Cerberus CI
  'cerberus.title': 'Cerberus CI',
  'cerberus.subtitle': 'AI-Powered CI Quality Gate',
  'cerberus.description': 'A provider-agnostic CI quality system that distinguishes flaky tests from real regressions, detects performance degradation, and publishes plain-English quality reports on pull requests.',
  'cerberus.cs.problem.title': 'Problem',
  'cerberus.cs.problem.content': 'Flaky tests erode trust. Performance regressions invisible for 2-4 weeks. Both compound.',
  'cerberus.cs.architecture.title': 'Architecture',
  'cerberus.cs.architecture.content': 'Rules (<1ms) → Cache (<5ms) → AI. ~40/30/30 split. SQLite. Deterministic gate.',
  'cerberus.cs.keyDecisions.title': 'Key Decisions',
  'cerberus.cs.keyDecisions.content': '1. AI never decides pass/fail. 2. openai-compatible adapter. 3. Zero-cost mock mode. 4. Statistical perf comparison.',
  'cerberus.cs.evidence.title': 'Evidence',
  'cerberus.cs.evidence.content': '237 tests, 88% coverage. npm v0.1.0. GitHub Action. Dogfooded.',

  // Enlace
  'enlace.title': 'Enlace',
  'enlace.subtitle': 'Full-Stack ISP Operations Platform',
  'enlace.description': 'A multi-platform ISP management system — customer portal, NOC desktop, mobile app, and AI-assisted triage.',
  'enlace.statusLabel': 'Demo data — synthetic incidents, sample billing',
  'enlace.cs.problem.title': 'Problem',
  'enlace.cs.problem.content': 'ISPs lose money on ticket floods, phone-based coordination, and communication-driven churn.',
  'enlace.cs.architecture.title': 'Architecture',
  'enlace.cs.architecture.content': 'Monorepo: Web (React 19 + Vite), Desktop (Tauri 2.x), Mobile (Expo), Server (Fastify + PostgreSQL + WebSocket + Claude). Shared core.',
  'enlace.cs.infrastructure.title': 'Infrastructure',
  'enlace.cs.infrastructure.content': 'Vercel (web). Railway (server + Postgres). Tauri (desktop). Expo (mobile). GitHub Actions CI.',
  'enlace.cs.status.title': 'Status',
  'enlace.cs.status.content': 'Phase 1 complete. Backend, desktop, AI triage in development. All demo data synthetic.',

  // Engineering Focus
  'ef.title': 'Engineering Focus',
  'ef.subtitle': 'Software Engineering × Quality × AI × Automation × CI/CD — I build both the product and the quality systems around it.',
  'ef.autonomousQA': 'Autonomous QA',
  'ef.autonomousQADesc': 'AI agents that discover features, generate tests, and triage failures',
  'ef.llmEval': 'LLM Evaluation',
  'ef.llmEvalDesc': 'Provider-agnostic AI classification with deterministic fallbacks',
  'ef.testAutomation': 'Test Automation',
  'ef.testAutomationDesc': 'Playwright, Cypress, and API testing at scale',
  'ef.cicdGates': 'CI/CD Quality Gates',
  'ef.cicdGatesDesc': 'Severity-based gates that never block on flaky noise',
  'ef.fullStack': 'Full-Stack Systems',
  'ef.fullStackDesc': 'React, Fastify, Tauri, Expo — built end-to-end',
  'ef.publicShipping': 'Public Shipping',
  'ef.publicShippingDesc': 'npm packages, GitHub Actions, live deployments',

  // Additional Projects
  'ap.title': 'Additional Work',
  'ap.subtitle': 'Supporting projects that reinforce the QA/AI narrative.',

  // Experience
  'exp.title': 'Experience',

  // Technical Stack
  'ts.title': 'Technical Stack',
  'ts.subtitle': 'Technologies supported by current projects and documentation.',
  'ts.testingQuality': 'Testing & Quality',
  'ts.languages': 'Languages',
  'ts.aiLlm': 'AI & LLM',
  'ts.fullStack': 'Full-Stack',
  'ts.infrastructure': 'Infrastructure',

  // About
  'about.title': 'About',
  'about.p1': 'I like figuring out why software fails, then building systems that make those failures easier to catch, understand, and prevent.',
  'about.p2': "I'm a QA/SDET engineer building automated testing systems and AI-powered quality tools. My work combines Playwright, Cypress, TypeScript, GitHub Actions, API testing, CI/CD, and LLM evaluation.",
  'about.p3': "I've publicly built and deployed Argus, an autonomous AI QA agent; Cerberus CI, an AI-powered CI quality gate; and Enlace, a full-stack ISP management platform.",
  'about.p4': "I'm based in Brazil (UTC-3), fluent in English, and comfortable collaborating with US, Canadian, and European teams. I'm open to remote opportunities as a QA Automation Engineer, Software Engineer in Test, SDET, or Quality Engineer.",

  // Contact
  'contact.title': 'Contact',
  'contact.subtitle': 'Have a difficult quality problem, an AI product that needs evaluation, or a team that needs stronger automation?',
  'contact.email': 'Email',

  // Footer
  'footer.tagline': 'AI QA Engineer · SDET · Quality Engineering',
  'footer.built': 'Built with React + TypeScript + Vite',

  // Language
  'lang.en': 'EN',
  'lang.pt': 'PT',
} as const;
