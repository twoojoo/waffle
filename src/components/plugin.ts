import type { FastifyPluginCallback, FastifyRegisterOptions } from 'fastify'
import { Server, ServerContext, serverFactory } from './server'

export type Plugin = {
  plugin: (plugin: FastifyPluginCallback, opts: FastifyRegisterOptions<any>) => Server
}

export function pluginFactory(serverCtx: ServerContext): Plugin {
  return {
    plugin(plugin: FastifyPluginCallback, opts: FastifyRegisterOptions<any>) {
      serverCtx.fastify.register(plugin, opts)
      return serverFactory(serverCtx)
    }
  }
}