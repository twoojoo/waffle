import { Server, ServerContext, serverFactory } from './server'

export type Version = {
  /**Sets the version for the next declared routes and clears the prefix
   * @routes routes registered when the version is set will start with "/v[version-number]"
   * @hooks all hooks declared when version is set and prefix isn't will be prefix-wide*/
  version: (version: number) => Server
  /**Clears both version and prefix*/
  clearVersion: () => Server
}

export function versionFactory(serverCtx: ServerContext): Version {
  return {
    version(version: number) {
      serverCtx.version = version
      serverCtx.prefix = undefined
      return serverFactory(serverCtx)
    },
    clearVersion() {
      serverCtx.version = undefined
      serverCtx.prefix = undefined
      return serverFactory(serverCtx)
    }
  }
}