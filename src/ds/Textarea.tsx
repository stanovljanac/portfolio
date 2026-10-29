import { useId } from "react";

type TextareaProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id?: string;
  className?: string;
  [key: string]: unknown;
};

export function Textarea({ label, hint, error, required = false, id, className = "", ...rest }: TextareaProps) {
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
      <textarea
        id={fieldId}
        className={["mb-textarea", error ? "mb-textarea--invalid" : "", className].filter(Boolean).join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? hintId : undefined}
        required={required || undefined}
        {...rest}
      />
      {error ? (
        <span id={hintId} className="mb-field__hint mb-field__hint--error">{error}</span>
      ) : hint ? (
        <span id={hintId} className="mb-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
