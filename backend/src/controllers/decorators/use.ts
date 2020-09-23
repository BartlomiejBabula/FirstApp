import { MetaKeys } from '../types';

export function use(middleware: Function) {
    return function(target: any, key: string, desc: PropertyDescriptor) {
        const targetMethod = target[key];
        const middlewares = Reflect.getMetadata(MetaKeys.middleware, targetMethod) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetaKeys.middleware, middlewares, targetMethod);
    }
}