import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

type AvatarProps = {
  displayName: string;
  imageUrl?: string;
  className?: {
    avatar?: string;
    initials?: string;
    image?: string;
  };
  size?: "small" | "medium" | "large" | "profile";
  sx?: {
    avatar?: CSSObject;
    initials?: CSSObject;
    image?: CSSObject;
  };
};

export const Avatar = ({
  className,
  displayName = "Display Name",
  imageUrl,
  sx,
  size = "medium",
}: AvatarProps) => {
  const initials = displayName.split(" ").map((n) => n[0].toUpperCase());
  const avatarClasses = cx(
    "ath-avatar",
    `ath-avatar-${size}`,
    className?.avatar,
  );
  const initialsClasses = cx("ath-avatar-initials", className?.initials);
  const imageClasses = cx("ath-avatar-image", className?.image);

  return (
    <div
      css={sx?.avatar}
      className={avatarClasses}
      role="img"
      aria-label={displayName}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" css={sx?.image} className={imageClasses} />
      ) : (
        <div css={sx?.initials} className={initialsClasses}>
          {initials}
        </div>
      )}
    </div>
  );
};
