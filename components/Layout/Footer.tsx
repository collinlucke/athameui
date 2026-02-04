"use client";
import { cx } from "../../utils";

type FooterProps = {
  children: React.ReactNode;
  classesName?: {
    footer?: string | false | null | undefined;
  };
};

export const Footer = ({ children, classesName }: FooterProps) => {
  const classes = cx("ath-footer", classesName?.footer);
  return <footer className={classes}>{children}</footer>;
};
