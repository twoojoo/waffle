import { Server, ServerContext, serverFactory } from './server'
import type { RateLimitOptions } from '@fastify/rate-limit'

export type Limiter = {
  limiter: (options: RateLimitOptions) => Server
}

export function limiterFactory(serverCtx: ServerContext): Limiter {
  return {
    limiter(options: RateLimitOptions): Server {
      serverCtx.fastify.register(import('@fastify/rate-limit'), options)
      return serverFactory(serverCtx)
    }
  }
}