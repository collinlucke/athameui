"use client";
import { useState } from "react";
import { CSSObject } from "@emotion/react";
import { AccordionItem } from "./AccordionItem";
import { List } from "../List/List";
import type { AccordionItemType } from "./AccordionItem";
import { cx } from "../../utils/cx";

type AccordionProps = {
  children?: React.ReactNode;
  items: AccordionItemType[];
  childrenFirst?: boolean;
  expand?: "one" | "any";
  sx?: {
    accordion: CSSObject;
    accordionItem?: {
      accordionItem?: CSSObject;
      accordionHeading?: CSSObject;
      accordionTitle?: CSSObject;
      accordionExpansionWrapper?: CSSObject;
      accordionContentWrapper?: CSSObject;
    };
  };
  className?: {
    accordion?: string | false | null | undefined;
    accordionItem?: {
      accordionItem?: string | false | null | undefined;
      accordionHeading?: string | false | null | undefined;
      accordionTitle?: string | false | null | undefined;
      accordionExpansionWrapper?: string | false | null | undefined;
      accordionContentWrapper?: string | false | null | undefined;
    };
  };

  CustomAccordionItem?: React.ComponentType<
    AccordionItemType & {
      expanded: boolean;
      onToggle: (id: string | number) => void;
      className?: AccordionProps["className"];
    }
  >;

  expandToggleCallback?: (expandedItems: (string | number)[]) => void;
};

export const Accordion = ({
  children,
  className,
  items,
  childrenFirst,
  expand = "one",
  sx,

  CustomAccordionItem,

  expandToggleCallback,
}: AccordionProps) => {
  const [expandedItems, setExpandedItems] = useState<(string | number)[]>([]);
  const accordionClasses = cx(
    "ath-accordion",
    className?.accordion ? className.accordion : undefined,
  );

  const expandToggle = (itemId: string | number) => {
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
    <div className={accordionClasses} css={sx?.accordion}>
      {childrenFirst && children}
      <List>
        {items.map((item) => (
          <div key={item.id}>
            {CustomAccordionItem ? (
              <CustomAccordionItem
                expanded={expandedItems.includes(item.id)}
                onToggle={expandToggle}
                {...item}
              />
            ) : (
              <AccordionItem
                sx={sx}
                item={item}
                expanded={expandedItems.includes(item.id)}
                onToggle={expandToggle}
                className={
                  className?.accordionItem
                    ? { ...className.accordionItem }
                    : undefined
                }
              />
            )}
          </div>
        ))}
      </List>
      {!childrenFirst && children}
    </div>
  );
};
