"use client";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

export type CheckboxProps = {
  checked: boolean;
  className?: string;
  dark?: boolean;
  disabled?: boolean;
  id?: string;
  label?: string;
  name?: string;
  sx?: CSSObject;
  onChange: (checked: boolean) => void;
};

export const Checkbox = ({
  checked,
  className,
  dark = false,
  disabled = false,
  id,
  label,
  name,
  sx,
  onChange,
}: CheckboxProps) => {
  return (
    <label
      className={cx(
        "ath-checkbox",
        dark && "ath-checkbox-dark",
        disabled && "ath-checkbox-disabled",
        className,
      )}
      css={sx}
      htmlFor={id}
    >
      <input
        id={id}
        className="ath-checkbox-input"
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      {label && <span className="ath-checkbox-label">{label}</span>}
    </label>
  );
};
