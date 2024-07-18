import { IUser } from '../src/models/User';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      registration?: {
        eventId: string;
        email: string;
      };
    }
  }
}
