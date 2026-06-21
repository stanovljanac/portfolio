import type { ReactNode } from "react";

type BadgeProps = {
  children?: ReactNode;
  variant?: "neutral" | "gold" | "success" | "warning" | "danger" | "info";
  dot?: boolean;
  className?: string;
  [key: string]: unknown;
};

export function Badge({ children, variant = "neutral", dot = false, className = "", ...rest }: BadgeProps) {
  const cls = ["mb-badge", `mb-badge--${variant}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="mb-badge__dot" /> : null}
      {children}
    </span>
  );
}
