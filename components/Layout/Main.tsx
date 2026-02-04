"use client";
import type { CSSObject } from "@emotion/react";
import { cx } from "../../utils";

type MainProps = {
  children?: React.ReactNode;
  className?:
    | string
    | {
        main?: string | false | null | undefined;
      }
    | false
    | undefined
    | null;
  sx?: CSSObject;
};

export const Main = ({ children, className, sx }: MainProps) => {
  const classes = cx(
    "ath-main",
    typeof className === "object" && className !== null
      ? className.main
      : className,
  );

  return (
    <main css={sx} className={classes}>
      {children}
    </main>
  );
};
