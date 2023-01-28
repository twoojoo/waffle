import { Server, ServerContext, serverFactory } from './server'

export type Prefix = {
  /**Sets the prefix for the next declared routes
   * @routes routes registered when the prefix is set will start with "/[prefix]" or "/v[version-number]/[prefix]" if version is set too
   * @hooks all hooks declared when a prefix is set will be prefix-wide*/
  prefix: (prefix: string) => Server
  /**Clear the prefix*/
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