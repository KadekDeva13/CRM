import React, { forwardRef } from "react";
import { Field, inputCls } from "./field";

type BaseInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "children"
>;

export type EmailFieldProps = BaseInputProps & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  id?: string;
  name?: string;
};

const EmailField = forwardRef<HTMLInputElement, EmailFieldProps>(
  (
    {
      id = "email",
      name = "email",
      label = "Email",
      placeholder = "you@company.com",
      autoComplete = "email",
      disabled = false,
      required = true,
      hint,
      className,
      ...rest
    },
    ref
  ):React.ReactElement => {
    return (
      <Field label={label} htmlFor={id} hint={hint}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            name={name}
            type="email"
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={[inputCls, "pr-11", className].filter(Boolean).join(" ")}
            disabled={disabled}
            required={required}
            {...rest}
          />
        </div>
      </Field>
    );
  }
);

EmailField.displayName = "EmailField";
export default EmailField;
