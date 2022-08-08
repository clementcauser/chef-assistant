import { IsEmail, IsNotEmpty, IsString, Matches, Min } from "class-validator";
import { PASSWORD_REGEX } from "../users.constants";

export class SignUpInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(PASSWORD_REGEX)
  @Min(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
