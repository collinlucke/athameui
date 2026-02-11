"use client";
import React, { ReactNode, useRef, useLayoutEffect } from "react";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";
import { FormLabel } from "../FormLabel";
import { FormTextInput } from "../FormTextInput";
import "../FormTextInput";

export type FormFieldProps = {
  autoComplete?: string;
  autoFocus?: boolean;
  autoResize?: boolean;
  className?: {
    container?: string | false | null | undefined;
    error?: string | false | null | undefined;
    label?: string | false | null | undefined;
    helperText?: string | false | null | undefined;
    input?: string | false | null | undefined;
    required?: string | false | null | undefined;
  };
  dark?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string | ReactNode;
  id?: string;
  label?: string | ReactNode;
  labelPosition?: "left" | "right" | "above" | "below";
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  role?: string;
  size?: "large" | "medium" | "small";
  sx?: {
    container?: CSSObject;
    error?: CSSObject;
    label?: CSSObject;
    helperText?: CSSObject;
    input?: CSSObject;
    required?: CSSObject;
  };
  tabIndex?: number;
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "textarea"
    | "search"
    | "number"
    | "date";
  value?: string | number;

  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

export const FormField: React.FC<FormFieldProps> = ({
  autoComplete,
  autoFocus = false,
  autoResize = false,
  className,
  dark = false,
  disabled = false,
  error,
  helperText,
  id,
  label,
  labelPosition = "above",
  name,
  placeholder,
  readOnly = false,
  required = false,
  size = "medium",
  sx,
  tabIndex,
  type = "text",
  value,

  onChange,
  onKeyDown,
  ...other
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const containerClasses = cx(
    "ath-form-input-container",
    (labelPosition === "left" || labelPosition === "right") &&
      "ath-form-input-container-horizontal",
    className?.container ? className.container : "",
  );

  const inputSharedClasses = cx(
    `ath-form-input-${size}`,
    disabled && "ath-form-input-shared-disabled",
    readOnly && "ath-form-input-shared-readonly",
    dark && "ath-form-input-shared-dark",
    className?.input ? className.input : "",
  );

  const inputClasses = cx(
    "ath-form-input",
    inputSharedClasses,
    error && "ath-form-input-error",
  );

  const textAreaClasses = cx(
    "ath-form-textarea",
    inputSharedClasses,
    autoResize && "ath-form-textarea-auto-resize",
    error && "ath-form-textarea-error",
  );

  const labelClasses = cx(
    "ath-form-input-label",
    labelPosition ? `ath-form-input-label-${labelPosition}` : "",
  );

  const errorClasses = cx(
    "ath-form-input-error-message",
    className?.error ? className.error : "",
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const resizeTextArea = (textArea: HTMLTextAreaElement) => {
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
    if (autoResize && textAreaRef.current) {
      resizeTextArea(textAreaRef.current);
    }
  };

  useLayoutEffect(() => {
    if (textAreaRef.current && type === "textarea") {
      if (autoResize) {
        resizeTextArea(textAreaRef.current);
      } else {
        textAreaRef.current.style.height = "";
      }
    }
  }, [autoResize, type]);

  const labelElement = label ? (
    <FormLabel
      label={label}
      required={required}
      htmlFor={id}
      className={labelClasses}
      sx={{ label: sx?.label, required: sx?.required }}
      labelPosition={labelPosition}
      dark={dark}
    />
  ) : null;

  const inputElement =
    type === "textarea" ? (
      <textarea
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        ref={textAreaRef}
        name={name}
        onChange={handleTextAreaChange}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={onKeyDown}
        tabIndex={disabled ? -1 : tabIndex}
        className={textAreaClasses}
        css={sx?.input}
        value={value}
        placeholder={placeholder}
        {...other}
      />
    ) : (
      <FormTextInput
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        name={name}
        type={type}
        onChange={handleInputChange}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={onKeyDown}
        tabIndex={disabled ? -1 : tabIndex}
        className={{ input: inputClasses }}
        css={sx?.input}
        value={value}
        placeholder={placeholder}
        size={size}
        id={id}
        {...other}
      />
    );

  const errorElement = error ? (
    <div
      className={errorClasses}
      css={sx?.error}
      id={`${name}-error`}
      role="alert"
      aria-live="polite"
    >
      {error}
    </div>
  ) : null;

  const helperTextElement = helperText ? (
    <div
      className="ath-form-input-helper-text"
      css={sx?.helperText}
      id={`${name}-helper`}
      role="status"
      aria-live="polite"
    >
      {helperText}
    </div>
  ) : null;

  return (
    <div className={containerClasses} css={sx?.container}>
      {(labelPosition === "above" || labelPosition === "left") && labelElement}
      {inputElement}
      {(labelPosition === "below" || labelPosition === "right") && labelElement}
      {errorElement}
      {helperTextElement}
    </div>
  );
};
