"use client";
import { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import type { AccordionItemType } from "./AccordionItem";
import { cx } from "../../utils/cx";

type AccordionProps = {
  children?: React.ReactNode;
  items: AccordionItemType[];
  childrenFirst?: boolean;
  expand?: "one" | "any";
  className?:
    | string
    | {
        accordion?: string | false | null | undefined;
        accordionItem?: string | false | null | undefined;
      }
    | false
    | undefined
    | null;
  expandToggleCallback?: (expandedItems: (string | number)[]) => void;
};

export const Accordion = ({
  children,
  className,
  items,
  childrenFirst,
  expand = "one",

  expandToggleCallback,
}: AccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<(string | number)[]>([]);
  const classes = cx(
    "ath-accordion",
    typeof className === "object" && className !== null
      ? className.accordion
      : className
  );

  const expandToggle = (itemId: string | number) => {
    console.log(
      "Rendering AccordionItem:",
      itemId,
      "Expanded:",
      expandedItems.includes(itemId)
    );
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      if (expand === "one") {
        setExpandedItems([itemId]);
      } else if (expand === "any") {
        setExpandedItems([...expandedItems, itemId]);
      }
    }
    if (expandToggleCallback) {
      expandToggleCallback(expandedItems);
    }
  };

  return (
    <div className={classes}>
      {childrenFirst && children}
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          expanded={expandedItems.includes(item.id)}
          onToggle={expandToggle}
          className={
            typeof className === "object" && className !== null
              ? className.accordionItem
              : undefined
          }
        />
      ))}
      {!childrenFirst && children}
    </div>
  );
};
