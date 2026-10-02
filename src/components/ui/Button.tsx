import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

/**
 * The one button in the system.
 *
 * Renders an `<a>` when given an href and a `<button>` otherwise. That
 * distinction is not cosmetic: a link that navigates must be an anchor, because
 * keyboard users open it in a new tab with the keyboard and screen readers
 * announce the element type. External links always get
 * `rel="noopener noreferrer"` - `noopener` so the opened page cannot reach back
 * through `window.opener`, which is a real risk on any host the visitor did not
 * choose.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface CommonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
    external?: boolean;
    onClick?: () => void;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    external?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

function classesFor(variant: ButtonVariant, size: ButtonSize, extra: string | undefined): string {
  return ["btn", `btn--${variant}`, `btn--${size}`, extra].filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;

  if (props.href !== undefined) {
    const { href, external, onClick, ...rest } = props;
    const isExternal = external ?? /^https?:\/\//i.test(href);
    return (
      <a
        {...rest}
        href={href}
        className={classesFor(variant, size, className)}
        onClick={onClick}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  const { type = "button", ...rest } = props;
  return (
    <button {...rest} type={type} className={classesFor(variant, size, className)}>
      {children}
    </button>
  );
}
