import { UserDoc } from '../../src/models/user';

declare global{
    namespace Express {
        interface Request {
            user?: UserDoc;
            token?: string;
        }
    }
}