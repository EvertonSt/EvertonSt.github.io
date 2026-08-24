import { useLanguage } from '../../i18n';
import './ProofStrip.css';
export function ProofStrip() {
  const { t } = useLanguage();
  const metrics = [
    { value: '313', label: t('proof.testsPassing'), project: t('proof.projectArgus') },
    { value: '237', label: t('proof.tests'), project: t('proof.projectCerberus') },
    { value: '88%', label: t('proof.coverage'), project: t('proof.projectCerberus') },
    { value: 'npm', label: t('proof.published'), project: t('proof.projectCerberus') },
    { value: '3', label: t('proof.liveDeployments'), project: t('proof.projectAll') },
    { value: 'UTC-3', label: t('proof.fluentEnglish'), project: t('proof.projectBrazil') },
  ];
  return (<section className="proof-strip"><div className="proof-strip__inner">{metrics.map((m, i) => (
    <div key={i} className="proof-strip__card"><span className="proof-strip__value">{m.value}</span><span className="proof-strip__label">{m.label}</span><span className="proof-strip__project">{m.project}</span></div>
  ))}</div></section>);
}
