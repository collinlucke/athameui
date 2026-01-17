"use client";
import { useRef } from "react";
import { Button } from "../Button/Button";
import { cx } from "../../utils/cx";

export type AccordionItemType = {
  id: string | number;
  heading: string;
  content: React.ReactNode;
};

export type AccordionItemProps = {
  item: AccordionItemType;
  expanded: boolean;
  onToggle: (id: string | number) => void;
  className?:
    | string
    | { accordionItem?: string | false | null | undefined }
    | false
    | undefined
    | null;
};

export const AccordionItem = ({
  item,
  expanded,
  onToggle,
  className,
}: AccordionItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = contentRef.current?.scrollHeight;

  const classes = cx(
    "ath-accordion-item",
    typeof className === "object" && className !== null
      ? className.accordionItem
      : className
  );

  return (
    <div className={classes}>
      <Button
        className="ath-accordion-item-heading"
        variant="ghost"
        size="full"
        textAlign="left"
        onClick={() => onToggle(item.id)}
        dark
      >
        <h4>{item.heading}</h4>
      </Button>
      <div
        className={cx(
          "ath-accordion-expansion-wrapper",
          expanded && "expanded"
        )}
        style={{ height: expanded ? contentHeight : 0 }}
      >
        <div ref={contentRef} className="ath-accordion-item-content">
          {item.content}
        </div>
      </div>
    </div>
  );
};
