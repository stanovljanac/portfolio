import type { ElementType, ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  interactive?: boolean;
  glass?: boolean;
  padded?: boolean;
  as?: ElementType;
  className?: string;
  [key: string]: unknown;
};

export function Card({
  children,
  interactive = false,
  glass = false,
  padded = true,
  as,
  className = "",
  ...rest
}: CardProps) {
  const Tag = (as || "div") as ElementType;
  const cls = [
    "mb-card",
    padded ? "mb-card--pad" : "",
    glass ? "mb-card--glass" : "",
    interactive ? "mb-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} {...rest}>
      {interactive ? <span className="mb-card__sheen" /> : null}
      {children}
    </Tag>
  );
}
