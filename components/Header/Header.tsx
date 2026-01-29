import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
  sx?: {
    header?: CSSObject;
  };
};

export const Header = ({ children, className, sx }: HeaderProps) => {
  const classes = cx("ath-header", className);

  return (
    <header className={classes} css={sx?.header}>
      {children}
    </header>
  );
};
