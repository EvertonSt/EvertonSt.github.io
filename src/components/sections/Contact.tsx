import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';
import { Icon } from '../ui/Icon';
import { useLanguage } from '../../i18n';
import { links } from '../../data/links';
import './Contact.css';
export function Contact() {
  const { t } = useLanguage();
  return (<section className="section" id="contact"><div className="section-inner contact__inner">
    <SectionHeading title={t('contact.title')} subtitle={t('contact.subtitle')} centered />
    <div className="contact__actions">
      <Button variant="primary" size="lg" href="mailto:everton_st@outlook.com">{t('contact.email')} <Icon name="email" size={16} /></Button>
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
