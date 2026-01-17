"use client";
import { ButtonPrimitive, type ButtonPrimitiveProps } from "./ButtonPrimitive";
import { cx } from "../../utils/cx";
import { buttonVariants, ButtonSize, ButtonVariant } from "./button.variants";

import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from "react";
import { forwardRef } from "react";

export type ButtonProps = Omit<ButtonPrimitiveProps, "className"> & {
  children?: ReactElement | string;
  className?:
    | string
    | { button?: string | false | null | undefined }
    | false
    | undefined
    | null;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  dark?: boolean;
  iconOnly?: boolean;
  icon?: ReactElement | string;
  title?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  tabIndex?: number;
  testId?: string;
  textAlign?: "left" | "center" | "right";

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
      textAlign = "center",

      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    const classes = cx(
      "ath-button",
      buttonVariants.size[size],
      buttonVariants.variant[variant],
      buttonVariants.textAlign[textAlign],
      dark ? buttonVariants.dark : "",
      typeof className === "object" && className !== null
        ? className.button
        : className
    );

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
    };

    return (
      <ButtonPrimitive
        ref={ref}
        type={type}
        title={title}
        className={classes}
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
