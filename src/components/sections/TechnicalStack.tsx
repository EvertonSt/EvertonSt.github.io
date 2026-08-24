import { SectionHeading } from '../ui/SectionHeading';
import { skillCategories } from '../../data/skills';
import { useLanguage } from '../../i18n';
import './TechnicalStack.css';

const categoryKeys: Record<string, string> = {
  'Testing & Quality': 'ts.testingQuality',
  'Languages': 'ts.languages',
  'AI & LLM': 'ts.aiLlm',
  'Full-Stack': 'ts.fullStack',
  'Infrastructure': 'ts.infrastructure',
};

export function TechnicalStack() {
  const { t } = useLanguage();
  return (<section className="section" id="technical-stack"><div className="section-inner">
    <SectionHeading title={t('ts.title')} subtitle={t('ts.subtitle')} centered />
    <div className="ts__grid">{skillCategories.map(cat => (
      <div key={cat.name} className="ts__category">
        <h3 className="ts__cat-title">{t(categoryKeys[cat.name] ?? cat.name)}</h3>
        <div className="ts__skills">{cat.skills.map(s => <span key={s} className="ts__skill">{s}</span>)}</div>
      </div>
    ))}</div>
  </div></section>);
}
