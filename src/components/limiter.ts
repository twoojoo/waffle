import { Server, ServerContext, serverFactory } from './server'
import type { RateLimitOptions } from '@fastify/rate-limit'
import { RouteGenericInterface } from 'fastify'
import { Route, RouteContext, routeFactory } from './routes'

export type Limiter = {
  limiter: (options: RateLimitOptions) => Server
}

export type RouteLimiter<RouteTypes extends RouteGenericInterface> = {
  limiter: (options: RateLimitOptions) => Route<RouteTypes>
}

export function limiterFactory(serverCtx: ServerContext): Limiter {
  return {
    limiter(options: RateLimitOptions): Server {
      serverCtx.limiterOptions = options
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