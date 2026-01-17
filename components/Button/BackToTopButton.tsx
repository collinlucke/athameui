"use client";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleArrowUp02Icon } from "@hugeicons/core-free-icons";
import type { ButtonProps } from "./Button";
import { cx } from "../../utils/cx";

type BackToTopButtonProps = ButtonProps & {
  className?: string;
};

export const BackToTopButton = (props: BackToTopButtonProps) => {
  const { className, variant, dark = false, testId, title } = props;
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

  const classes = cx("ath-back-to-top-button", className);

  return (
    <Button
      className={classes}
      data-testid={`${testId} "ath-back-to-top-button"`}
      onClick={scrollToTop}
      variant={variant ?? "secondary"}
      title={title ?? "Back to Top"}
      dark={dark}
    >
      <HugeiconsIcon icon={CircleArrowUp02Icon} width="50" height="50" />
    </Button>
  );
};
