import { JwtPayload } from 'jsonwebtoken';
import { UserAttributes } from '../src/models/user';

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
