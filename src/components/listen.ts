import type { FastifyListenOptions } from 'fastify'
import type { ServerContext } from './server'

export type Listen = {
  listen: (opts?: FastifyListenOptions,  callback?: (err: any, addr: string) => any) => void
}

export function listenFactory(serverCtx: ServerContext): Listen {
  return {
    listen(opts: Omit<FastifyListenOptions, "port" | "host"> = {}, callback?: (err: any, addr: string) => any) {
      const { host, port } = serverCtx
      serverCtx.fastify.listen({ ...opts, host, port })
        .then(_ => callback && callback(null, host + ":" + port))
        .catch(err => callback && callback(err, host + ":" + port))
    }
  }
}