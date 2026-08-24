import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export function Button({ children, variant = 'primary', size = 'md', href, onClick, className = '', external }: ButtonProps) {
  const classes = 'btn btn--' + variant + ' btn--' + size + ' ' + className;
  if (href) {
    return <a href={href} className={classes} onClick={onClick} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
  }
  return <button className={classes} onClick={onClick}>{children}</button>;
}
