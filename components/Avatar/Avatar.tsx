"use client";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

type AvatarProps = {
  displayName: string;
  imageUrl?: string;
  className?: {
    avatar?: string;
    initials?: string;
    // image?: string;
  };
  size?: number;
  sx?: {
    avatar?: CSSObject;
    initials?: CSSObject;
    // image?: CSSObject;
  };
};

// TODO: Add images later
export const Avatar = ({
  className,
  displayName = "Display Name",
  sx,
  size = 40,
}: AvatarProps) => {
  const initials = displayName.split(" ").map((n) => n[0].toUpperCase());
  const avatarClasses = cx(
    ".ath-avatar",
    `width-${size}px`,
    `height-${size}px`,
    `line-height-${size}px`,
    className?.avatar,
  );
  const initialsClasses = cx(
    ".ath-avatar-initials",
    `font-size-${size / 2}px`,
    className?.initials,
  );
  // const imageClasses = cx(".ath-avatar-image", className?.image);

  return (
    <div css={sx?.avatar} className={avatarClasses}>
      <div css={sx?.initials} className={initialsClasses}>
        {initials[0]}
        {initials[1]}
      </div>
    </div>
  );
};
