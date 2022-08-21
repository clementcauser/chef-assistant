import { PASSWORD_REGEX } from "@chef-assistant/data-access-users";
import * as yup from "yup";

export const registerFormValidationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().matches(PASSWORD_REGEX).required(),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent être identiques"
    ),
});
