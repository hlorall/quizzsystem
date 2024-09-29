import { User } from 'src/user/user-entity'; // Adjust the import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
