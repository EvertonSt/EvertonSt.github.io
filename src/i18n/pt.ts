import type { TranslationCatalogue } from "./en";

/**
 * Portuguese (pt-BR) copy.
 *
 * Typed as `TranslationCatalogue`, so the compiler enforces two things at once:
 * every English key exists here, and each value has the same shape as its
 * English counterpart. A dropped key or a string where English has a list is a
 * build failure, not a silent fallback.
 *
 * `tests/unit/i18n-parity.test.ts` re-checks both properties at runtime, which
 * matters because the type system can be satisfied by a key that is present but
 * empty.
 */
const pt: TranslationCatalogue = {
  "meta.siteTitle": "Everton S. Andrade — Engenheiro de Testes de Software e Automação de QA",
  "meta.siteTagline": "Automação de testes, ferramentas de teste com LLM e quality gates em CI/CD.",

  /* Navegação */
  "nav.work": "Projetos",
  "nav.focus": "Atuação",
  "nav.experience": "Experiência",
  "nav.resume": "Currículo",
  "nav.contact": "Contato",
  "nav.primaryCta": "Contrate-me",
  "nav.skipToContent": "Ir para o conteúdo",
  "nav.openMenu": "Abrir navegação",
  "nav.closeMenu": "Fechar navegação",
  "nav.menuLabel": "Navegação do site",
  "nav.mobileMenu": "Navegação",
  "nav.theme": "Alternar tema de cor",
  "nav.themeToLight": "Mudar para o tema claro",
  "nav.themeToDark": "Mudar para o tema escuro",

  /* Hero */
  "hero.availability": "Aberto a vagas remotas de automação de QA e SDET",
  "hero.roleLine": "Engenheiro de Testes de Software · Automação de QA · Testes com LLM",
  "hero.title": "Construo a infraestrutura de testes que decide se um time pode publicar.",
  "hero.subtitle":
    "Seis anos de sistemas automatizados de teste, quality gates em CI e avaliação de LLMs — incluindo a parte que a maioria pula: deixar o veredito determinístico, para que o mesmo commit sempre receba a mesma resposta.",
  "hero.primaryCta": "Ver os projetos",
  "hero.resumeCta": "Baixar currículo",
  "hero.githubCta": "GitHub",
  "hero.linkedinCta": "LinkedIn",
  "hero.location": "Paripiranga, Bahia, Brasil · UTC−3",
  "hero.workAuth": "Aberto a remoto (LATAM, EUA e Europa)",
  "hero.languages": "Português nativo · Inglês de nível nativo",
  "hero.skills": [
    "Playwright",
    "TypeScript",
    "CI/CD",
    "Quality gates em CI",
    "Avaliação de LLMs",
    "Testes de API",
    "GitHub Actions",
  ],

  /* Faixa de números */
  "proof.title": "Os números por trás do trabalho",
  "proof.note": "Os valores vêm da suíte de testes e do CI de cada projeto, não são estimativas.",
  "proof.testsLabel": "testes passando",
  "proof.coverageLabel": "cobertura de linhas",
  "proof.publishedLabel": "pacote publicado",
  "proof.languagesLabel": "linguagens de interface",
  "proof.yearsLabel": "construindo sistemas de teste",
  "proof.projectsLabel": "sistemas construídos de ponta a ponta",
  "proof.stagesLabel": "etapas do pipeline",
  "proof.modelStagesLabel": "etapas que usam modelo",
  "proof.providersLabel": "provedores de modelo",
  "proof.clientsLabel": "aplicativos cliente",
  "proof.sharedLabel": "núcleos de serviço compartilhados",
  "proof.argus": "Argus",
  "proof.cerberus": "Cerberus CI",
  "proof.enlace": "Enlace",
  "proof.self": "Trajetória",

  /* Projetos */
  "work.title": "Projetos selecionados",
  "work.subtitle":
    "Cinco sistemas, cada um escrito e entregue de ponta a ponta. Todos os rótulos de status abaixo dizem o que um visitante encontra de fato ao clicar.",
  "work.readCaseStudy": "Ler o case study",
  "work.hideCaseStudy": "Ocultar o case study",
  "work.caseStudyLabel": "Case study de",
  "work.visitRepo": "Repositório",
  "work.liveDemo": "Demonstração",
  "work.npmPackage": "Pacote npm",

  /* Títulos do case study. São rótulos, não frases, e são compartilhados por
     todos os projetos para que as quatro seções leiam igual em toda a página. */
  "cs.problem": "O problema",
  "cs.architecture": "Arquitetura",
  "cs.decisions": "Decisões principais",
  "cs.evidence": "Evidências",

  /* Rótulos de status. Deliberadamente precisos: um portfólio que exagera o
     próprio status vale menos para quem contrata do que um que admite o que
     ainda não terminou. */
  "status.live": "Em produção",
  "status.liveDetail": "Rodando com dados reais",
  "status.demo": "Dados de demonstração",
  "status.demoDetail": "Dados sintéticos, sem clientes reais",
  "status.launching": "Lançamento em outubro de 2026",
  "status.launchingDetail": "Lançamento público em 12 de outubro de 2026",
  "status.planned": "Lançamento em novembro de 2026",
  "status.plannedDetail": "Lançamento público em 2 de novembro de 2026",
  "status.inDevelopment": "Em desenvolvimento",
  "status.inDevelopmentDetail": "Construído, ainda não publicado",
  "status.reference": "Projeto de referência",

  /* Argus */
  "argus.title": "Argus",
  "argus.subtitle": "Agente de QA autônomo com veredito determinístico",
  "argus.description":
    "Um agente de QA que descobre as funcionalidades de uma aplicação, escreve testes Playwright para elas, executa, faz a triagem das falhas e abre issues duplicadas no GitHub. O agente propõe; um conjunto determinístico de regras decide se o build passa.",
  "argus.tags": [
    "TypeScript",
    "Playwright",
    "Planejamento de testes com LLM",
    "Geração determinística",
    "Triagem de falhas",
    "Detecção de duplicatas",
    "GitHub Issues",
    "Gates por severidade",
  ],
  "argus.cs.problem":
    "Times precisam de cobertura que acompanhe o código, mas as duas respostas disponíveis falham. Teste inteiramente manual é lento e sempre atrasado. Teste inteiramente dirigido por modelo é rápido e dá um resultado diferente a cada execução, então um build vermelho vira ruído e o time aprende a ignorar o gate.",
  "argus.cs.architecture":
    "Sete etapas: ingerir a aplicação, planejar a cobertura, gerar testes a partir de templates, executar com Playwright, triar falhas, abrir issues e reportar. Apenas duas etapas chamam um modelo. As outras cinco são código determinístico comum, e é isso que torna o veredito reproduzível.",
  "argus.cs.decisions":
    "Quatro decisões fizeram o trabalho. Primeira: o modelo nunca decide pass ou fail — um conjunto de regras por severidade decide, então o mesmo commit sempre produz o mesmo veredito. Segunda: templates antes de geração, para que os casos comuns sejam cobertos por código que qualquer pessoa pode revisar. Terceira: sem correção automática, porque uma suíte que muda sozinha o que afirma não é uma suíte de testes. Quarta: cache de vereditos por SHA-256, que remove cerca de 60% das chamadas repetidas sem alterar nenhum resultado.",
  "argus.cs.evidence":
    "313 testes passando em quatro funcionalidades cobertas. O painel roda na Vercel e mostra uma execução completa de demonstração; os dados são sintéticos, e a interface deixa isso explícito.",

  /* Cerberus CI */
  "cerberus.title": "Cerberus CI",
  "cerberus.subtitle": "Gate de CI que separa teste flaky de regressão real",
  "cerberus.description":
    "Uma GitHub Action que classifica cada teste que falha, detecta regressões de desempenho antes que se acumulem e publica um resumo de qualidade no pull request em linguagem direta.",
  "cerberus.tags": [
    "Triagem em três níveis",
    "Detecção de flaky",
    "Regressão de desempenho",
    "GitHub Actions",
    "Relatórios em PR",
    "Independente de provedor",
    "Pacote npm",
  ],
  "cerberus.cs.problem":
    "Um teste flaky custa mais do que um teste ausente, porque ensina o time a reexecutar em vez de investigar. Regressões de desempenho são piores e mais silenciosas: ficam invisíveis por duas a quatro semanas e costumam ser descobertas por um cliente.",
  "cerberus.cs.architecture":
    "Três níveis, do mais barato para o mais caro. Regras rodam em menos de um milissegundo e pegam as falhas determinísticas. Um cache SQLite responde perguntas repetidas em menos de cinco milissegundos. Só o que sobrevive aos dois chega ao modelo, então uma execução típica gasta uma fração pequena do orçamento em inferência.",
  "cerberus.cs.decisions":
    "O modelo também não decide pass ou fail aqui — ele classifica, e as regras decidem. Isso mantém o gate estável quando um provedor está lento, limitado por taxa ou muda sua saída. O adaptador aceita qualquer endpoint compatível com a API da OpenAI, e foi isso que permitiu rodar contra quatro provedores sem reescrever nada. E um modo de mock sem custo faz a suíte inteira rodar offline no CI.",
  "cerberus.cs.evidence":
    "237 testes com 88% de cobertura de linhas, publicado no npm, empacotado como GitHub Action e rodando nos meus próprios repositórios como teste de uso real.",

  /* SiteCheckIn */
  "sitecheckin.title": "SiteCheckIn",
  "sitecheckin.subtitle": "Check-in de hóspedes e acompanhamento de receita para hospedagem curta",
  "sitecheckin.description":
    "Um SaaS em produção para anfitriões e pequenos operadores: auto check-in do hóspede, mensagens automatizadas e uma visão ao vivo da ocupação e da receita por propriedade. Multilíngue desde o primeiro commit, porque os clientes não estão em um único país.",
  "sitecheckin.tags": ["Next.js", "PostgreSQL", "Multi-tenant", "i18n", "LGPD", "Stripe", "GitHub Actions"],
  "sitecheckin.cs.problem":
    "Pequenos operadores de hospedagem funcionam com planilha, aplicativo de mensagem e caixa de chave. As instruções de check-in são enviadas manualmente, toda vez, e ninguém consegue dizer de relance quais propriedades estão de fato rendendo.",
  "sitecheckin.cs.architecture":
    "Front-end em Next.js, PostgreSQL com isolamento por tenant em todas as consultas, Stripe para cobrança e uma camada de mensagens com estado de entrega rastreado por mensagem, não por requisição.",
  "sitecheckin.cs.decisions":
    "O isolamento por tenant é aplicado na camada de dados, e não filtrado no código da aplicação, para que uma cláusula where faltando falhe de forma barulhenta em vez de vazar linhas de um cliente para outro. O trabalho de conformidade com a LGPD brasileira e com hóspedes internacionais foi desenhado desde o começo — exportar e apagar dados são funcionalidades, não um afterthought jurídico.",
  "sitecheckin.cs.evidence":
    "Lançamento público em 12 de outubro de 2026. Construído e testado antes do lançamento, em vez de ser demonstrado como se já atendesse clientes.",

  /* AItendimento */
  "aitendimento.title": "AItendimento",
  "aitendimento.subtitle": "Automação de atendimento no WhatsApp",
  "aitendimento.description":
    "Uma plataforma de automação de WhatsApp para negócios que atendem pelo telefone: detecção de intenção, passagem para um humano quando importa e um registro de conversas que um gestor consegue ler.",
  "aitendimento.tags": ["WhatsApp", "Node.js", "Automação", "Passagem para humano", "Trilha de auditoria"],
  "aitendimento.cs.problem":
    "Atendimento de uma pequena empresa é uma conversa de WhatsApp. Automatizar de forma ingênua é pior do que não automatizar: uma resposta errada enviada do número da empresa custa um cliente.",
  "aitendimento.cs.architecture":
    "WhatsApp como único canal, por decisão de projeto. Detecção de intenção e respostas roteirizadas, com um caminho explícito de passagem para humano e um opt-out honrado em todas as mensagens.",
  "aitendimento.cs.decisions":
    "A decisão que governa tudo: nenhuma mensagem é enviada sem aprovação explícita no momento em que sairia. Automação que não pode ser auditada não é implantável em um canal onde a identidade do negócio é a confiança.",
  "aitendimento.cs.evidence": "Lançamento público em 2 de novembro de 2026.",

  /* Enlace */
  "enlace.title": "Enlace",
  "enlace.subtitle": "Plataforma de operações para um provedor de internet",
  "enlace.description":
    "Quatro aplicações sobre um núcleo compartilhado: portal do cliente, console de operações de rede, aplicativo mobile e um serviço de triagem de incidentes.",
  "enlace.tags": ["Fastify", "React", "Tauri", "Expo", "WebSocket", "PostgreSQL", "Railway", "Vercel"],
  "enlace.cs.problem":
    "Um provedor funciona na base do volume de tickets e de telefonemas. Incidentes são tratados duas vezes, e o cliente fica sabendo da queda depois do operador.",
  "enlace.cs.architecture":
    "Um monorepo com quatro clientes sobre um núcleo compartilhado: React e Vite no portal web, Tauri no console de operações, Expo no mobile e Fastify com PostgreSQL e WebSockets no serviço.",
  "enlace.cs.decisions":
    "Um núcleo de domínio compartilhado em vez de quatro implementações. O custo é um contrato mais rígido entre clientes e núcleo; o retorno é que uma regra de negócio é escrita uma vez em vez de quatro, e é a diferença entre uma correção e um projeto.",
  "enlace.cs.evidence":
    "Fase um concluída e publicada. Todos os dados da demonstração são sintéticos, e a interface os identifica como tal.",

  /* Atuação */
  "focus.title": "Para que me contratam",
  "focus.subtitle": "Os seis problemas sobre os quais me perguntam, e o que faço com cada um.",
  "focus.qualityGates": "Quality gates em CI",
  "focus.qualityGatesDesc":
    "Um gate que só falha por motivos reais, para que o time continue confiando nele. Vereditos determinísticos, níveis por severidade e nenhuma reescrita automática de teste.",
  "focus.automation": "Automação de testes em escala",
  "focus.automationDesc":
    "Suítes de Playwright e de API que um time consegue estender sem herdar um framework que ninguém entende.",
  "focus.llmEvaluation": "Avaliação de LLMs e guardrails",
  "focus.llmEvaluationDesc":
    "Saída de modelo tratada como algo a ser medido: adaptadores independentes de provedor, mocks offline e regras que decidem em vez do modelo.",
  "focus.reliability": "Diagnóstico e triagem",
  "focus.reliabilityDesc":
    "Encontrar a causa real por trás de um build vermelho ou de um relatório de defeito duplicado, e codificá-la para que não volte.",
  "focus.fullStack": "Entrega full-stack",
  "focus.fullStackDesc":
    "React, Fastify, Tauri e Expo, para que o sistema de qualidade e o produto que ele protege sejam construídos pela mesma pessoa.",
  "focus.shipping": "Publicar em público",
  "focus.shippingDesc":
    "Pacotes npm, GitHub Actions e deploys no ar — trabalho que precisa sobreviver a ser usado por outra pessoa.",

  /* Projetos de apoio */
  "projects.title": "Trabalhos de apoio",
  "projects.subtitle": "Ferramentas menores que resolvem um problema específico do fluxo acima.",
  "projects.qaTestingSuite": "Suíte de Testes QA",
  "projects.qaTestingSuiteDesc":
    "Suíte automatizada de API e UI cobrindo um serviço de exemplo de ponta a ponta.",
  "projects.localQaCopilot": "Local QA Copilot",
  "projects.localQaCopilotDesc":
    "Assistente de testes auto-hospedado rodando em um modelo local, com um fallback determinístico quando o modelo não está disponível.",
  "projects.aiTestCaseGenerator": "Gerador de Casos de Teste",
  "projects.aiTestCaseGeneratorDesc":
    "Transforma uma descrição de funcionalidade em linguagem natural em casos de teste estruturados e um esqueleto executável.",
  "projects.bugReportGenerator": "Gerador de Relatórios de Bug",
  "projects.bugReportGeneratorDesc":
    "Ferramenta de linha de comando que captura detalhes de ambiente, sugere uma severidade e sinaliza relatórios duplicados.",
  "projects.aiContentTesting": "Testes de Conteúdo",
  "projects.aiContentTestingDesc":
    "Avaliação de legibilidade, gramática e estrutura de conteúdo antes da publicação.",
  "projects.forgePro": "Forge-Pro",
  "projects.forgeProDesc": "Marketplace de templates com um quality gate automatizado em cada envio.",
  "projects.aiopedia": "AIopedia",
  "projects.aiopediaDesc": "Site de referência catalogando modelos, benchmarks e prática de avaliação.",
  "projects.localAiWebsite": "Local AI Website",
  "projects.localAiWebsiteDesc": "Diretório de modelos e hardware adequados para inferência auto-hospedada.",

  /* Experiência */
  "experience.title": "Experiência",
  "experience.subtitle": "Onde o trabalho acima foi construído e publicado.",
  "experience.independentTitle": "Engenheiro independente de automação de QA e desenvolvedor de ferramentas",
  "experience.independentCompany": "Autônomo",
  "experience.independentPeriod": "Agosto de 2020 — Atual",
  "experience.independent1":
    "Projetei e publiquei o Argus, um agente de QA autônomo com suíte de 313 testes que gera testes Playwright, faz a triagem de falhas e abre issues duplicadas.",
  "experience.independent2":
    "Construí e publiquei o Cerberus CI no npm e no GitHub Marketplace: um quality gate de CI com 237 testes e 88% de cobertura de linhas, rodando de forma independente de provedor em quatro provedores de modelo.",
  "experience.independent3":
    "Construí o Enlace, plataforma de operações para provedor de internet com serviço Fastify, portal React, console Tauri e app Expo, publicada em Railway e Vercel.",
  "experience.independent4":
    "Construí o SiteCheckIn e o AItendimento, dois produtos comerciais saindo em 2026, cobrindo SaaS multi-tenant, cobrança, automação de WhatsApp e o trabalho de conformidade que acompanha ambos.",
  "experience.internTitle": "Estagiário de Desenvolvimento de Software",
  "experience.internCompany": "Ages",
  "experience.internPeriod": "Junho de 2019 — Junho de 2020",
  "experience.intern1":
    "Estágio universitário em um ERP desktop em C# e .NET construído por um time de seis pessoas em arquitetura de três camadas (regra de negócio, acesso a dados, GUI e modelo) sobre SQL Server.",
  "experience.intern2":
    "Responsável por trabalho de regra de negócio e acesso a dados, integração com banco e controle de versão junto com o restante do time. Trabalhei com Java durante o estágio.",
  "experience.arrangementRemote": "Remoto",
  "experience.arrangementOnsite": "Presencial · Estágio",

  /* Stack */
  "stack.title": "Stack técnica",
  "stack.subtitle": "Ferramentas com as quais eu publiquei, não ferramentas que eu apenas li sobre.",
  "stack.testing": "Testes e qualidade",
  "stack.languages": "Linguagens",
  "stack.ai": "Modelos e avaliação",
  "stack.fullStack": "Full-stack",
  "stack.infrastructure": "Infraestrutura",

  /* Sobre */
  "about.title": "Sobre",
  "about.p1":
    "Gosto de descobrir por que um software falha e então construir a coisa que torna a próxima ocorrência barata de ser pega.",
  "about.p2":
    "Grande parte do meu trabalho fica na fronteira entre qualidade e engenharia: escrevo os testes, a integração com o CI, as regras de triagem e o relatório. Essa amplitude é deliberada. Um gate escrito por quem escreveu a funcionalidade entende o que a funcionalidade deveria fazer, e um gate escrito por quem só enxerga os sintomas costuma virar um obstáculo que o time contorna.",
  "about.p3":
    "O fio que costura tudo acima é uma preferência por vereditos determinísticos. Modelos são genuinamente úteis dentro de um sistema de testes ou de triagem, e genuinamente perigosos como a coisa que decide se um build passa. Eu usei os dois papéis e a diferença de confiabilidade não é sutil.",
  "about.p4":
    "Estou em Paripiranga, Bahia, no UTC−3, falo inglês fluente e trabalho bem com times nos EUA e na Europa. Procuro uma vaga remota de automação de QA ou SDET onde a infraestrutura de testes seja tratada como produto, e não como obrigação de relatório.",

  /* Currículo */
  "resume.title": "Currículo",
  "resume.subtitle":
    "O mesmo conteúdo em uma coluna imprimível, para sistemas de rastreamento de candidacy e para salvar em PDF.",
  "resume.downloadPdf": "Baixar PDF",
  "resume.downloadTxt": "Texto simples",
  "resume.print": "Imprimir esta página",
  "resume.summaryLabel": "Resumo",
  "resume.experienceLabel": "Experiência",
  "resume.projectsLabel": "Projetos",
  "resume.stackLabel": "Habilidades técnicas",
  "resume.contactLabel": "Contato",
  "resume.publishedLabel": "Publicado",
  "resume.projectLabel": "Projeto",

  /* Contato */
  "contact.title": "Contato",
  "contact.subtitle":
    "Contratando para automação de QA ou SDET, ou tem um problema de pipeline que vale diagnosticar? E-mail é o caminho mais rápido.",
  "contact.emailLabel": "E-mail",
  "contact.responseTime": "Normalmente respondido em um dia útil.",
  "contact.openRoles": "O que procuro",
  "contact.role1": "Vaga remota de Engenheiro de Automação de QA ou SDET, CLT ou PJ.",
  "contact.role2": "Um time onde infraestrutura de testes é produto, não obrigação de relatório.",
  "contact.role3": "Time que fale inglês, com sobreposição com o horário dos EUA ou da Europa.",
  "contact.githubLabel": "GitHub",
  "contact.linkedinLabel": "LinkedIn",

  /* Rodapé */
  "footer.tagline": "Engenheiro de Testes de Software · Automação de QA · Quality Gates em CI/CD",
  "footer.builtWith": "Feito com React, TypeScript e Vite. Sem rastreadores, sem cookies.",
  "footer.sourceNote": "O código-fonte e o pipeline de build são públicos.",
  "footer.rights": "Todos os direitos reservados.",

  /* Idioma */
  "lang.switch": "Idioma",
  "lang.en": "English",
  "lang.pt": "Português",
  "lang.toEn": "Mudar para inglês",
  "lang.toPt": "Switch to English",

  /* Documento */
  "doc.skipToContent": "Ir para o conteúdo",
};

export default pt;
