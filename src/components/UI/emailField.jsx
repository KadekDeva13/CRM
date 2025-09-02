import { useState } from "react";
import { Field, inputCls } from "./field";

export default function EmailField({
  id = "email",
  name = "email",         
  label = "Email",
  placeholder="you@company.com",
  autoComplete = "email",
  disabled = false,
  required = true,
  ...rest
}) {
  const [show] = useState(false);

  return (
    <Field label={label} htmlFor={id}>
      <div className="relative">
        <input
          id={id}
          name={name}                      
          type={show ? "text" : "email"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputCls + " pr-11"}
          disabled={disabled}
          required={required}
          {...rest}                       
        />
      </div>
    </Field>
  );
}
