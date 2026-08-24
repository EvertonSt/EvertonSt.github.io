import { Icon } from '../ui/Icon';
import { useLanguage } from '../../i18n';
import { links } from '../../data/links';
import './Footer.css';
export function Footer() {
  const { t } = useLanguage();
  return (<footer className="footer"><div className="footer__inner">
    <div className="footer__left"><p className="footer__name">Everton S. Andrade</p><p className="footer__tagline">{t('footer.tagline')}</p></div>
    <div className="footer__links"><a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a><a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a></div>
    <p className="footer__copy">{t('footer.built')}</p>
  </div></footer>);
}
