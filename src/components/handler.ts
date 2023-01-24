import type { RouteOptions, RouteGenericInterface, RouteHandlerMethod, RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression } from 'fastify'
import { Server, ServerContext, serverFactory } from './server'
import type { RouteContext } from './routes'

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

      const options: RouteOptions = {
        ...(routeCtx.hooks || {}),
        method: routeCtx.method,
        url: path,
        handler: handler as RouteHandlerMethod,
        schema: {},
        config: { rateLimit: routeCtx.rateLimit }  
      }

      serverCtx.fastify.route(options)
      return serverFactory(serverCtx)
    }
  }
}