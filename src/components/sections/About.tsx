import { SectionHeading } from '../ui/SectionHeading';
import { useLanguage } from '../../i18n';
import './About.css';
export function About() {
  const { t } = useLanguage();
  return (<section className="section" id="about"><div className="section-inner">
    <SectionHeading title={t('about.title')} />
    <div className="about__content">
      <p>{t('about.p1')}</p>
      <p>{t('about.p2')}</p>
      <p>{t('about.p3')}</p>
      <p>{t('about.p4')}</p>
    </div>
  </div></section>);
}
