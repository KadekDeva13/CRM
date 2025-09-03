import React, { forwardRef, useState } from "react";
import { Field, inputCls } from "./field";

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "children"
>;

export type PasswordFieldProps = BaseInputProps & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  id?: string;
  name?: string;
};

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      id = "password",
      name = "password",
      label = "Password",
      placeholder = "••••••••",
      autoComplete = "current-password",
      disabled = false,
      required = true,
      hint,
      className,
      ...rest
    },
    ref
  ): React.ReactElement =>  {
    const [show, setShow] = useState(false);

    return (
      <Field label={label} htmlFor={id} hint={hint}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            name={name}
            type={show ? "text" : "password"}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={[inputCls, "pr-11", className].filter(Boolean).join(" ")}
            disabled={disabled}
            required={required}
            {...rest}
          />

          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
            aria-pressed={show}
          >
            {!show ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2.8 9.6C4.9 6 8.3 5 12 5c6.4 0 10 7 10 7a18.2 18.2 0 0 1-6.1 5.6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </button>
        </div>
      </Field>
    );
  }
);

PasswordField.displayName = "PasswordField";
export default PasswordField;
