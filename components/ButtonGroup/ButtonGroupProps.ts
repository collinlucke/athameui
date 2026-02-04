import { CSSObject } from "@emotion/react";

export type ButtonGroupProps = {
  children: React.ReactNode;
  className?: {
    buttonGroup?: string | false | null | undefined;
  };
  direction?: "row" | "column";
  sx?: {
    buttonGroup?: CSSObject | string;
  };
};
