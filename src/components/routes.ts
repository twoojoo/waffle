import { Handler, handlerFactory } from './handler'
import { HTTPMethods, RouteGenericInterface } from "fastify"
import type { ServerContext } from './server'

type Method = <RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path?: string) => Route<RouteTypes>

export type Routes = {
  GET: Method,
  POST: Method,
  PUT: Method,
  PATCH: Method,
  DELETE: Method
}

type Route<RouteTypes extends RouteGenericInterface> = Handler<RouteTypes> & {}

export type RouteContext = {
  method: HTTPMethods,
  path: string,
}

export type DefaultRouteTypes = {
  Body: { [key: string]: any }, 
  Querystring: { [key: string]: string }, 
  Params: { [key: string]: string }, 
  Headers: { [key: string]: string }, 
  Reply: any
}

export function routesFactory(serverCtx: ServerContext): Routes {
  return {
    GET<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "GET", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    POST<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "POST", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    PUT<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "PUT", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    PATCH<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "PATCH", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    DELETE<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "DELETE", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    }
  }
}