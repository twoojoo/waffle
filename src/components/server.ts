import type { FastifyServerOptions, FastifyInstance, RouteOptions } from 'fastify'
import { Version, versionFactory } from './version'
import { Address, addressFactory } from './address'
import { Limiter, limiterFactory } from './limiter'
import { Listen, listenFactory } from './listen'
import { Prefix, prefixFactory } from './prefix'
import { Methods, methodsFactory } from './routes'
import { Hooks, HooksCallbacks, hooksFactory } from './hooks'
import Fastify from 'fastify'
import { FastifyRateLimitOptions, RateLimitHook, RateLimitOptions } from '@fastify/rate-limit'

export type WaffleRoute = RouteOptions & HooksCallbacks & { routeVersion: number | undefined, routePrefix: string | undefined }

export type ServerContext = {
  fastify: FastifyInstance,
  host: string
  port: number
  version: number | undefined,
  versionHooks: { [version: number]: HooksCallbacks },
  versionLimiter: { [version: number]: RateLimitOptions },
  prefixHooks: { [prefix: string]: HooksCallbacks },
  prefixLimiter: { [prefix: string]: RateLimitOptions },
  prefix: string | undefined,
  routes: WaffleRoute[]
  limiterOptions?: FastifyRateLimitOptions
}

export type Server = Methods & Listen & Address & Version & Prefix & Hooks & Limiter & { fastify: FastifyInstance }

/**Initalizes a Waffle server (uses FastifyServerOptions as argument)*/
export function Waffle(options?: FastifyServerOptions): Server {
  const serverCtx = defaultContext(options)
  return serverFactory(serverCtx)
}

function defaultContext(options: FastifyServerOptions = {}): ServerContext {
  return {
    fastify: Fastify(options),
    host: "0.0.0.0",
    port: 80,
    version: undefined,
    prefix: undefined,
    routes: [],
    versionHooks: {},
    prefixHooks: {},
    versionLimiter: {},
    prefixLimiter: {}
  }
}

export function serverFactory(serverCtx: ServerContext): Server {
  return {
    ...addressFactory(serverCtx),
    ...methodsFactory(serverCtx),
    ...listenFactory(serverCtx),
    ...versionFactory(serverCtx),
    ...prefixFactory(serverCtx),
    ...hooksFactory(serverCtx),
    ...limiterFactory(serverCtx),
    fastify: serverCtx.fastify
  } 
}
