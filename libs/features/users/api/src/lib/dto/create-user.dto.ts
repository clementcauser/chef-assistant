import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;
}
