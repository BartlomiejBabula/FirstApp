import 'reflect-metadata';
import { RequestHandlerPropertyDescriptor, MetaKeys } from '../types';
import { auth as authMiddleware } from '../../middlewares/auth';

export function auth (target: any, key: string, desc: RequestHandlerPropertyDescriptor) {
    const targetMethod = target[key];
    const middlewares = Reflect.getMetadata(MetaKeys.middleware, targetMethod) || [];
    middlewares.unshift(authMiddleware);
    Reflect.defineMetadata(MetaKeys.middleware, middlewares, targetMethod);
}