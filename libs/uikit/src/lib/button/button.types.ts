import { ComponentPropsWithoutRef } from "react";

type ButtonStatus = "primary" | "info" | "success" | "warning" | "danger";

type ButtonVariant = "ghost" | "contained" | "outlined";

type ButtonSize = "small" | "medium" | "large";

type ButtonCommonProps = {
  variant?: ButtonVariant;
  status?: ButtonStatus;
  size?: ButtonSize;
};

export type ButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "className"
> &
  ButtonCommonProps;
export type LinkButtonProps = ComponentPropsWithoutRef<"a"> & ButtonCommonProps;
