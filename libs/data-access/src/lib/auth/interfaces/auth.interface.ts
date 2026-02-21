export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface Login {
  username: string;
  password: string;
}
