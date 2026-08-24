import { SectionHeading } from '../ui/SectionHeading';
import { useLanguage } from '../../i18n';
import './EngineeringFocus.css';
export function EngineeringFocus() {
  const { t } = useLanguage();
  const cards = [
    { icon: '🧪', title: t('ef.autonomousQA'), desc: t('ef.autonomousQADesc') },
    { icon: '🤖', title: t('ef.llmEval'), desc: t('ef.llmEvalDesc') },
    { icon: '⚡', title: t('ef.testAutomation'), desc: t('ef.testAutomationDesc') },
    { icon: '🔒', title: t('ef.cicdGates'), desc: t('ef.cicdGatesDesc') },
    { icon: '🏗️', title: t('ef.fullStack'), desc: t('ef.fullStackDesc') },
    { icon: '📦', title: t('ef.publicShipping'), desc: t('ef.publicShippingDesc') },
  ];
  return (<section className="section" id="engineering-focus"><div className="section-inner">
    <SectionHeading title={t('ef.title')} subtitle={t('ef.subtitle')} centered />
    <div className="ef__grid">{cards.map(c => (
      <div key={c.title} className="ef__card"><span className="ef__icon">{c.icon}</span><h3 className="ef__title">{c.title}</h3><p className="ef__desc">{c.desc}</p></div>
    ))}</div>
  </div></section>);
}
