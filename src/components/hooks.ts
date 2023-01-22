import type { FastifyReply, FastifyRequest } from "fastify";
import { Server, ServerContext, serverFactory } from "./server";

export type HookCallback = (req: FastifyRequest, rep: FastifyReply) => Promise<any>
export type HookWithPayloadCallback = (req: FastifyRequest, rep: FastifyReply, payload: any) => Promise<any>
export type OnErrorHookCallback = (req: FastifyRequest, rep: FastifyReply, error: any) => Promise<any>

type Hook = (callback: HookCallback) => Server
type HookWithPayload = (callback: HookWithPayloadCallback) => Server
type OnErrorHook = (callback: OnErrorHookCallback) => Server

export type Hooks = {
	onRequest: Hook
	preParsing: HookWithPayload
	preValidation: Hook
	preHandler: Hook
	preSerialization: HookWithPayload
	onError: OnErrorHook
	onSend: HookWithPayload
	onResponse: Hook
	onTimeout: Hook
}

export function hooksFactory(serverCtx: ServerContext): Hooks {
	// const isRouteHook = !!routeCtx

	return {
		onRequest(callback: HookCallback): Server { 
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("onRequest", callback)
			return serverFactory(serverCtx)
		},
		preParsing(callback: HookWithPayloadCallback): Server {
			// if (isRouteHook) {}l
			serverCtx.fastify.addHook("preParsing", callback)
			return serverFactory(serverCtx)
		},
		preValidation(callback: HookCallback): Server {
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("preValidation", callback)
			return serverFactory(serverCtx)
		},
		preHandler(callback: HookCallback): Server {
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("preHandler", callback)
			return serverFactory(serverCtx)
		},
		preSerialization(callback: HookWithPayloadCallback): Server {
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("preSerialization", callback)
			return serverFactory(serverCtx)
		},
		onError(callback: OnErrorHookCallback): Server {
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("onError", callback)
			return serverFactory(serverCtx)
		},
		onSend(callback: HookWithPayloadCallback): Server {
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("onSend", callback)
			return serverFactory(serverCtx)
		},
		onResponse(callback: HookCallback): Server {
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("onResponse", callback)
			return serverFactory(serverCtx)
		},
		onTimeout(callback: HookCallback): Server {
			// if (isRouteHook) {}
			serverCtx.fastify.addHook("onTimeout", callback)
			return serverFactory(serverCtx)
		},
	}
}

// function hookReturn(serverCtx: ServerContext): Server {
// 	if (isRouteHook) return { 
// 		...handlerFactory(serverCtx, routeCtx)
// 	}
// 	return serverFactory(serverCtx)
// }