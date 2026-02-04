"use client";
import { cx } from "../../utils";
import { ButtonGroupVariants } from "./buttonGroup.variants";
import type { ButtonGroupProps } from "./ButtonGroupProps";

export const ButtonGroup = ({
  children,
  className,
  direction = "row",
  sx,
}: ButtonGroupProps) => {
  const buttonGroupClasses = cx(
    "ath-button-group",
    ButtonGroupVariants.direction[direction],
    className?.buttonGroup ? className.buttonGroup : undefined,
  );

  return (
    <div className={buttonGroupClasses} css={sx?.buttonGroup}>
      {children}
    </div>
  );
};
