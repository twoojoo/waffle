import type { FastifyListenOptions, RouteOptions } from 'fastify'
import type { ServerContext, WaffleRoute } from './server'
import rateLimiter from "@fastify/rate-limit"
import { HooksCallbacks, initHooks } from './hooks'

export type Listen = {
  listen: (opts?: FastifyListenOptions, callback?: (err: any, addr: string) => any) => void
}

export function listenFactory(serverCtx: ServerContext): Listen {
  return {
    listen(opts: Omit<FastifyListenOptions, "port" | "host"> = {}, callback?: (err: any, addr: string) => any) {
      const { host, port } = serverCtx

      const rateLimiterRegistered = !!serverCtx.limiterOptions //
      const routesUseRateLimter = !!serverCtx.routes.find(r => (r.config as any).rateLimit)

      if (!rateLimiterRegistered && routesUseRateLimter) serverCtx.limiterOptions = {}

      if (serverCtx.limiterOptions) {
        serverCtx.fastify.register(rateLimiter, serverCtx.limiterOptions).then(() => {
          serverCtx.routes.forEach(route => serverCtx.fastify.route(parseRoute(route, serverCtx)))
          serverCtx.fastify.listen({ ...opts, host, port })
            .then(_ => callback && callback(null, host + ":" + port))
            .catch(err => callback && callback(err, host + ":" + port))
        })
      } else {
        serverCtx.routes.forEach(route => serverCtx.fastify.route(parseRoute(route, serverCtx)))
        serverCtx.fastify.listen({ ...opts, host, port })
          .then(_ => callback && callback(null, host + ":" + port))
          .catch(err => callback && callback(err, host + ":" + port))
      }
    }
  }
}

function parseRoute(routeOpts: WaffleRoute, serverCtx: ServerContext): RouteOptions {
  const { routePrefix, routeVersion } = routeOpts

  const prefixHooks = routePrefix ? (serverCtx.prefixHooks[routePrefix] || initHooks()) : initHooks()
  const versionHooks = routeVersion ? (serverCtx.versionHooks[routeVersion] || initHooks()) : initHooks()
  
  return {
    ...routeOpts,
    onRequest: versionHooks.onRequest.concat(prefixHooks.onRequest, routeOpts.onRequest),
    preParsing: versionHooks.preParsing.concat(prefixHooks.preParsing, routeOpts.preParsing),
    preValidation: versionHooks.preValidation.concat(prefixHooks.preValidation, routeOpts.preValidation),
    preHandler: versionHooks.preHandler.concat(prefixHooks.preHandler, routeOpts.preHandler),
    preSerialization: versionHooks.preSerialization.concat(prefixHooks.preSerialization, routeOpts.preSerialization),
    onError: versionHooks.onError.concat(prefixHooks.onError, routeOpts.onError),
    onSend: versionHooks.onSend.concat(prefixHooks.onSend, routeOpts.onSend),
    onResponse: versionHooks.onResponse.concat(prefixHooks.onResponse, routeOpts.onResponse),
    onTimeout: versionHooks.onTimeout.concat(prefixHooks.onTimeout, routeOpts.onTimeout),
  }
}