import type { ReactElement } from "react";
import { cx } from "../../utils/cx";

type ListProps = {
  children?: ReactElement[] | string[];
  className?:
    | string
    | {
        list?: string | false | null | undefined;
      }
    | false
    | undefined
    | null;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: "list" | "menu" | "menubar" | "tablist" | "tree" | "grid";
  dataTestId?: string;
  ordered?: boolean;
};

export const List = ({
  className,
  children,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  role = "list",
  dataTestId,
  ordered = false,
}: ListProps) => {
  const ListType = ordered ? "ol" : "ul";

  const classes = cx(
    "ath-list",
    typeof className === "object" && className !== null
      ? className.list
      : className,
  );

  return (
    <ListType
      className={classes}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      data-testid={dataTestId}
    >
      {children}
    </ListType>
  );
};
