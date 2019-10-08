import {User} from './user';
export interface Login {
  username: string;
  password: string;
}

export interface Register {
  username: string;
}
export interface Token {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export interface AuthUser {
  user: User;
  token: Token;
}
