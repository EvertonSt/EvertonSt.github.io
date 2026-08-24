import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tag } from '../ui/Tag';
import { StatusBadge } from '../ui/StatusBadge';
import { Icon } from '../ui/Icon';
import { useLanguage } from '../../i18n';
import type { Project } from '../../data/projects';
import './FlagshipProject.css';

interface Props { project: Project; reverse?: boolean; }

export function FlagshipProject({ project, reverse }: Props) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  return (
    <Card className={'fp' + (reverse ? ' fp--reverse' : '')}>
      <div className="fp__header">
        <div>
          <h3 className="fp__title">{project.title}</h3>
          {project.subtitle && <p className="fp__subtitle">{project.subtitle}</p>}
        </div>
        {project.status && <StatusBadge status={project.status} label={project.statusLabel} />}
      </div>
      <p className="fp__desc">{project.description}</p>
      {project.metrics && <div className="fp__metrics">{project.metrics.map((m, i) => (
        <div key={i} className="fp__metric"><span className="fp__metric-value">{m.value}</span><span className="fp__metric-label">{m.label}</span></div>
      ))}</div>}
      <div className="fp__tags">{project.tags.map(t2 => <Tag key={t2}>{t2}</Tag>)}</div>
      <div className="fp__links">{project.links.map(l => (
        <Button key={l.url} variant="secondary" size="sm" href={l.url} external>{l.label} <Icon name={l.icon || 'external'} size={14} /></Button>
      ))}</div>
      {project.caseStudy && (<>
        <button className="fp__toggle" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>
          {expanded ? t('fp.hideCaseStudy') : t('fp.readCaseStudy')}
          <Icon name="arrow" size={14} />
        </button>
        {expanded && <div className="fp__case-study">{project.caseStudy.map((s, i) => (
          <div key={i} className="fp__cs-section"><h4 className="fp__cs-title">{s.title}</h4><p className="fp__cs-content">{s.content}</p></div>
        ))}</div>}
      </>)}
    </Card>
  );
}
