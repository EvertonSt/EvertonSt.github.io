import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { Icon } from '../ui/Icon';
import { useLanguage } from '../../i18n';
import { links } from '../../data/links';
import './Hero.css';
export function Hero() {
  const { t } = useLanguage();
  return (<section className="hero section" id="hero">
    <div className="hero__inner">
      <StatusBadge status="live" label={t('hero.status')} />
      <h1 className="hero__title">{t('hero.title.before')}<span className="hero__accent">{t('hero.title.accent')}</span></h1>
      <p className="hero__subtitle">{t('hero.subtitle')}</p>
      <div className="hero__tags">{['AI QA', 'SDET', 'Test Automation', 'TypeScript', 'Playwright', 'LLM Evaluation', 'CI/CD'].map(t2 => <span key={t2} className="hero__tag">{t2}</span>)}</div>
      <div className="hero__actions">
        <Button variant="primary" size="lg" href="#work">{t('hero.ctaWork')} <Icon name="arrow" size={16} /></Button>
        <Button variant="secondary" size="lg" href={links.github} external>{t('hero.ctaGithub')} <Icon name="github" size={16} /></Button>
        <Button variant="secondary" size="lg" href={links.linkedin} external>{t('hero.ctaLinkedin')} <Icon name="linkedin" size={16} /></Button>
      </div>
      <p className="hero__availability">{t('hero.availability')}</p>
    </div>
  </section>);
}
