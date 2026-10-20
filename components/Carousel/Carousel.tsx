import {
  Children,
  isValidElement,
  useState,
  useRef,
  useLayoutEffect,
  type DragEvent,
  type ReactNode,
} from "react";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import { FormLabel } from "../FormLabel/FormLabel";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";

export type CarouselProps = {
  children?: ReactNode;
  className?: {
    carousel?: string | false | null | undefined;
  };
  emptyMessage?: string;
  label?: string;
  onRemove?: (index: number) => void;
  onReorder?: (from: number, to: number) => void;
  removeLabel?: string | ((index: number) => string);
  sx?: {
    carousel?: CSSObject;
  };
};

export const Carousel = ({
  children,
  className,
  emptyMessage = "Nothing here yet",
  label,
  onRemove,
  onReorder,
  removeLabel = "Remove item",
  sx,
}: CarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragIndex = useRef<number | null>(null);
  const carouselClasses = cx("ath-carousel", className?.carousel);
  const items = Children.toArray(children);
  const itemCount = items.length;
  const interactive = Boolean(onRemove || onReorder);

  const finishDrag = () => {
    dragIndex.current = null;
    setDropIndex(null);
  };

  const handleDragStart = (index: number) => (event: DragEvent<HTMLDivElement>) => {
    const target = event.target;
    if (
      target instanceof Element &&
      target.closest(".ath-carousel-remove, .ath-carousel-remove-button")
    ) {
      event.preventDefault();
      return;
    }
    dragIndex.current = index;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (index: number) => (event: DragEvent<HTMLDivElement>) => {
    if (!onReorder) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (dropIndex !== index) setDropIndex(index);
  };

  const handleDrop = (index: number) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const from = dragIndex.current;
    finishDrag();
    if (from == null || !onReorder) return;
    onReorder(from, index);
  };

  useLayoutEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const updateArrows = () => {
      const hidden = el.scrollWidth - el.clientWidth;
      setShowLeftArrow(el.scrollLeft > 1);
      setShowRightArrow(hidden - el.scrollLeft > 1);
    };

    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      observer.disconnect();
    };
  }, [itemCount]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="ath-carousel-container"
      style={{ minWidth: itemCount === 1 ? "" : 0 }}
    >
      {label && <FormLabel label={label} dark />}
      <div
        className={cx(
          "ath-carousel-wrapper",
          isHovered && "ath-carousel-hover",
          label && "ath-carousel-label",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showLeftArrow && (
          <Button
            className={{ button: "ath-carousel-arrow ath-carousel-left-arrow" }}
            onClick={() => scrollByPage(-1)}
            icon={<HugeiconsIcon icon={ArrowLeftIcon} size={36} />}
          />
        )}
        <div className={carouselClasses} css={sx?.carousel} ref={carouselRef}>
          {itemCount > 0 ? (
            interactive ? (
              items.map((child, index) => (
                <div
                  key={isValidElement(child) ? (child.key ?? index) : index}
                  className={cx(
                    "ath-carousel-slot",
                    onReorder && dropIndex === index && "ath-carousel-slot-target",
                  )}
                  draggable={Boolean(onReorder)}
                  onDragStart={onReorder ? handleDragStart(index) : undefined}
                  onDragOver={onReorder ? handleDragOver(index) : undefined}
                  onDrop={onReorder ? handleDrop(index) : undefined}
                  onDragEnd={onReorder ? finishDrag : undefined}
                >
                  {onRemove && (
                    <Button
                      variant="ghost"
                      size="small"
                      type="button"
                      className={{ button: "ath-carousel-remove-button" }}
                      icon={<HugeiconsIcon icon={Delete02Icon} size={16} />}
                      aria-label={
                        typeof removeLabel === "function"
                          ? removeLabel(index)
                          : removeLabel
                      }
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemove(index);
                      }}
                    />
                  )}
                  {child}
                </div>
              ))
            ) : (
              children
            )
          ) : (
            <div className="ath-carousel-empty">{emptyMessage}</div>
          )}
        </div>
        {showRightArrow && (
          <Button
            className={{
              button: "ath-carousel-arrow ath-carousel-right-arrow",
            }}
            onClick={() => scrollByPage(1)}
            icon={<HugeiconsIcon icon={ArrowRightIcon} size={36} />}
          />
        )}
      </div>
    </div>
  );
};
