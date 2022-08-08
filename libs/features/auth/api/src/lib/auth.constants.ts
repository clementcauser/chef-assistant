const AUTH_PARTIAL_ENDPOINTS = {
  base: "auth",
  signin: "signin",
  signup: "signup",
};

export const AUTH_ENDPOINTS = {
  partial: AUTH_PARTIAL_ENDPOINTS,
  signin: `${AUTH_PARTIAL_ENDPOINTS.base}/${AUTH_PARTIAL_ENDPOINTS.signin}`,
  signup: `${AUTH_PARTIAL_ENDPOINTS.base}/${AUTH_PARTIAL_ENDPOINTS.signup}`,
};
