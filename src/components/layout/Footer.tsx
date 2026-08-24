import { Icon } from '../ui/Icon';
import { links } from '../../data/links';
import './Footer.css';
export function Footer() {
  return (<footer className="footer"><div className="footer__inner">
    <div className="footer__left"><p className="footer__name">Everton S. Andrade</p><p className="footer__tagline">AI QA Engineer &middot; SDET &middot; Quality Engineering</p></div>
    <div className="footer__links"><a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a><a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a></div>
    <p className="footer__copy">Built with React + TypeScript + Vite</p>
  </div></footer>);
}
