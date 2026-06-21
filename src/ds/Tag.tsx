import type { ReactNode } from "react";

type TagProps = {
  children?: ReactNode;
  accent?: boolean;
  onRemove?: () => void;
  className?: string;
  [key: string]: unknown;
};

export function Tag({ children, accent = false, onRemove, className = "", ...rest }: TagProps) {
  const cls = ["mb-tag", accent ? "mb-tag--accent" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
      {onRemove ? (
        <button className="mb-tag__remove" aria-label="Remove" onClick={onRemove}>
          ×
        </button>
      ) : null}
    </span>
  );
}
