export interface RegisterRequest {
  email: string;
  password: string;
  repeat_password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  access_token_expire: number;
  refresh_token_expire: number;
}
