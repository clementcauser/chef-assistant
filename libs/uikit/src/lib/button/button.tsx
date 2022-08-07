import clsx from "clsx";
import { ButtonProps } from "./button.types";
import styles from "./button.module.css";

export const Button = ({
  children,
  variant = "ghost",
  status = "primary",
  size = "medium",
  ...rest
}: ButtonProps) => {
  const dynamicStyles = [
    // ghost primary
    variant === "ghost" &&
      status === "primary" &&
      styles["button-ghost-primary"],
    // ghost success
    variant === "ghost" &&
      status === "success" &&
      styles["button-ghost-success"],
    // ghost info
    variant === "ghost" && status === "info" && styles["button-ghost-info"],
    // ghost warning
    variant === "ghost" &&
      status === "warning" &&
      styles["button-ghost-warning"],
    // ghost danger
    variant === "ghost" && status === "danger" && styles["button-ghost-danger"],
    // contained primary
    variant === "contained" &&
      status === "primary" &&
      styles["button-contained-primary"],
    // contained info
    variant === "contained" &&
      status === "info" &&
      styles["button-contained-info"],
    // contained success
    variant === "contained" &&
      status === "success" &&
      styles["button-contained-success"],
    // contained warning
    variant === "contained" &&
      status === "warning" &&
      styles["button-contained-warning"],
    // contained danger
    variant === "contained" &&
      status === "danger" &&
      styles["button-contained-danger"],
    // outlined primary
    variant === "outlined" &&
      status === "primary" &&
      styles["button-outlined-primary"],
    // outlined info
    variant === "outlined" &&
      status === "info" &&
      styles["button-outlined-info"],
    // outlined success
    variant === "outlined" &&
      status === "success" &&
      styles["button-outlined-success"],
    // outlined warning
    variant === "outlined" &&
      status === "warning" &&
      styles["button-outlined-warning"],
    // outlined danger
    variant === "outlined" &&
      status === "danger" &&
      styles["button-outlined-danger"],
    // size small
    size === "small" && styles["button-size-small"],
    // size medium
    size === "medium" && styles["button-size-medium"],
    // size large
    size === "large" && styles["button-size-large"],
  ];

  return (
    <button
      type="button"
      className={clsx(styles["button-common"], dynamicStyles)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
