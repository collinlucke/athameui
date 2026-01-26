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
    accordionItem?: CSSObject;
    accordionHeading?: CSSObject;
    accordionTitle?: CSSObject;
    accordionExpansionWrapper?: CSSObject;
    accordionContentWrapper?: CSSObject;
  };
  className?:
    | string
    | {
        accordion?: string | false | null | undefined;
        accordionItem?: string | false | null | undefined;
      }
    | false
    | undefined
    | null;
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
  const classes = cx(
    "ath-accordion",
    typeof className === "object" && className !== null
      ? className.accordion
      : className,
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
    <div className={classes} css={sx?.accordion}>
      {childrenFirst && children}
      <List>
        {items.map((item) => (
          <>
            {CustomAccordionItem ? (
              <CustomAccordionItem
                key={item.id}
                {...item}
                expanded={expandedItems.includes(item.id)}
                onToggle={expandToggle}
              />
            ) : (
              <AccordionItem
                sx={sx}
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
            )}
          </>
        ))}
      </List>
      {!childrenFirst && children}
    </div>
  );
};
