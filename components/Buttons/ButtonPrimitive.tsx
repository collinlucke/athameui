import { forwardRef } from "react";

export type ButtonPrimitiveProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {};

export const ButtonPrimitive = forwardRef<
  HTMLButtonElement,
  ButtonPrimitiveProps
>(({ children, ...rest }, ref) => {
  return (
    <button ref={ref} {...rest}>
      {children}
    </button>
  );
});
