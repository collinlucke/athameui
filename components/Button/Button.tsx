"use client";
import { forwardRef } from "react";
import type {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
} from "react";
import { cx } from "../../utils/cx";
import {
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "./button.variants";
import { CSSObject } from "@emotion/react";

export type ButtonProps = {
  children?: React.ReactNode | string;
  className?: {
    button?: string | false | null | undefined;
    icon?: string | false | null | undefined;
  };
  dark?: boolean;
  disabled?: boolean;
  icon?: ReactElement | string;
  size?: ButtonSize;
  sx?: CSSObject | { button?: CSSObject; icon?: CSSObject };
  title?: string;
  tabIndex?: number;
  textPosition?: "left" | "center" | "right";
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;

  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      dark = false,
      disabled = false,
      icon,
      size = "medium",
      sx,
      tabIndex,
      type = "button",
      textPosition = "center",
      variant = "secondary",

      onBlur,
      onClick,
      onFocus,
      onKeyDown,
      ...other
    },
    ref,
  ) => {
    const isIconOnly = icon && !children;

    const sharedClasses = cx(
      "ath-button",
      buttonVariants.size[size],
      buttonVariants.variant[variant],
      isIconOnly ? "ath-button-icon-only" : "",
      dark ? buttonVariants.dark : "",
    );

    const buttonClasses = cx(
      sharedClasses,
      buttonVariants.textPosition[textPosition],
      typeof className === "object" && className !== null
        ? className.button
        : className,
    );

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
      onClick?.(e);
    };

    const onKeyDownHandler: KeyboardEventHandler<HTMLButtonElement> = (e) => {
      onKeyDown?.(e);
    };

    const onFocusHandler = (e: React.FocusEvent<HTMLButtonElement>) => {
      onFocus?.(e);
    };

    const onBlurHandler = (e: React.FocusEvent<HTMLButtonElement>) => {
      onBlur?.(e);
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        css={sx?.button ? sx.button : sx}
        disabled={disabled}
        tabIndex={disabled ? -1 : tabIndex}
        type={type}
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        {...other}
      >
        {icon ? (
          <>
            {icon}
            {!isIconOnly && children}
          </>
        ) : (
          <>{children}</>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
