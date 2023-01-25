import type { FastifyListenOptions } from 'fastify'
import type { ServerContext } from './server'
import rateLimiter from "@fastify/rate-limit"

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
          serverCtx.routes.forEach(route => serverCtx.fastify.route(route))
          serverCtx.fastify.listen({ ...opts, host, port })
            .then(_ => callback && callback(null, host + ":" + port))
            .catch(err => callback && callback(err, host + ":" + port))
        })
      } else {
        serverCtx.routes.forEach(route => serverCtx.fastify.route(route))
        serverCtx.fastify.listen({ ...opts, host, port })
          .then(_ => callback && callback(null, host + ":" + port))
          .catch(err => callback && callback(err, host + ":" + port))
      }
    }
  }
}