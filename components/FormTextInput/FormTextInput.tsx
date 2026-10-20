import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

type FormTextInputProps = {
  autoComplete?: string;
  autoFocus?: boolean;
  className?: {
    input?: string | false | null | undefined;
  };
  dark?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  size?: "large" | "medium" | "small";
  sx?: {
    input?: CSSObject;
  };
  tabIndex?: number;
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "search"
    | "number"
    | "date";
  value?: string | number;

  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const FormTextInput = ({
  autoComplete,
  autoFocus,
  className,
  dark,
  error,
  disabled,
  id,
  inputMode,
  name,
  placeholder,
  readOnly,
  size,
  sx,
  tabIndex,
  type = "text",
  value,

  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  ...other
}: FormTextInputProps) => {
  const inputClasses = cx(
    "ath-form-text-input",
    `ath-form-text-input-${size}`,
    dark ? "ath-form-text-input-dark" : "",
    disabled ? "ath-form-text-input-disabled" : "",
    readOnly ? "ath-form-text-input-readonly" : "",
    error ? "ath-form-text-input-error" : "",
    className?.input,
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && !readOnly) {
      onChange(e);
    }
  };

  return (
    <input
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      className={inputClasses}
      css={sx?.input}
      disabled={disabled}
      name={name}
      inputMode={inputMode}
      placeholder={placeholder}
      readOnly={readOnly}
      tabIndex={disabled ? -1 : tabIndex}
      type={type}
      value={value}
      onChange={onChangeHandler}
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      id={id}
      {...other}
    />
  );
};
