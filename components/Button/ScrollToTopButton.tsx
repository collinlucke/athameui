"use client";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleArrowUp02Icon } from "@hugeicons/core-free-icons";
import type { ButtonProps } from "./Button";
import { cx } from "../../utils/cx";

type ScrollToTopButtonProps = ButtonProps & {
  className?: {
    button?: string | false | null | undefined;
  };
};

export const ScrollToTopButton = ({
  className,
  variant,
  dark = false,
  title,
}: ScrollToTopButtonProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 300) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  const buttonClasses = cx("ath-scroll-to-top-button", className?.button);

  return (
    <Button
      className={{ button: buttonClasses }}
      data-testid="ath-scroll-to-top-button"
      onClick={scrollToTop}
      variant={variant ?? "secondary"}
      title={title ?? "Back to Top"}
      dark={dark}
    >
      <HugeiconsIcon icon={CircleArrowUp02Icon} width="50" height="50" />
    </Button>
  );
};
