import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.header('Authorization');
        if (!token) throw new Error();
        token = token?.replace('Bearer ', '');
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
        if (!user) throw new Error();
        req.user = user;
        req.token = token;
        next();
    } catch (err) {
        res.status(401).send({ message: "Unauthenticated" });
    }
}