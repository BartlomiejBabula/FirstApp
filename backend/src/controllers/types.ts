import { RequestHandler } from 'express';

export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete'
}

export enum MetaKeys {
    method = 'method',
    path = 'path',
    middleware = 'middleware',
    validator = 'validator' // not in use yet, create req body validating strategy!
}

export interface RequestHandlerPropertyDescriptor extends PropertyDescriptor {
    value?: RequestHandler
}