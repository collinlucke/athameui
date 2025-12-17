import styles from "./Header.module.css";

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const Header = ({ children, className }: HeaderProps) => {
  const combineClasses = `${styles.header} ${className || ""}`.trim();

  return <header className={combineClasses}>{children}</header>;
};
