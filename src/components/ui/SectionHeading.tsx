import "./SectionHeading.css";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  /**
   * Id applied to the `<h2>`, so the enclosing `<section aria-labelledby>` can
   * point at it. A landmark with no accessible name is announced only as
   * "region", which tells a screen-reader user nothing about where they are.
   */
  id?: string;
}

export function SectionHeading({ title, subtitle, centered = false, id }: SectionHeadingProps) {
  return (
    <div
      className={["section-heading", centered ? "section-heading--centered" : ""].filter(Boolean).join(" ")}
    >
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      {subtitle ? <p className="section-heading__subtitle">{subtitle}</p> : null}
    </div>
  );
}
