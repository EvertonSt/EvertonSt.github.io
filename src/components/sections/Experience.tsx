import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';
import { experience } from '../../data/experience';
import './Experience.css';
export function Experience() {
  return (<section className="section" id="experience"><div className="section-inner">
    <SectionHeading title="Experience" />
    <div className="exp__list">{experience.map(e => (
      <Card key={e.id} className="exp__card">
        <div className="exp__header">
          <div><h3 className="exp__title">{e.title}</h3><p className="exp__company">{e.company}</p></div>
          <div className="exp__meta"><span className="exp__period">{e.period}</span><span className="exp__location">{e.location} &middot; {e.type}</span></div>
        </div>
        <ul className="exp__list-items">{e.description.map((d, i) => <li key={i}>{d}</li>)}</ul>
        {e.links && <div className="exp__links">{e.links.map(l => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="exp__link">{l.label} &rarr;</a>)}</div>}
      </Card>
    ))}</div>
  </div></section>);
}
