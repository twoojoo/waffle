import { Server, ServerContext, serverFactory } from './server'

export type Version = {
  version: (version: number) => Server
  clearVersion: () => Server
}

export function versionFactory(serverCtx: ServerContext): Version {
  return {
    version(version: number) {
      serverCtx.version = version
      return serverFactory(serverCtx)
    },
    clearVersion() {
      serverCtx.version = undefined
      return serverFactory(serverCtx)
    }
  }
}