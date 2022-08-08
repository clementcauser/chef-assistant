import {
  SignInInput,
  SignInOutput,
  SignUpInput,
  User,
} from "@chef-assistant/data-access-users";
import { UsersService } from "@chef-assistant/features-users-api";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<User, "password" | "createdAt" | "updatedAt"> | null> {
    const user = await this.usersService.findOneByEmail(email);

    const valid = await bcrypt.compare(password, user.password);

    if (user && valid) {
      const result = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return result;
    }

    throw new UnauthorizedException("Invalid credentials");
  }

  async signin(signInInput: SignInInput): Promise<SignInOutput> {
    const { email, password } = signInInput;

    const user = await this.validateUser(email, password);

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user._id,
      }),
      user: {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
        sub: user._id,
      },
    };
  }

  async signup(signupInput: SignUpInput) {
    const password = await bcrypt.hash(signupInput.password, 10);

    return this.usersService.create({ ...signupInput, password });
  }
}
