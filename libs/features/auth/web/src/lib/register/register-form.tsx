import { Button, TextInput } from "@chef-assistant/uikit";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { registerFormValidationSchema } from "./register.form.constant";

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

interface RegisterFormProps {
  onSubmit: (payload: FormValues) => void;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [t] = useTranslation();
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(registerFormValidationSchema(t)),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field: { ref, ...inputProps }, fieldState: { error } }) => (
          <TextInput
            {...inputProps}
            id={inputProps.name}
            label="Prénom"
            placeholder="Jean"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field: { ref, ...inputProps }, fieldState: { error } }) => (
          <TextInput
            {...inputProps}
            id={inputProps.name}
            label="Nom de famille"
            placeholder="Dupont"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { ref, ...inputProps }, fieldState: { error } }) => (
          <TextInput
            {...inputProps}
            id={inputProps.name}
            type="email"
            label="Adresse email"
            placeholder="jean.dupont@mail.com"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { ref, ...inputProps }, fieldState: { error } }) => (
          <TextInput
            {...inputProps}
            id={inputProps.name}
            type="password"
            label="Mot de passe"
            placeholder="******"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { ref, ...inputProps }, fieldState: { error } }) => (
          <TextInput
            {...inputProps}
            id={inputProps.name}
            type="password"
            label="Confirmation du mot de passe"
            placeholder="******"
            errorMessage={error?.message}
          />
        )}
      />

      <Button type="submit" variant="contained">
        Créer un compte
      </Button>
    </form>
  );
};

export default RegisterForm;
