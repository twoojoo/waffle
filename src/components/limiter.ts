import { Server, ServerContext, serverFactory } from './server'
import type { FastifyRateLimitOptions, RateLimitOptions } from '@fastify/rate-limit'
export { RateLimitOptions } from '@fastify/rate-limit'
import { RouteGenericInterface } from 'fastify'
import { Route, RouteContext, routeFactory } from './routes'


export type Limiter = {
  /**Sets rate limit options. Behaviour based on declaration scope:
* @Server-wide accepts the "global: boolean" option. Ignores the "onExceeding" and "onExceeded" options
* @Version-wide accepts the onExceeding and "onExceeded" options. Ignore the "global" option
* @Prefix-wide accepts the onExceeding and "onExceeded" options. Ignore the "global" option
* @Options-priority route > prefix > version > server */
  limiter: (options: RateLimitOptions & FastifyRateLimitOptions) => Server
}

export type RouteLimiter<RouteTypes extends RouteGenericInterface> = {
  limiter: (options: RateLimitOptions) => Route<RouteTypes>
}

export function limiterFactory(serverCtx: ServerContext): Limiter {
  return {
    limiter(options: RateLimitOptions & FastifyRateLimitOptions): Server {
      if (!serverCtx.limiterOptions) serverCtx.limiterOptions = {}

      if (serverCtx.prefix) {
        if (!serverCtx.prefixLimiter[serverCtx.prefix]) serverCtx.prefixLimiter[serverCtx.prefix] = {}
        serverCtx.prefixLimiter[serverCtx.prefix] = options               
      } else if (serverCtx.version) {
        if (!serverCtx.versionLimiter[serverCtx.version]) serverCtx.versionLimiter[serverCtx.version] = {}
        serverCtx.versionLimiter[serverCtx.version] = options    
      } else serverCtx.limiterOptions = options
      return serverFactory(serverCtx)
    }
  }
}

export function routeLimiterFactory<RouteTypes extends RouteGenericInterface>(serverCtx: ServerContext, routeCtx: RouteContext): RouteLimiter<RouteTypes> {
  return {
    limiter(options: RateLimitOptions): Route<RouteTypes> {
      routeCtx.rateLimit = options
      return routeFactory(serverCtx, routeCtx)
    }
  }
}