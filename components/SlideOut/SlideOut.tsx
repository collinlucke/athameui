import { CSSObject } from "@emotion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { useEffect, useRef } from "react";
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
  const slideOutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = slideOutRef.current;
    if (!element) return;
    if (isOpen) element.removeAttribute("inert");
    else element.setAttribute("inert", "");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={slideOutRef}
      className={slideOutClasses}
      css={sx?.slideOut}
      data-testid="slide-out"
    >
      <div className={overlayClasses} css={sx?.overlay} onClick={onClose} />
      <div
        className={panelClasses}
        css={sx?.panel}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
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
