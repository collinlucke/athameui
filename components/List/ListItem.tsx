import { cx } from "../../utils";

type ListItemProps = {
  children?: React.ReactNode;
  className?:
    | string
    | {
        li?: string | false | null | undefined;
      };
  useHover?: boolean;
  role?: "listitem" | "menuitem" | "tab" | "treeitem" | "option";
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaSelected?: boolean;
  ariaExpanded?: boolean;
  ariaLevel?: number;
  tabIndex?: number;
  dataTestId?: string;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLLIElement>) => void;
};

export const ListItem: React.FC<ListItemProps> = ({
  children,
  className,
  role = "listitem",
  ariaLabel,
  ariaDescribedBy,
  ariaSelected,
  ariaExpanded,
  ariaLevel,
  tabIndex,
  dataTestId,
  onClick,
  onKeyDown,
}) => {
  const classes = cx(
    "ath-list-item",
    typeof className === "object" && className !== null
      ? className.li
      : className,
  );

  return (
    <li
      className={classes}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-selected={ariaSelected}
      aria-expanded={ariaExpanded}
      aria-level={ariaLevel}
      tabIndex={tabIndex}
      data-testid={dataTestId}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {children}
    </li>
  );
};
