import './SectionHeading.css';
interface SectionHeadingProps { title: string; subtitle?: string; centered?: boolean; }
export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={'section-heading' + (centered ? ' section-heading--centered' : '')}>
      <h2 className="section-heading__title">{title}</h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </div>
  );
}
