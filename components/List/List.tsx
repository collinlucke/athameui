"use client";
import type { ReactElement } from "react";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

type ListProps = {
  children?: ReactElement[] | string[];
  className?: {
    list?: string | false | null | undefined;
  };
  ordered?: boolean;
  role?: "list" | "menu" | "menubar" | "tablist" | "tree" | "grid";
  sx?: {
    list?: CSSObject;
  };
};

export const List = ({
  className,
  children,
  ordered = false,
  role = "list",
  sx,
}: ListProps) => {
  const ListType = ordered ? "ol" : "ul";

  const classes = cx("ath-list", className?.list);

  return (
    <ListType className={classes} role={role} css={sx?.list}>
      {children}
    </ListType>
  );
};
