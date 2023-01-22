import type { RouteOptions, RouteGenericInterface, RouteHandlerMethod, RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression } from 'fastify'
import type { IncomingMessage, Server as HTTPServer, ServerResponse } from "http";
import type { RouteContext, DefaultRouteTypes } from './routes'
import { Server, ServerContext, serverFactory } from './server'

export type Handler<RouteTypes extends RouteGenericInterface> = {
  handler: (handler: RouteHandlerMethod<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, RouteTypes>) => Server
}


export function handlerFactory<RouteTypes extends RouteGenericInterface>(serverCtx: ServerContext, routeCtx: RouteContext): Handler<RouteTypes> {
  return {
    handler(handler: RouteHandlerMethod<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, RouteTypes>) {
      let path = routeCtx.path
      if (!path) throw Error("missing path while registering route")

      if (serverCtx.prefix) {
        if (!path.startsWith("/")) path = "/" + path
        path = serverCtx.prefix + path
      }

      if (serverCtx.version) {
        if (!path.startsWith("/")) path = "/" + path
        path = "/v" + serverCtx.version + path
      }

      const options: RouteOptions/*<HTTPServer, IncomingMessage, ServerResponse, RouteTypes>*/ = {
        method: routeCtx.method,
        url: path,
        handler: handler as RouteHandlerMethod,
        schema: {}
      }

      serverCtx.fastify.route(options)
      // serverCtx.fastify[routeCtx.method]<RouteTypes>(path, handler)

      return serverFactory(serverCtx)
    }
  }
}