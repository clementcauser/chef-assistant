import { PASSWORD_REGEX } from "@chef-assistant/data-access-users";
import { TFunction } from "i18next";
import * as yup from "yup";

export const registerFormValidationSchema = (t: TFunction) =>
  yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .matches(PASSWORD_REGEX, t("register.form.password"))
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("register.form.confirmPassword")),
  });
