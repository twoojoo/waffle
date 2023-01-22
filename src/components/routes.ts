import { Handler, handlerFactory } from './handler'
import { HTTPMethods, RouteGenericInterface } from "fastify"
import type { ServerContext } from './server'

type Method = <RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path?: string) => Route<RouteTypes>

export type Routes = {
  get: Method,
  post: Method,
  put: Method,
  patch: Method,
  delete: Method
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
    get<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "GET", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    post<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "POST", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    put<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "PUT", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    patch<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "PATCH", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    },
    delete<RouteTypes extends RouteGenericInterface = DefaultRouteTypes>(path: string = ""): Route<RouteTypes> {
      const routeCtx: RouteContext = { method: "DELETE", path }
      return { ...handlerFactory<RouteTypes>(serverCtx, routeCtx) }
    }
  }
}