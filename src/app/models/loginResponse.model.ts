import { User } from './user.model';

export interface LoginResponse {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly data: User;
}
