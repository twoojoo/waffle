import { Server, ServerContext, serverFactory } from './server'
import { FastifyCorsOptions } from "@fastify/cors"

export type Cors = {
  cors: (options: FastifyCorsOptions) => Server
}

export function corsFactory(serverCtx: ServerContext): Cors {
  return {
    cors(options: FastifyCorsOptions) {
      serverCtx.cors = options
      return serverFactory(serverCtx)
    }
  }
}