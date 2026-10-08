import { CSSObject } from "@emotion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";

export type SlideOutProps = {
  children: React.ReactNode;
  className?: {
    slideOut?: string | false | null | undefined;
    overlay?: string | false | null | undefined;
    panel?: string | false | null | undefined;
    closeButton?: string | false | null | undefined;
  };
  from?: "left" | "right";
  isOpen?: boolean;
  sx?: {
    slideOut?: CSSObject;
    overlay?: CSSObject;
    panel?: CSSObject;
    closeButton?: CSSObject;
  };

  onClose: () => void;
};

export const SlideOut = ({
  children,
  className,
  from = "right",
  isOpen = false,
  sx,

  onClose,
}: SlideOutProps) => {
  const slideOutClasses = cx("ath-slide-out", className?.slideOut);
  const overlayClasses = cx(
    "ath-slide-out-overlay",
    isOpen && "ath-slide-out-overlay-open",
    className?.overlay,
  );
  const panelClasses = cx(
    "ath-slide-out-panel",
    from === "left" ? "ath-slide-out-from-left" : "ath-slide-out-from-right",
    isOpen && "ath-slide-out-panel-open",
    className?.panel,
  );
  const closeButtonClasses = cx(
    "ath-slide-out-close-button",
    className?.closeButton,
  );

  return (
    <div className={slideOutClasses} css={sx?.slideOut} data-testid="slide-out">
      <div className={overlayClasses} css={sx?.overlay} onClick={onClose} />
      <div className={panelClasses} css={sx?.panel}>
        <Button
          className={{ button: closeButtonClasses }}
          sx={{ button: sx?.closeButton }}
          onClick={onClose}
          aria-label="Close menu"
          variant="ghost"
          dark
          size="medium"
          icon={<HugeiconsIcon icon={CancelCircleIcon} size={24} />}
        />
        {children}
      </div>
    </div>
  );
};
