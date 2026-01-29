import { CSSObject } from "@emotion/react";
import { cx } from "../../utils";

type ButtonGroupProps = {
  children: React.ReactNode;
  sx?: {
    buttonGroup?: CSSObject;
  };
  direction?: "row" | "column";
};

export const ButtonGroup = ({
  children,
  sx,
  direction = "row",
}: ButtonGroupProps) => {
  const classes = cx(
    "ath-button-group",
    `ath-button-group-direction-${direction}`,
  );

  return (
    <div className={classes} css={sx?.buttonGroup}>
      {children}
    </div>
  );
};
