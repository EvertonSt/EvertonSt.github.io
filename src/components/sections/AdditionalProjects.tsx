import { Card } from '../ui/Card';
import { Tag } from '../ui/Tag';
import { StatusBadge } from '../ui/StatusBadge';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { additionalProjects } from '../../data/projects';
import { SectionHeading } from '../ui/SectionHeading';
import { useLanguage } from '../../i18n';
import './AdditionalProjects.css';
export function AdditionalProjects() {
  const { t } = useLanguage();
  return (<section className="section" id="additional-projects"><div className="section-inner">
    <SectionHeading title={t('ap.title')} subtitle={t('ap.subtitle')} />
    <div className="ap__grid">{additionalProjects.map(p => (
      <Card key={p.id} className="ap__card">
        <div className="ap__card-header">
          <h3 className="ap__title">{p.title}</h3>
          {p.status && <StatusBadge status={p.status} label={p.statusLabel} />}
        </div>
        <p className="ap__desc">{p.description}</p>
        <div className="ap__tags">{p.tags.map(t2 => <Tag key={t2}>{t2}</Tag>)}</div>
        <Button variant="ghost" size="sm" href={p.links[0]?.url} external>GitHub <Icon name="github" size={14} /></Button>
      </Card>
    ))}</div>
  </div></section>);
}
