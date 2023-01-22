import { Handler, handlerFactory } from './handler'
import type { ServerContext } from './server'

type Method = (path?: string) => Route

enum HTTPMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete"
}

export type Routes = {
  get: Method,
  post: Method,
  put: Method,
  patch: Method,
  delete: Method
}

type Route = Handler & {}

export type RouteContext = {
  method: HTTPMethod,
  path: string,
}

export function routesFactory(serverCtx: ServerContext): Routes {
  return {
    get(path: string = ""): Route {
      const routeCtx: RouteContext = { method: HTTPMethod.GET, path }
      return { ...handlerFactory(serverCtx, routeCtx) }
    },
    post(path: string = ""): Route {
      const routeCtx: RouteContext = { method: HTTPMethod.POST, path }
      return { ...handlerFactory(serverCtx, routeCtx) }
    },
    put(path: string = ""): Route {
      const routeCtx: RouteContext = { method: HTTPMethod.PUT, path }
      return { ...handlerFactory(serverCtx, routeCtx) }
    },
    patch(path: string = ""): Route {
      const routeCtx: RouteContext = { method: HTTPMethod.PATCH, path }
      return { ...handlerFactory(serverCtx, routeCtx) }
    },
    delete(path: string = ""): Route {
      const routeCtx: RouteContext = { method: HTTPMethod.DELETE, path }
      return { ...handlerFactory(serverCtx, routeCtx) }
    }
  }
}