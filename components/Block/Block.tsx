import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

type BlockProps = {
  children: React.ReactNode;
  className?: {
    block?: string | false | null | undefined;
  };
  sx?: {
    block: CSSObject;
  };
};

export const Block = ({ children, className, sx }: BlockProps) => {
  const blockClasses = cx("ath-block", className?.block);

  return (
    <div className={blockClasses} data-testid="block" css={sx?.block}>
      {children}
    </div>
  );
};
