"use client";
import React from "react";
import { FormInput } from "../FormElements";
import { Button } from "../Button";
import { cx } from "../../utils/cx";
import { CSSObject } from "@emotion/react";

type SearchProps = {
  autoFocus?: boolean;
  buttonSize?: "large" | "medium" | "small";
  buttonText?: string;
  buttonVariant?: "primary" | "secondary" | "tertiary" | "ghost" | "outline";
  className?: {
    searchWrapper?: string | CSSObject;
    resultsText?: string | CSSObject;
    searchForm?: string | CSSObject;
    searchFieldContainer?: string | CSSObject;
    searchButton?: string | CSSObject;
  };
  dark?: boolean;
  inputSize?: "large" | "medium" | "small";
  label?: string;
  labelPosition?: "left" | "right" | "above" | "below";
  resultsAriaLive?: "polite" | "assertive" | "off";
  resultsLabel?: React.ReactNode;
  searchLabel?: string;
  searchRole?: string;
  searchTerm?: string | number;
  showResultsCount?: boolean;
  showSearchButton?: boolean;
  sx?: {
    searchWrapper?: CSSObject;
    resultsText?: CSSObject;
    searchForm?: CSSObject;
    searchFieldContainer?: CSSObject;
    searchButton?: CSSObject;
  };
  testId?: string;
  totalResultsCount?: string;

  onSearch?: (searchTerm: string | number | undefined) => void;
  setSearchTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Search = ({
  autoFocus = false,
  buttonSize,
  buttonText,
  buttonVariant = "primary",
  className,
  dark = false,
  inputSize,
  label,
  labelPosition = "above",
  resultsAriaLive = "polite",
  resultsLabel,
  searchLabel,
  searchRole,
  searchTerm,
  showResultsCount = true,
  showSearchButton = true,
  sx,
  totalResultsCount = "0",

  onSearch,
  setSearchTerm,

  ...rest
}: SearchProps) => {
  const setSearchTermHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target instanceof HTMLInputElement) {
      setSearchTerm(e as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const onSearchHandler = () => {
    onSearch?.(searchTerm);
  };

  const hitEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchHandler();
    }
  };

  return (
    <div
      className={cx(
        "ath-search-form",
        typeof className?.searchForm === "string" ? className.searchForm : "",
      )}
      css={sx?.searchForm}
      role={searchRole || "search"}
      {...rest}
    >
      <div
        className={cx(
          "ath-search-wrapper",
          typeof className?.searchWrapper === "string"
            ? className.searchWrapper
            : "",
        )}
        css={sx?.searchWrapper}
      >
        {showResultsCount && (
          <div
            className={cx(
              "ath-search-results",
              typeof className?.resultsText === "string"
                ? className.resultsText
                : "",
            )}
            css={sx?.resultsText}
            data-testid="total-results"
            aria-live={resultsAriaLive}
            aria-atomic="true"
            role="status"
          >
            {resultsLabel ?? "Total Results:"} {totalResultsCount}
          </div>
        )}

        <div className="ath-search-input-wrapper">
          <FormInput
            type="search"
            value={searchTerm || ""}
            name="searchTerm"
            labelPosition={labelPosition}
            label={label}
            placeholder={searchLabel || "Search"}
            autoFocus={autoFocus}
            className={{
              container:
                typeof className?.searchFieldContainer === "string"
                  ? className.searchFieldContainer
                  : "ath-search-field-container",
            }}
            onChange={setSearchTermHandler}
            size={inputSize}
            onKeyDown={hitEnter}
            dark={dark}
            sx={{ container: sx?.searchFieldContainer }}
          />
        </div>

        {showSearchButton && (
          <Button
            size={buttonSize}
            onClick={onSearchHandler}
            variant={buttonVariant}
            dark={dark}
            className={{
              button:
                typeof className?.searchButton === "string"
                  ? className.searchButton
                  : "ath-search-button",
            }}
            sx={{ button: sx?.searchButton }}
          >
            {buttonText || "Search"}
          </Button>
        )}
      </div>
    </div>
  );
};
