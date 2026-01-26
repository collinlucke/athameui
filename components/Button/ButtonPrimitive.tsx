"use client";
import { CSSObject } from "@emotion/react";
import { forwardRef } from "react";

export type ButtonPrimitiveProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    sx?: CSSObject | { button: CSSObject };
  };

export const ButtonPrimitive = forwardRef<
  HTMLButtonElement,
  ButtonPrimitiveProps
>(({ children, sx, ...rest }, ref) => {
  return (
    <button ref={ref} css={sx} {...rest}>
      {children}
    </button>
  );
});
