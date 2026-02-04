"use client";
import React from "react";
import { CSSObject } from "@emotion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CancelCircleIcon } from "@hugeicons/core-free-icons";
import { Button } from "../Button/Button";
import { cx } from "../../main";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: string;
  showCloseButton?: boolean;
  dataTestId?: string;
  className?: {
    backdrop?: string;
    modal?: string;
    header?: string;
    title?: string;
    content?: string;
    closeButton?: string;
  };
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  finalFocusRef?: React.RefObject<HTMLElement>;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  sx?: {
    backdrop?: CSSObject;
    modal?: CSSObject;
    header?: CSSObject;
    title?: CSSObject;
    content?: CSSObject;
    closeButton?: CSSObject;
  };
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  title,
  showCloseButton = true,
  dataTestId,
  className,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  trapFocus = true,
  initialFocusRef,
  finalFocusRef,
  sx,

  onClose,
  ...rest
}) => {
  const [previouslyFocusedElement, setPreviouslyFocusedElement] =
    React.useState<HTMLElement | null>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const backdropClasses = cx("ath-modal-backdrop", className?.backdrop);
  const modalClasses = cx("ath-modal", className?.modal);
  const headerClasses = cx("ath-modal-header", className?.header);
  const titleClasses = cx("ath-modal-title", className?.title);
  const contentClasses = cx("ath-modal-content", className?.content);
  const closeButtonClasses = cx(
    "ath-modal-close-button",
    className?.closeButton,
  );

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Focus trap implementation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!trapFocus || e.key !== "Tab") return;

    const modalElement = modalRef.current;
    if (!modalElement) return;

    const focusableElements = modalElement.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setPreviouslyFocusedElement(document.activeElement as HTMLElement);

      document.body.style.overflow = "hidden";

      setTimeout(() => {
        if (initialFocusRef?.current) {
          initialFocusRef.current.focus();
        } else {
          const modalElement = modalRef.current;
          if (modalElement) {
            const firstFocusable = modalElement.querySelector(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            ) as HTMLElement;
            if (firstFocusable) {
              firstFocusable.focus();
            }
          }
        }
      }, 0);
    } else {
      document.body.style.overflow = "";

      if (finalFocusRef?.current) {
        finalFocusRef.current.focus();
      } else if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [
    isOpen,
    onClose,
    closeOnEscape,
    initialFocusRef,
    finalFocusRef,
    previouslyFocusedElement,
  ]);

  if (!isOpen) return null;

  const titleId = title ? `${dataTestId || "modal"}-title` : undefined;

  return (
    <div
      className={backdropClasses}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      css={sx?.backdrop}
    >
      <div
        ref={modalRef}
        css={sx?.modal}
        className={modalClasses}
        role="dialog"
        {...rest}
      >
        {(title || showCloseButton) && (
          <div css={sx?.header} className={headerClasses}>
            {title && (
              <h1 css={sx?.title} className={titleClasses} id={titleId}>
                {title}
              </h1>
            )}
            {showCloseButton && (
              <Button
                className={{ button: closeButtonClasses }}
                sx={{ button: sx?.closeButton }}
                onClick={onClose}
                aria-label="Close modal"
                variant="ghost"
                size="medium"
                icon={<HugeiconsIcon icon={CancelCircleIcon} size={24} />}
              />
            )}
          </div>
        )}
        <div css={sx?.content} className={contentClasses}>
          {children}
        </div>
      </div>
    </div>
  );
};
