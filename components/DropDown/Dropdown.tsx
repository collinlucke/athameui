"use client";
import { useEffect, useRef } from "react";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

export type DropdownProps = {
  children: React.ReactNode;
  className?: {
    dropdown?: string | false | null | undefined;
  };
  isOpen: boolean;
  sx?: {
    dropdown?: CSSObject;
  };

  onClose: () => void;
};

export const Dropdown = ({
  children,
  className,
  isOpen,
  sx,

  onClose,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownClasses = cx(
    "ath-dropdown",
    isOpen && "ath-dropdown-open",
    className?.dropdown,
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className={dropdownClasses}
      css={sx?.dropdown}
      data-testid="dropdown"
    >
      {children}
    </div>
  );
};
