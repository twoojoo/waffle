import { Handler, handlerFactory } from './handler'
import { HTTPMethods, RouteGenericInterface } from "fastify"
import type { ServerContext } from './server'
import { HookCallback, HookWithPayloadCallback, OnErrorHookCallback, RouteHooks, routeHooksFactory } from './hooks'
import { RouteLimiter, routeLimiterFactory } from './limiter'
import { RateLimitOptions } from '@fastify/rate-limit'
import { ResponseSchema, RouteValidation, routeValidationFactory } from './validation'

type Method = <RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path?: string) => Route<RouteTypes>

export type Methods = {
  GET: Method,
  POST: Method,
  PUT: Method,
  PATCH: Method,
  DELETE: Method
}

export type Route<RouteTypes extends RouteGenericInterface> = 
  RouteHooks<RouteTypes> & 
  RouteLimiter<RouteTypes> & 
  Handler<RouteTypes> &
  RouteValidation<RouteTypes>

export type RouteContext = {
  method: HTTPMethods,
  path: string,
  hooks: {
    onRequest?: HookCallback
    preParsing?: HookWithPayloadCallback
    preValidation?: HookCallback
    preHandler?: HookCallback
    preSerialization?: HookWithPayloadCallback
    onError?: OnErrorHookCallback
    onSend?: HookWithPayloadCallback
    onResponse?: HookCallback
    onTimeout?: HookCallback
  },
  schema: {
    body?: any,
    querystring?: any,
    params?: any,
    headers?: any,
    response?: ResponseSchema
  }
  rateLimit?: RateLimitOptions
}

export type DefaultRouteTypes = {
  Body: { [key: string]: any }, 
  Querystring: { [key: string]: string }, 
  Params: { [key: string]: string }, 
  Headers: { [key: string]: string }, 
  Reply: any
}

export function methodsFactory(serverCtx: ServerContext): Methods {
  return {
    GET<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "GET", path, hooks: {}, schema: {} }
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    POST<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "POST", path, hooks: {}, schema: {} }
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    PUT<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "PUT", path, hooks: {}, schema: {} }
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    PATCH<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "PATCH", path, hooks: {}, schema: {} }
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    DELETE<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "DELETE", path, hooks: {}, schema: {} }
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    }
  }
}

export function routeFactory<RouteTypes extends RouteGenericInterface>(serverCtx: ServerContext, routeCtx: RouteContext): Route<RouteTypes> {
  return { 
    ...routeLimiterFactory<RouteTypes>(serverCtx, routeCtx),
    ...routeValidationFactory<RouteTypes>(serverCtx, routeCtx),
    ...routeHooksFactory<RouteTypes>(serverCtx, routeCtx),
    ...handlerFactory<RouteTypes>(serverCtx, routeCtx),
  }
}