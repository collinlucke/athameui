import {
  Children,
  useState,
  useRef,
  useLayoutEffect,
  type ReactNode,
} from "react";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import { FormLabel } from "../FormLabel/FormLabel";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@hugeicons/core-free-icons";

export type CarouselProps = {
  children?: ReactNode;
  className?: {
    carousel?: string | false | null | undefined;
  };
  emptyMessage?: string;
  label?: string;
  sx?: {
    carousel?: CSSObject;
  };
};

export const Carousel = ({
  children,
  className,
  emptyMessage = "Nothing here yet",
  label,
  sx,
}: CarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselClasses = cx("ath-carousel", className?.carousel);
  const itemCount = Children.count(children);

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
            children
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
