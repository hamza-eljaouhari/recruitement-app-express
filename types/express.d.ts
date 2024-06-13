import { JwtPayload } from 'jsonwebtoken';
import { UserAttributes } from '../models/user';

declare global {
  namespace Express {
    interface User extends UserAttributes {
      id: number;
    }

    interface Request {
      user?: JwtPayload;
    }
  }
}
