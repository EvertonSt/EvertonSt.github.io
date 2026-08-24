import { SectionHeading } from '../ui/SectionHeading';
import { skillCategories } from '../../data/skills';
import './TechnicalStack.css';
export function TechnicalStack() {
  return (<section className="section" id="technical-stack"><div className="section-inner">
    <SectionHeading title="Technical Stack" subtitle="Technologies supported by current projects and documentation." centered />
    <div className="ts__grid">{skillCategories.map(cat => (
      <div key={cat.name} className="ts__category">
        <h3 className="ts__cat-title">{cat.name}</h3>
        <div className="ts__skills">{cat.skills.map(s => <span key={s} className="ts__skill">{s}</span>)}</div>
      </div>
    ))}</div>
  </div></section>);
}
