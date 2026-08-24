import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import { links } from '../../data/links';
import './Contact.css';
export function Contact() {
  return (<section className="section" id="contact"><div className="section-inner contact__inner">
    <SectionHeading title="Contact" subtitle="Have a difficult quality problem, an AI product that needs evaluation, or a team that needs stronger automation?" centered />
    <div className="contact__actions">
      <Button variant="primary" size="lg" href="mailto:everton_st@outlook.com">Email <Icon name="email" size={16} /></Button>
      <Button variant="secondary" size="lg" href={links.linkedin} external>LinkedIn <Icon name="linkedin" size={16} /></Button>
      <Button variant="secondary" size="lg" href={links.github} external>GitHub <Icon name="github" size={16} /></Button>
    </div>
    <div className="contact__links">
      <a href={links.github}>github.com/EvertonSt</a>
      <a href={links.linkedin}>linkedin.com/in/everton-s-andrade</a>
      <a href={links.portfolio}>evertonst.github.io</a>
      <a href={links.cerberusSite} target="_blank" rel="noopener noreferrer">Cerberus CI</a>
    </div>
  </div></section>);
}
