import type { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import { Route, RouteContext, routeFactory } from "./routes";
import { Server, ServerContext, serverFactory } from "./server";

export type HookCallback = (req: FastifyRequest, rep: FastifyReply) => Promise<any>
export type HookWithPayloadCallback = (req: FastifyRequest, rep: FastifyReply, payload: any) => Promise<any>
export type OnErrorHookCallback = (req: FastifyRequest, rep: FastifyReply, error: any) => Promise<any>

type Hook = (callback: HookCallback) => Server
type HookWithPayload = (callback: HookWithPayloadCallback) => Server
type OnErrorHook = (callback: OnErrorHookCallback) => Server

type RouteHook<RouteTypes extends RouteGenericInterface> = (callback: HookCallback) => Route<RouteTypes>
type RouteHookWithPayload<RouteTypes extends RouteGenericInterface> = (callback: HookWithPayloadCallback) => Route<RouteTypes>
type RouteOnErrorHook<RouteTypes extends RouteGenericInterface> = (callback: OnErrorHookCallback) => Route<RouteTypes>

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

export type RouteHooks<RouteTypes extends RouteGenericInterface> = {
	onRequest: RouteHook<RouteTypes>
	preParsing: RouteHookWithPayload<RouteTypes>
	preValidation: RouteHook<RouteTypes>
	preHandler: RouteHook<RouteTypes>
	preSerialization: RouteHookWithPayload<RouteTypes>
	onError: RouteOnErrorHook<RouteTypes>
	onSend: RouteHookWithPayload<RouteTypes>
	onResponse: RouteHook<RouteTypes>
	onTimeout: RouteHook<RouteTypes>
}

export function hooksFactory(serverCtx: ServerContext): Hooks {
	return {
		onRequest(callback: HookCallback): Server {
			serverCtx.fastify.addHook("onRequest", callback)
			return serverFactory(serverCtx)
		},
		preParsing(callback: HookWithPayloadCallback): Server {
			serverCtx.fastify.addHook("preParsing", callback)
			return serverFactory(serverCtx)
		},
		preValidation(callback: HookCallback): Server {
			serverCtx.fastify.addHook("preValidation", callback)
			return serverFactory(serverCtx)
		},
		preHandler(callback: HookCallback): Server {
			serverCtx.fastify.addHook("preHandler", callback)
			return serverFactory(serverCtx)
		},
		preSerialization(callback: HookWithPayloadCallback): Server {
			serverCtx.fastify.addHook("preSerialization", callback)
			return serverFactory(serverCtx)
		},
		onError(callback: OnErrorHookCallback): Server {
			serverCtx.fastify.addHook("onError", callback)
			return serverFactory(serverCtx)
		},
		onSend(callback: HookWithPayloadCallback): Server {
			serverCtx.fastify.addHook("onSend", callback)
			return serverFactory(serverCtx)
		},
		onResponse(callback: HookCallback): Server {
			serverCtx.fastify.addHook("onResponse", callback)
			return serverFactory(serverCtx)
		},
		onTimeout(callback: HookCallback): Server {
			serverCtx.fastify.addHook("onTimeout", callback)
			return serverFactory(serverCtx)
		},
	}
}

export function routeHooksFactory<RouteTypes extends RouteGenericInterface>(serverCtx: ServerContext, routeCtx: RouteContext): RouteHooks<RouteTypes> {
	return {
		onRequest(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.onRequest = callback
			return routeFactory(serverCtx, routeCtx)
		},
		preParsing(callback: HookWithPayloadCallback): Route<RouteTypes> {
			routeCtx.hooks.preParsing = callback
			return routeFactory(serverCtx, routeCtx)
		},
		preValidation(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.preValidation = callback
			return routeFactory(serverCtx, routeCtx)
		},
		preHandler(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.preHandler = callback
			return routeFactory(serverCtx, routeCtx)
		},
		preSerialization(callback: HookWithPayloadCallback): Route<RouteTypes> {
			routeCtx.hooks.preSerialization = callback
			return routeFactory(serverCtx, routeCtx)
		},
		onError(callback: OnErrorHookCallback): Route<RouteTypes> {
			routeCtx.hooks.onError = callback
			return routeFactory(serverCtx, routeCtx)
		},
		onSend(callback: HookWithPayloadCallback): Route<RouteTypes> {
			routeCtx.hooks.onSend = callback
			return routeFactory(serverCtx, routeCtx)
		},
		onResponse(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.onResponse = callback
			return routeFactory(serverCtx, routeCtx)
		},
		onTimeout(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.onTimeout = callback
			return routeFactory(serverCtx, routeCtx)
		},
	}
}

