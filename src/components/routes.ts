import { Handler, handlerFactory } from './handler'
import { HTTPMethods, RouteGenericInterface } from "fastify"
import type { ServerContext } from './server'
import { HooksCallbacks, initHooks, RouteHooks, routeHooksFactory } from './hooks'
import { RouteLimiter, routeLimiterFactory } from './limiter'
import { RateLimitOptions } from '@fastify/rate-limit'
import { ResponseSchema, RouteValidation, routeValidationFactory } from './validation'

type Method = <RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path?: string) => Route<RouteTypes>

export type Methods = {
  /**Opens the route declaration scope of a GET route. Declaring the handler will close the route scope.*/
  GET: Method,
  /**Opens the route declaration scope of a POST route. Declaring the handler will close the route scope.*/
  POST: Method,
  /**Opens the route declaration scope of a PUT route. Declaring the handler will close the route scope.*/
  PUT: Method,
  /**Opens the route declaration scope of a PATCH route. Declaring the handler will close the route scope.*/
  PATCH: Method,
  /**Opens the route declaration scope of a DELETE route. Declaring the handler will close the route scope.*/
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
  hooks: HooksCallbacks,
  schema: {
    body?: any,
    querystring?: any,
    params?: any,
    headers?: any,
    response?: ResponseSchema
  }
  rateLimit?: RateLimitOptions
  version?: number,
  prefix?: string,
}

function initRouteCtx(method: HTTPMethods, path: string, serverCtx: ServerContext): RouteContext {
  return { method, path, hooks: initHooks(), schema: {}, version: serverCtx.version, prefix: serverCtx.prefix }
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
      const routeCtx: RouteContext = initRouteCtx("GET", path, serverCtx)
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    POST<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = initRouteCtx("POST", path, serverCtx)
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    PUT<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = initRouteCtx("PUT", path, serverCtx)
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    PATCH<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = initRouteCtx("PATCH", path, serverCtx)
      return routeFactory<RouteTypes>(serverCtx, routeCtx) 
    },
    DELETE<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = initRouteCtx("DELETE", path, serverCtx)
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