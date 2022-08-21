import { RegisterForm } from "@chef-assistant/features-auth-web";
import styles from "./index.module.css";

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  return (
    <div className={styles["container"]}>
      <h1>Welcome to Register!</h1>
      <RegisterForm onSubmit={console.log} />
    </div>
  );
}

export default Register;
