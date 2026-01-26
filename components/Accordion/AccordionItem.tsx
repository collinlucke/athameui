"use client";
import { CSSObject } from "@emotion/react";
import { useRef } from "react";
import { Button } from "../Button/Button";
import { cx } from "../../utils/cx";

export type AccordionItemType = {
  id: string | number;
  heading: React.ReactNode;
  content: React.ReactNode;
};

export type AccordionItemProps = {
  children?: React.ReactNode;
  item: AccordionItemType;
  expanded: boolean;
  className?:
    | string
    | {
        accordionItem?: string | false | null | undefined;
        accordionHeading?: string | false | null | undefined;
        accordionTitle?: string | false | null | undefined;
        accordionExpansionWrapper?: string | false | null | undefined;
        accordionContentWrapper?: string | false | null | undefined;
      }
    | false
    | undefined
    | null;
  disabled?: boolean;
  sx?: {
    accordionItem?: CSSObject;
    accordionHeading?: CSSObject;
    accordionTitle?: CSSObject;
    accordionExpansionWrapper?: CSSObject;
    accordionContentWrapper?: CSSObject;
  };

  onToggle: (id: string | number) => void;
};

export const AccordionItem = ({
  children,
  item,
  expanded,
  className,
  disabled,
  sx,

  onToggle,
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = contentRef.current?.scrollHeight;

  const itemClasses = cx(
    "ath-accordion-item",
    disabled && "ath-accordion-item-heading-disabled",
    typeof className === "object" && className !== null
      ? className.accordionItem
      : className,
  );

  const headingClasses = cx(
    "ath-accordion-item-heading",
    disabled && "ath-accordion-item-heading-disabled",
    typeof className === "object" && className !== null
      ? className.accordionHeading
      : "",
  );

  const titleClasses = cx(
    "ath-accordion-item-title",
    typeof className === "object" && className !== null
      ? className.accordionTitle
      : "",
  );

  const expansionClasses = cx(
    "ath-accordion-expansion-wrapper",
    expanded && "expanded",
    typeof className === "object" && className !== null
      ? className.accordionExpansionWrapper
      : "",
  );

  const contentWrapperClasses = cx(
    "ath-accordion-content-wrapper",
    typeof className === "object" && className !== null
      ? className.accordionContentWrapper
      : "",
  );

  return (
    <li className={itemClasses} css={sx?.accordionItem}>
      {children ? (
        <>{children}</>
      ) : (
        <>
          <Button
            className={headingClasses}
            variant="ghost"
            size="full"
            textAlign="left"
            onClick={() => onToggle(item.id)}
            disabled={disabled}
            sx={sx?.accordionHeading}
            dark
          >
            <div className={titleClasses}>{item.heading}</div>
          </Button>
          <div
            className={expansionClasses}
            style={{ height: expanded ? contentHeight : 0 }}
          >
            <div ref={contentRef} className={contentWrapperClasses}>
              {item.content}
            </div>
          </div>
        </>
      )}
    </li>
  );
};
