import { Children, useState, useRef, type ReactNode } from "react";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@hugeicons/core-free-icons";

export type CarouselProps = {
  children?: ReactNode;
  className?: {
    carousel?: string | false | null | undefined;
  };
  emptyMessage?: string;
  sx?: {
    carousel?: CSSObject;
  };
};

export const Carousel = ({
  children,
  className,
  emptyMessage,
  sx,
}: CarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselClasses = cx(
    "ath-carousel",
    isHovered ? "ath-carousel-hover" : "",
    className?.carousel,
  );
  const hasItems = Children.count(children) > 0;

  const scrollByPage = (direction: -1 | 1) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth,
      behavior: "smooth",
    });
  };

  const handleLeftArrowClick = () => {
    scrollByPage(-1);
  };
  const handleRightArrowClick = () => {
    scrollByPage(1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="ath-carousel-wrapper">
      <div
        className={carouselClasses}
        css={sx?.carousel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={carouselRef}
      >
        <Button
          className={{ button: "ath-carousel-arrow ath-carousel-left-arrow" }}
          onClick={handleLeftArrowClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          icon={<HugeiconsIcon icon={ArrowLeftIcon} size={36} />}
        />
        {hasItems ? children : emptyMessage}
        <Button
          className={{ button: "ath-carousel-arrow ath-carousel-right-arrow" }}
          onClick={handleRightArrowClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          icon={<HugeiconsIcon icon={ArrowRightIcon} size={36} />}
        />
      </div>
    </div>
  );
};
