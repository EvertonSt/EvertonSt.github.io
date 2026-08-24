export default {
  // Navigation
  'nav.work': 'Trabalho',
  'nav.engineeringFocus': 'Foco na Engenharia',
  'nav.experience': 'Experiência',
  'nav.about': 'Sobre',
  'nav.contact': 'Contato',
  'nav.cta': 'Vamos conversar',
  'nav.skipToContent': 'Pular para o conteúdo',
  'nav.closeMenu': 'Fechar menu',
  'nav.openMenu': 'Abrir menu',
  'nav.mobileTitle': 'Navegação móvel',

  // Hero
  'hero.status': 'Aberto a oportunidades remotas QA/SDET',
  'hero.title.before': 'Engenheiro de QA com IA construindo sistemas que tornam a qualidade de software ',
  'hero.title.accent': 'observável, repetível e difícil de ignorar.',
  'hero.subtitle': 'Construo agentes QA autônomos, gates de qualidade CI com IA, automação Playwright e sistemas full-stack que ajudam equipes de engenharia a encontrar e entender falhas mais cedo.',
  'hero.ctaWork': 'Ver meu trabalho',
  'hero.ctaGithub': 'GitHub',
  'hero.ctaLinkedin': 'LinkedIn',
  'hero.availability': 'Baseado no Brasil · UTC-3 · Inglês fluente · Aberto a oportunidades remotas QA/SDET',

  // Proof Strip
  'proof.testsPassing': 'Testes passando',
  'proof.tests': 'Testes',
  'proof.coverage': 'Cobertura',
  'proof.published': 'Publicado',
  'proof.liveDeployments': 'Deployments ativos',
  'proof.fluentEnglish': 'Inglês fluente',
  'proof.projectArgus': 'Argus',
  'proof.projectCerberus': 'Cerberus CI',
  'proof.projectAll': 'Argus, Cerberus CI, Enlace',
  'proof.projectBrazil': 'Baseado no Brasil',

  // Work Section
  'work.title': 'Trabalho',
  'work.subtitle': 'Projetos principais demonstrando sistemas QA com IA, gates de qualidade CI e engenharia full-stack.',

  // Flagship Projects
  'fp.readCaseStudy': 'Ler estudo de caso',
  'fp.hideCaseStudy': 'Ocultar estudo de caso',

  // Argus
  'argus.title': 'Argus',
  'argus.subtitle': 'Agente QA Autônomo com IA',
  'argus.description': 'Um sistema QA autônomo que descobre funcionalidades de aplicações, gera testes Playwright determinísticos, classifica falhas, detecta bugs duplicados, cria issues no GitHub e aplica gates de CI baseados em severidade.',
  'argus.statusLabel': 'Run de avaliação de demonstração — demonstra detecção e classificação de problemas',
  'argus.cs.problem.title': 'Problema',
  'argus.cs.problem.content': 'A maioria dos sistemas QA depende inteiramente de IA (imprevisível) ou requer testes manuais (lentos). Equipes precisam de descoberta autônoma, testes confiáveis e triagem sem bloquear em ruído intermitente.',
  'argus.cs.architecture.title': 'Arquitetura',
  'argus.cs.architecture.content': 'Pipeline de sete estágios: Ingest → Plan (Claude) → Codegen (templates-first) → Execute (Playwright) → Triage (IA) → File Bugs (GitHub Issues) → Report (gate CI + dashboard). 2 estágios com IA, o resto determinístico.',
  'argus.cs.keyDecisions.title': 'Decisões Chave',
  'argus.cs.keyDecisions.content': '1. Gate determinístico. 2. Templates primeiro. 3. Sem auto-fix. 4. Cache de veredicto (SHA-256, ~60% de economia).',
  'argus.cs.evidence.title': 'Evidência',
  'argus.cs.evidence.content': '313 testes. Dashboard ativo no Vercel. 100% templated. Gate de CI baseado em severidade.',

  // Cerberus CI
  'cerberus.title': 'Cerberus CI',
  'cerberus.subtitle': 'Gate de Qualidade CI com IA',
  'cerberus.description': 'Um sistema de qualidade CI agnóstico a provedores que distingue testes intermitentes de regressões reais, detecta degradação de performance e publica relatórios de qualidade em inglês simples nos pull requests.',
  'cerberus.cs.problem.title': 'Problema',
  'cerberus.cs.problem.content': 'Testes intermitentes erosionam a confiança. Regressões de performance invisíveis por 2-4 semanas. Ambos se acumulam.',
  'cerberus.cs.architecture.title': 'Arquitetura',
  'cerberus.cs.architecture.content': 'Rules (<1ms) → Cache (<5ms) → IA. ~40/30/30 split. SQLite. Gate determinístico.',
  'cerberus.cs.keyDecisions.title': 'Decisões Chave',
  'cerberus.cs.keyDecisions.content': '1. IA nunca decide pass/fail. 2. Adapter compatível com openai. 3. Modo mock sem custo. 4. Comparação estatística de performance.',
  'cerberus.cs.evidence.title': 'Evidência',
  'cerberus.cs.evidence.content': '237 testes, 88% de cobertura. npm v0.1.0. GitHub Action. Dogfooded.',

  // Enlace
  'enlace.title': 'Enlace',
  'enlace.subtitle': 'Plataforma Full-Stack de Operações ISP',
  'enlace.description': 'Um sistema multi-plataforma de gestão ISP — portal de clientes, desktop NOC, app mobile e triagem assistida por IA.',
  'enlace.statusLabel': 'Dados de demonstração — incidentes sintéticos, faturamento de amostra',
  'enlace.cs.problem.title': 'Problema',
  'enlace.cs.problem.content': 'ISPs perdem dinheiro com floods de tickets, coordenação por telefone e churn causado por problemas de comunicação.',
  'enlace.cs.architecture.title': 'Arquitetura',
  'enlace.cs.architecture.content': 'Monorepo: Web (React 19 + Vite), Desktop (Tauri 2.x), Mobile (Expo), Server (Fastify + PostgreSQL + WebSocket + Claude). Núcleo compartilhado.',
  'enlace.cs.infrastructure.title': 'Infraestrutura',
  'enlace.cs.infrastructure.content': 'Vercel (web). Railway (server + Postgres). Tauri (desktop). Expo (mobile). GitHub Actions CI.',
  'enlace.cs.status.title': 'Status',
  'enlace.cs.status.content': 'Fase 1 completa. Backend, desktop, triagem com IA em desenvolvimento. Todos os dados de demonstração são sintéticos.',

  // Engineering Focus
  'ef.title': 'Foco na Engenharia',
  'ef.subtitle': 'Engenharia de Software × Qualidade × IA × Automação × CI/CD — Construo tanto o produto quanto os sistemas de qualidade ao redor.',
  'ef.autonomousQA': 'QA Autônomo',
  'ef.autonomousQADesc': 'Agentes IA que descobrem funcionalidades, geram testes e classificam falhas',
  'ef.llmEval': 'Avaliação LLM',
  'ef.llmEvalDesc': 'Classificação IA agnóstica a provedores com fallbacks determinísticos',
  'ef.testAutomation': 'Automação de Testes',
  'ef.testAutomationDesc': 'Playwright, Cypress e testes de API em escala',
  'ef.cicdGates': 'Gates de Qualidade CI/CD',
  'ef.cicdGatesDesc': 'Gates baseados em severidade que nunca bloqueiam por ruído intermitente',
  'ef.fullStack': 'Sistemas Full-Stack',
  'ef.fullStackDesc': 'React, Fastify, Tauri, Expo — construídos de ponta a ponta',
  'ef.publicShipping': 'Envio Público',
  'ef.publicShippingDesc': 'Pacotes npm, GitHub Actions, deployments ativos',

  // Additional Projects
  'ap.title': 'Trabalho Adicional',
  'ap.subtitle': 'Projetos de apoio que reforçam a narrativa de QA/IA.',

  // Experience
  'exp.title': 'Experiência',

  // Technical Stack
  'ts.title': 'Stack Técnico',
  'ts.subtitle': 'Tecnologias suportadas pelos projetos e documentação atuais.',
  'ts.testingQuality': 'Testes & Qualidade',
  'ts.languages': 'Linguagens',
  'ts.aiLlm': 'IA & LLM',
  'ts.fullStack': 'Full-Stack',
  'ts.infrastructure': 'Infraestrutura',

  // About
  'about.title': 'Sobre',
  'about.p1': 'Gosto de descobrir por que o software falha e depois construir sistemas que tornam essas falhas mais fáceis de capturar, entender e prevenir.',
  'about.p2': 'Sou engenheiro QA/SDET construindo sistemas de testes automatizados e ferramentas de qualidade com IA. Meu trabalho combina Playwright, Cypress, TypeScript, GitHub Actions, testes de API, CI/CD e avaliação de LLM.',
  'about.p3': 'Construí e implementei publicamente o Argus, um agente QA autônomo com IA; o Cerberus CI, um gate de qualidade CI com IA; e o Enlace, uma plataforma full-stack de gestão ISP.',
  'about.p4': 'Baseado no Brasil (UTC-3), fluente em inglês, e confortável colaborando com equipes dos EUA, Canadá e Europa. Aberto a oportunidades remotas como Engenheiro de Automação QA, Software Engineer in Test, SDET ou Quality Engineer.',

  // Contact
  'contact.title': 'Contato',
  'contact.subtitle': 'Tem um problema de qualidade difícil, um produto com IA que precisa de avaliação, ou uma equipe que precisa de automação mais forte?',
  'contact.email': 'E-mail',

  // Footer
  'footer.tagline': 'Engenheiro de QA com IA · SDET · Engenharia de Qualidade',
  'footer.built': 'Construído com React + TypeScript + Vite',

  // Language
  'lang.en': 'EN',
  'lang.pt': 'PT',
} as const;
