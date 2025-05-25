export interface User {
  readonly user_id: number;
  readonly user_type: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  user_phone: string;
  created_at: Date;
  updated_at: Date;
  last_login: Date;
  is_admin: number;
}
