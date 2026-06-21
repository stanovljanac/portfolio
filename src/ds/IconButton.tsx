import type { ReactNode } from "react";

type IconButtonProps = {
  children?: ReactNode;
  label: string;
  variant?: "ghost" | "solid" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  [key: string]: unknown;
};

export function IconButton({
  children,
  label,
  variant = "ghost",
  size = "md",
  className = "",
  ...rest
}: IconButtonProps) {
  const cls = ["mb-iconbtn", `mb-iconbtn--${variant}`, `mb-iconbtn--${size}`, className]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={cls} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}
