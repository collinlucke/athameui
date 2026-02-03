import { CSSObject } from "@emotion/react";
import { cx } from "../../utils";

type ButtonGroupProps = {
  children: React.ReactNode;
  className?: {
    buttonGroup?: string | false | null | undefined;
  };
  direction?: "row" | "column";
  sx?: {
    buttonGroup?: CSSObject | string;
  };
};

export const ButtonGroup = ({
  children,
  className,
  direction = "row",
  sx,
}: ButtonGroupProps) => {
  const buttonGroupClasses = cx(
    "ath-button-group",
    `ath-button-group-direction-${direction}`,
    className?.buttonGroup ? className.buttonGroup : undefined,
  );

  return (
    <div className={buttonGroupClasses} css={sx?.buttonGroup}>
      {children}
    </div>
  );
};
