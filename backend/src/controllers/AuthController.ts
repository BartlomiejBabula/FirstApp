import { Request, Response } from 'express';
import { post, controller, auth, del, get } from './decorators';
import User from '../models/user';


@controller('/auth')
export class AuthController {
    constructor() {}

    @post('/register')
    async registerNewUser(req: Request, res: Response) {
        const { email, password, name }: {name: string, email: string, password: string} = req.body;
        let user = new User();
        
        user.email = email;
        user.password = password;
        user.name = name;

        try {
            const token = await user.generateToken();
            const userCreated = await user.save();
            res.send({user: userCreated, token })
        } catch (error) {
            res.send(error.message)
        }
    }

    @post('/login')
    async loginUser(req: Request, res: Response) {
        const { email, password }: { email: string, password: string } = req.body;
        try {
            const user = await User.getByCredentials(email, password);
            if (!user) throw new Error('User not Found!')
            const token = await user.generateToken();
            res.send({user, token});
        } catch (error) {
            res.status(400).send(error.message);
        }
    }

    @auth
    @post('/logout')
    async userLogout(req: Request, res: Response) {
        try {
            if (!req.user) throw new Error();
            req.user.tokens = req.user?.tokens.filter(el => el.token !== req.token);
            await req.user.save();
            res.status(204).send();
        } catch (e) {
            res.status(500).send();
        }
    }

    @auth
    @del('/delete-user')
    async deleteUser(req: Request, res: Response) {

        const { password }: { password: string } = req.body;

        try {
            if (!req.user) throw new Error('User doesn\'t exist.');
            const user = await User.getByCredentials(req.user.email, password);
            await User.findOneAndDelete({ _id: user._id });
            res.status(204).send();
        } catch (err) {
            res.status(400).send();
        }
    }

    @auth
    @get('/dupa')
    dupa(req: Request, res: Response) {
        res.send('DUPA')
    }
}
