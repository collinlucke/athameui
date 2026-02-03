"use client";
import { CSSObject } from "@emotion/react";
import { useRef } from "react";
import { Button } from "../Button/Button";
import type {
  ButtonSize,
  ButtonTextPosition,
  ButtonVariant,
} from "../Button/button.variants";
import { cx } from "../../utils/cx";

export type AccordionItemType = {
  id: string | number;
  heading: React.ReactNode;
  content: React.ReactNode;
};

export type AccordionItemProps = {
  children?: React.ReactNode;
  className?: {
    accordionItem?: string | false | null | undefined;
    accordionHeading?: string | false | null | undefined;
    accordionTitle?: string | false | null | undefined;
    accordionExpansionWrapper?: string | false | null | undefined;
    accordionContentWrapper?: string | false | null | undefined;
  };

  disabled?: boolean;
  expanded: boolean;
  headingSize?: ButtonSize;
  headingTextPosition?: ButtonTextPosition;
  headingVariant?: ButtonVariant;
  item: AccordionItemType;
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
  className,
  disabled,
  expanded,
  item,
  headingSize = "full",
  headingTextPosition = "left",
  headingVariant = "ghost",
  sx,

  onToggle,
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = contentRef.current?.scrollHeight;

  const itemClasses = cx(
    "ath-accordion-item",
    disabled && "ath-accordion-item-heading-disabled",
    className?.accordionItem ? className.accordionItem : undefined,
  );

  const headingClasses = cx(
    "ath-accordion-item-heading",
    disabled && "ath-accordion-item-heading-disabled",
    className?.accordionHeading ? className.accordionHeading : "",
  );

  const titleClasses = cx(
    "ath-accordion-item-title",
    className?.accordionTitle ? className.accordionTitle : "",
  );

  const expansionClasses = cx(
    "ath-accordion-expansion-wrapper",
    expanded && "expanded",
    className?.accordionExpansionWrapper
      ? className.accordionExpansionWrapper
      : "",
  );

  const contentWrapperClasses = cx(
    "ath-accordion-content-wrapper",
    className?.accordionContentWrapper ? className.accordionContentWrapper : "",
  );

  const onToggleHandler = () => {
    if (!disabled) {
      onToggle(item.id);
    }
  };

  return (
    <li className={itemClasses} css={sx?.accordionItem}>
      <>
        <Button
          className={{ button: headingClasses }}
          variant={headingVariant}
          size={headingSize}
          textPosition={headingTextPosition}
          onClick={onToggleHandler}
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
    </li>
  );
};
