import './Card.css';
interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; }
export function Card({ children, className = '', hover = true }: CardProps) {
  return <div className={'card' + (hover ? ' card--hover' : '') + ' ' + className}>{children}</div>;
}
