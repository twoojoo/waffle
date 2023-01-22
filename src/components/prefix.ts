import { Server, ServerContext, serverFactory } from './server'

export type Prefix = {
  prefix: (prefix: string) => Server
  clearPrefix: () => Server
}

export function prefixFactory(serverCtx: ServerContext): Prefix {
  return {
    prefix(prefix: string) {
      serverCtx.prefix = prefix
      return serverFactory(serverCtx)
    },
    clearPrefix() {
      serverCtx.prefix = undefined
      return serverFactory(serverCtx)
    }
  }
}