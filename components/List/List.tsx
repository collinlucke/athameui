import { ReactNode } from "react";

type ListProps = {
  children?: ReactNode[];
  addClasses?: {
    list?: string;
    ul?: string;
    ol?: string;
  };
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  role?: "list" | "menu" | "menubar" | "tablist" | "tree" | "grid";
  dataTestId?: string;
  ordered?: boolean;
};

export const List: React.FC<ListProps> = ({
  addClasses,
  children,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  role = "list",
  dataTestId,
  ordered = false,
}) => {
  const ListType = ordered ? "ol" : "ul";

  return (
    <ListType
      className={`bn-list font-medium m-0 w-full flex flex-col list-none ps-0 ${
        addClasses?.list || ""
      } ${ordered ? addClasses?.ol || "" : addClasses?.ul || ""}`}
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
