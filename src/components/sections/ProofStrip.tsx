import './ProofStrip.css';
const metrics = [
  { value: '313', label: 'Tests passing', project: 'Argus' },
  { value: '237', label: 'Tests', project: 'Cerberus CI' },
  { value: '88%', label: 'Coverage', project: 'Cerberus CI' },
  { value: 'npm', label: 'Published', project: 'Cerberus CI' },
  { value: '3', label: 'Live deployments', project: 'Argus, Cerberus CI, Enlace' },
  { value: 'UTC-3', label: 'Fluent English', project: 'Brazil-based' },
];
export function ProofStrip() {
  return (<section className="proof-strip"><div className="proof-strip__inner">{metrics.map((m, i) => (
    <div key={i} className="proof-strip__card"><span className="proof-strip__value">{m.value}</span><span className="proof-strip__label">{m.label}</span><span className="proof-strip__project">{m.project}</span></div>
  ))}</div></section>);
}
