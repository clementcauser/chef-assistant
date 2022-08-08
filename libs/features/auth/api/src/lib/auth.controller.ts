import { SignInInput, SignUpInput } from "@chef-assistant/data-access-users";
import { Body, Controller, Post } from "@nestjs/common";
import { AUTH_ENDPOINTS } from "./auth.constants";
import { AuthService } from "./auth.service";

@Controller(AUTH_ENDPOINTS.partial.base)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AUTH_ENDPOINTS.partial.signin)
  async signin(@Body() signInDto: SignInInput) {
    return this.authService.signin(signInDto);
  }

  @Post(AUTH_ENDPOINTS.partial.signup)
  async signup(@Body() signUpDto: SignUpInput) {
    return this.authService.signup(signUpDto);
  }
}
