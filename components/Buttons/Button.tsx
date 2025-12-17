"use client";
import { ButtonPrimitive, type ButtonPrimitiveProps } from "./ButtonPrimitive";
import styles from "./Button.module.css";

import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from "react";
import { forwardRef } from "react";

export type ButtonProps = Omit<ButtonPrimitiveProps, "className"> & {
  children?: ReactElement | string;
  className?: string | { button?: string };
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "outline"
    | "ghost"
    | "danger"
    | "warning"
    | "success";
  size?: "small" | "medium" | "large" | "full";
  dark?: boolean;
  iconOnly?: boolean;
  icon?: ReactElement | string;
  title?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  testId?: string;

  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "medium",
      dark = false,

      disabled = false,
      icon,
      iconOnly,
      tabIndex,
      testId,
      type = "button",
      title,
      autoFocus = false,

      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const combinedClasses = `${styles.button} ${styles[size]} ${
      styles[variant]
    } ${dark ? styles.dark : ""} ${iconOnly ? styles.iconOnly : ""} ${
      typeof className === "string" ? className : className?.button || ""
    }`.trim();

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
    };

    return (
      <ButtonPrimitive
        ref={ref}
        type={type}
        title={title}
        className={combinedClasses}
        disabled={disabled}
        autoFocus={autoFocus}
        tabIndex={disabled ? -1 : tabIndex}
        data-testid={testId}
        onClick={onClickHandler}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        {...rest}
      >
        {icon ? (
          <>
            {typeof icon === "string" ? (
              <span aria-hidden="true">{icon}</span>
            ) : (
              icon
            )}
            {!iconOnly && children}
          </>
        ) : (
          <>{children}</>
        )}
      </ButtonPrimitive>
    );
  }
);

Button.displayName = "Button";
