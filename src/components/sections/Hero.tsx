import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Icon } from '../ui/Icon';
import { links } from '../../data/links';
import './Hero.css';
export function Hero() {
  return (<section className="hero section" id="hero">
    <div className="hero__inner">
      <StatusBadge status="live" label="Open to remote QA/SDET opportunities" />
      <h1 className="hero__title">AI QA Engineer building systems that make software quality <span className="hero__accent">observable, repeatable, and harder to ignore.</span></h1>
      <p className="hero__subtitle">I build autonomous QA agents, AI-powered CI quality gates, Playwright automation, and full-stack systems that help engineering teams find and understand failures earlier.</p>
      <div className="hero__tags">{['AI QA', 'SDET', 'Test Automation', 'TypeScript', 'Playwright', 'LLM Evaluation', 'CI/CD'].map(t => <span key={t} className="hero__tag">{t}</span>)}</div>
      <div className="hero__actions">
        <Button variant="primary" size="lg" href="#work">View my work <Icon name="arrow" size={16} /></Button>
        <Button variant="secondary" size="lg" href={links.github} external>GitHub <Icon name="github" size={16} /></Button>
        <Button variant="secondary" size="lg" href={links.linkedin} external>LinkedIn <Icon name="linkedin" size={16} /></Button>
      </div>
      <p className="hero__availability">Brazil-based &middot; UTC-3 &middot; Fluent English &middot; Open to remote QA/SDET opportunities</p>
    </div>
  </section>);
}
