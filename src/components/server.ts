import type { FastifyServerOptions, FastifyInstance } from 'fastify'
import { Version, versionFactory } from './version'
import { Address, addressFactory } from './address'
import { Limiter, limiterFactory } from './limiter'
import { Listen, listenFactory } from './listen'
import { Prefix, prefixFactory } from './prefix'
import { Routes, routesFactory } from './routes'
import { Hooks, hooksFactory } from './hooks'
import Fastify from 'fastify'

export type ServerContext = {
  fastify: FastifyInstance,
  host: string
  port: number
  version: number | undefined,
  prefix: string | undefined,
}

export type Server = Routes & Listen & Address & Version & Prefix & Hooks & Limiter

export function Server(options?: FastifyServerOptions): Server {
  const serverCtx = defaultContext(options)
  return serverFactory(serverCtx)
}

function defaultContext(options: FastifyServerOptions = {}): ServerContext {
  return {
    fastify: Fastify(options),
    host: "0.0.0.0",
    port: 80,
    version: undefined,
    prefix: undefined
  }
}

export function serverFactory(serverCtx: ServerContext): Server {
  return {
    ...addressFactory(serverCtx),
    ...routesFactory(serverCtx),
    ...listenFactory(serverCtx),
    ...versionFactory(serverCtx),
    ...prefixFactory(serverCtx),
    ...hooksFactory(serverCtx),
    ...limiterFactory(serverCtx)
  } 
}
