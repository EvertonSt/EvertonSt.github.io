import './StatusBadge.css';
interface StatusBadgeProps { status: 'live' | 'demo' | 'in-development' | 'reference'; label?: string; }
export function StatusBadge({ status, label }: StatusBadgeProps) {
  const colors: Record<string, string> = { live: 'var(--accent-green)', demo: 'var(--accent-blue)', 'in-development': 'var(--accent-violet)', reference: 'var(--text-muted)' };
  return <span className="status-badge"><span className="status-badge__dot" style={{ background: colors[status] }} />{label || status}</span>;
}
