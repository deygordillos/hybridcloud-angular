import { User } from './user.model';

export interface LoginResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly data: User;
}
