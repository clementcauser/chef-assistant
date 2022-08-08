import { IsEmail, IsNotEmpty, IsString, Matches, Min } from "class-validator";
import { PASSWORD_REGEX } from "../users.constants";

export class SignInInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(PASSWORD_REGEX)
  @Min(6)
  @IsNotEmpty()
  password: string;
}
