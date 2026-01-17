type ButtonGroupProps = {
  children: React.ReactNode;
  gap?: string;
  direction?: "row" | "column";
};

export const ButtonGroup = ({
  children,
  gap = "2",
  direction = "row",
}: ButtonGroupProps) => {
  return <div className={`flex flex-${direction} gap-${gap}`}>{children}</div>;
};
