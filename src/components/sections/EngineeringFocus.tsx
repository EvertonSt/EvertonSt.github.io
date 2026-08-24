import { SectionHeading } from '../ui/SectionHeading';
import './EngineeringFocus.css';
const cards = [
  { icon: '🧪', title: 'Autonomous QA', desc: 'AI agents that discover features, generate tests, and triage failures' },
  { icon: '🤖', title: 'LLM Evaluation', desc: 'Provider-agnostic AI classification with deterministic fallbacks' },
  { icon: '⚡', title: 'Test Automation', desc: 'Playwright, Cypress, and API testing at scale' },
  { icon: '🔒', title: 'CI/CD Quality Gates', desc: 'Severity-based gates that never block on flaky noise' },
  { icon: '🏗️', title: 'Full-Stack Systems', desc: 'React, Fastify, Tauri, Expo — built end-to-end' },
  { icon: '📦', title: 'Public Shipping', desc: 'npm packages, GitHub Actions, live deployments' },
];
export function EngineeringFocus() {
  return (<section className="section" id="engineering-focus"><div className="section-inner">
    <SectionHeading title="Engineering Focus" subtitle="Software Engineering × Quality × AI × Automation × CI/CD — I build both the product and the quality systems around it." centered />
    <div className="ef__grid">{cards.map(c => (
      <div key={c.title} className="ef__card"><span className="ef__icon">{c.icon}</span><h3 className="ef__title">{c.title}</h3><p className="ef__desc">{c.desc}</p></div>
    ))}</div>
  </div></section>);
}
