import { useState, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { links } from '../../data/links';
import './Navbar.css';

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'engineering-focus', label: 'Engineering Focus' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(['work', 'engineering-focus', 'experience', 'about', 'contact']);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
  const go = (id: string) => { setIsOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return (<>
    <a href="#main-content" className="skip-to-content">Skip to content</a>
    <nav className={'navbar' + (scrolled ? ' navbar--scrolled' : '')} aria-label="Main navigation">
      <div className="navbar__inner">
        <a href="#" className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Everton S. Andrade</a>
        <div className="navbar__links">{navItems.map(i => <a key={i.id} href={'#' + i.id} className={'navbar__link' + (activeId === i.id ? ' navbar__link--active' : '')} onClick={e => { e.preventDefault(); go(i.id); }}>{i.label}</a>)}</div>
        <div className="navbar__actions">
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="navbar__social" aria-label="GitHub"><Icon name="github" size={20} /></a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="navbar__social" aria-label="LinkedIn"><Icon name="linkedin" size={20} /></a>
          <Button variant="primary" size="sm" href="#contact" onClick={() => go('contact')}>Let's talk</Button>
        </div>
        <button className="navbar__hamburger" onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen}><Icon name={isOpen ? 'close' : 'menu'} size={24} /></button>
      </div>
    </nav>
    <div className={'navbar__mobile' + (isOpen ? ' navbar__mobile--open' : '')} role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div className="navbar__mobile-inner">
        {navItems.map(i => <a key={i.id} href={'#' + i.id} className={'navbar__mobile-link' + (activeId === i.id ? ' navbar__mobile-link--active' : '')} onClick={e => { e.preventDefault(); go(i.id); }}>{i.label}</a>)}
        <div className="navbar__mobile-social">
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" size={24} /></a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={24} /></a>
        </div>
        <Button variant="primary" size="lg" href="#contact" onClick={() => go('contact')} className="navbar__mobile-cta">Let's talk</Button>
      </div>
    </div>
  </>);
}
