import { ReactNode } from "react";
import { CSSObject } from "@emotion/react";
import { cx } from "../../utils/cx";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  label: string | ReactNode;
  required?: boolean;
  className?: {
    label?: string | false | null | undefined;
    required?: string | false | null | undefined;
  };
  labelPosition?: "above" | "below" | "left" | "right";
  dark?: boolean;
  sx?: { label?: CSSObject; required?: CSSObject };
};

export const FormInputLabel = ({
  label,
  required,
  className,
  labelPosition = "above",
  dark,
  sx,
  ...rest
}: LabelProps) => {
  const labelClasses = cx(
    "ath-form-input-label",
    labelPosition ? `ath-form-input-label-${labelPosition}` : "",
    dark ? "ath-form-input-label-dark" : "",
    className?.label,
  );

  const requiredClasses = cx(
    "ath-form-input-label-required",
    dark ? "ath-form-input-label-required-dark" : "",
    className?.required,
  );

  return (
    <label className={labelClasses} css={sx?.label} {...rest}>
      {label}
      {required && (
        <span
          className={requiredClasses}
          css={sx?.required}
          aria-label="required"
        >
          *
        </span>
      )}
    </label>
  );
};
