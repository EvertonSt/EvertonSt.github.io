import type { ReactNode } from "react";
import "./Tag.css";

interface TagProps {
  children: ReactNode;
}

/** A technology or concept label. Purely decorative: the surrounding prose
 *  already names the project, so a list of tags carries no meaning a screen
 *  reader needs repeated. */
export function Tag({ children }: TagProps) {
  return <span className="tag">{children}</span>;
}
