import type { FastifyRequest, FastifyReply } from 'fastify'
import type { RouteContext } from './routes'
import { Server, ServerContext, serverFactory } from './server'

export type Handler = {
  handler: (handler: (req: FastifyRequest, rep: FastifyReply) => Promise<any>) => Server
}

export function handlerFactory(serverCtx: ServerContext, routeCtx: RouteContext): Handler {
  return {
    handler(handler: (req: FastifyRequest, rep: FastifyReply) => Promise<any>) {
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

      serverCtx.fastify[routeCtx.method](path, handler)

      return serverFactory(serverCtx)
    }
  }
}