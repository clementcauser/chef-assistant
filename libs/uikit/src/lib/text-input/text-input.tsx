import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import styles from "./text-input.module.css";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  id: string;
  errorMessage?: string;
}

export function TextInput({
  label,
  id,
  errorMessage,
  ...inputProps
}: TextInputProps) {
  const hasError = !!errorMessage;

  return (
    <div className="mb-3 xl:w-96">
      <label htmlFor={id} className="form-label inline-block text-gray-700">
        {label}
      </label>
      <input
        type="text"
        className={clsx("form-control", styles["base-text-input"], {
          [styles["error-text-input"]]: hasError,
        })}
        {...inputProps}
        id={id}
      />
      {hasError && (
        <span className="text-sm text-danger-500 mt-1">{errorMessage}</span>
      )}
    </div>
  );
}

export default TextInput;
