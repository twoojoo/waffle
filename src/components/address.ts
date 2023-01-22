import { Server, ServerContext, serverFactory } from './server'

export type Address = {
  host: (host: string) => Server
  port: (port: number) => Server
  address: (host: string, port: number) => Server
}

export function addressFactory(serverCtx: ServerContext): Address {
  return {
    host(host: string) {
      serverCtx.host = host
      return serverFactory(serverCtx)
    },
    port(port: number) {
      serverCtx.port = port
      return serverFactory(serverCtx)
    },
    address(host: string, port: number) {
      serverCtx.host = host
      serverCtx.port = port
      return serverFactory(serverCtx)
    },
  }
}