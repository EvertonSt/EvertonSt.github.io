import { useLanguage } from "../../i18n/context";
import { STATUS_DETAIL_KEYS, STATUS_LABEL_KEYS, type ProjectStatus } from "../../data/projects";
import "./StatusBadge.css";

interface StatusBadgeProps {
  status: ProjectStatus;
  /** Renders the longer explanation as well as the label. */
  showDetail?: boolean;
}

/**
 * The honesty control on this site.
 *
 * A single dot colour is not enough: a reader who is deciding whether to
 * interview someone needs the words, not a hue they have to interpret. So the
 * badge always carries a text label, and `showDetail` adds the sentence saying
 * what they will find behind the link.
 *
 * The colour is bound through the token maps in `data/projects.ts` rather than
 * an inline lookup here, so a new status cannot render with an undefined
 * colour.
 */
export function StatusBadge({ status, showDetail = false }: StatusBadgeProps) {
  const { t } = useLanguage();
  const label = t(STATUS_LABEL_KEYS[status]);
  const detail = t(STATUS_DETAIL_KEYS[status]);

  return (
    <span className={`status-badge status-badge--${status}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      <span className="status-badge__text">
        {label}
        {showDetail ? <span className="status-badge__detail"> — {detail}</span> : null}
      </span>
    </span>
  );
}
