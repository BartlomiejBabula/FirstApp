import 'reflect-metadata';
import { AppRouter } from '../../router';
import { HttpMethod, MetaKeys, RequestHandlerPropertyDescriptor } from '../types';

const router = AppRouter.getInstance();

function routeBinder(method: string) {
    return function (path: string) {
        return function(target: any, key: string, desc: RequestHandlerPropertyDescriptor) {
            Reflect.defineMetadata(MetaKeys.path, path, target[key]);
            Reflect.defineMetadata(MetaKeys.method, method, target[key]);
        }
    }
}

export function controller(path: string) {
    return function(target: Function) {
        for(let key in target.prototype) {
            const routeHandler = target.prototype[key];
            const methodPath = Reflect.getMetadata(MetaKeys.path, target.prototype[key]);
            const method: HttpMethod = Reflect.getMetadata(MetaKeys.method, target.prototype[key]);
            const middlewares = Reflect.getMetadata(MetaKeys.middleware, target.prototype[key]) || [];
            if(path) router[method](path + methodPath, ...middlewares,routeHandler);
        }
    }
}

export const get = routeBinder(HttpMethod.GET);
export const post = routeBinder(HttpMethod.POST);
export const del = routeBinder(HttpMethod.DELETE);
