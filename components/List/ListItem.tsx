type ListItemProps = {
  children?: React.ReactNode;
  addClasses?: {
    li?: string;
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
  addClasses,
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
  return (
    <li
      className={`bn-list-item rounded-md border border-solid border-color-secondary-50 hover:bg-secondary-50 ${
        addClasses?.li || ""
      }`}
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
