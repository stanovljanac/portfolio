import { useId } from "react";
import type { ReactNode } from "react";

type InputProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  leadingIcon?: ReactNode;
  id?: string;
  className?: string;
  [key: string]: unknown;
};

export function Input({ label, hint, error, required = false, leadingIcon, id, className = "", ...rest }: InputProps) {
  const autoId = useId();
  const fieldId = id || autoId;
  const hintId = `${fieldId}-hint`;
  return (
    <div className="mb-field">
      {label ? (
        <label className="mb-field__label" htmlFor={fieldId}>
          {label}
          {required ? <span className="mb-field__req" aria-hidden="true">*</span> : null}
        </label>
      ) : null}
      <div className="mb-input-wrap">
        {leadingIcon ? <span className="mb-input-wrap__icon">{leadingIcon}</span> : null}
        <input
          id={fieldId}
          className={["mb-input", leadingIcon ? "has-icon" : "", error ? "mb-input--invalid" : "", className]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? hintId : undefined}
          required={required || undefined}
          {...rest}
        />
      </div>
      {error ? (
        <span id={hintId} className="mb-field__hint mb-field__hint--error">{error}</span>
      ) : hint ? (
        <span id={hintId} className="mb-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
