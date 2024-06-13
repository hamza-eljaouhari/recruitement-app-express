import User from '../src/models/user';

export interface AuthUser {
  user: User;
  jwtToken: string;
}
