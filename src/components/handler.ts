import type { RouteGenericInterface, RouteHandlerMethod, RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression } from 'fastify'
import { Server, ServerContext, serverFactory } from './server'
import type { RouteContext } from './routes'
import { HooksCallbacks } from './hooks'

export type Handler<RouteTypes extends RouteGenericInterface> = {
  /**Sets the handler of the route. Also closes the route declaration and return to the server declaration scope.*/
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
      
      serverCtx.routes.push({
        url: path,
        ...(routeCtx.hooks || {}),
        method: routeCtx.method,
        schema: routeCtx.schema,
        config: { rateLimit: routeCtx.rateLimit },
        handler: handler as RouteHandlerMethod,
        routePrefix: serverCtx.prefix,
        routeVersion: serverCtx.version
      })

      return serverFactory(serverCtx)
    }
  }
}
