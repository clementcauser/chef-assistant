export interface JwtToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}
