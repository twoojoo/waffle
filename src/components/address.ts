import { Server, ServerContext, serverFactory } from './server'

export type Address = {
  /**Sets the host to listen on*/
  host: (host: string) => Server
  /**Sets the port to listen on*/
  port: (port: number) => Server
  /**Sets the host and port to listen on*/
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