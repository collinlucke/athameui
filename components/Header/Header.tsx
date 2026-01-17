import { cx } from "../../utils/cx";

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const Header = ({ children, className }: HeaderProps) => {
  const classes = cx("ath-header", className);

  return <header className={classes}>{children}</header>;
};
