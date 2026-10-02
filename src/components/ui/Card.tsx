import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Suppress the lift-on-hover for dense layouts where it adds noise. */
  interactive?: boolean;
}

export function Card({ children, interactive = true, className = "", ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={["card", interactive ? "card--interactive" : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
