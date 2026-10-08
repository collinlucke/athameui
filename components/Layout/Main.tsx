"use client";
import type { CSSObject } from "@emotion/react";
import { cx } from "../../utils";

type MainProps = {
  children?: React.ReactNode;
  className?: {
    main?: string | false | null | undefined;
    mainContent?: string | false | null | undefined;
  };

  sx?: {
    main?: CSSObject;
    mainContent?: CSSObject;
  };
};

export const Main = ({ children, className, sx }: MainProps) => {
  const mainClasses = cx(
    "ath-main",
    typeof className === "object" && className !== null ? className.main : "",
  );

  const mainContentClasses = cx(
    "ath-main-content",
    typeof className === "object" && className !== null
      ? className.mainContent
      : "",
  );

  return (
    <main css={sx?.main} className={mainClasses}>
      <div css={sx?.mainContent} className={mainContentClasses}>
        {children}
      </div>
    </main>
  );
};
