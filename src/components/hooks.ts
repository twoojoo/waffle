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

export type HooksCallbacks = {
	onRequest: HookCallback[]
	preParsing: HookWithPayloadCallback[]
	preValidation: HookCallback[]
	preHandler: HookCallback[]
	preSerialization: HookWithPayloadCallback[]
	onError: OnErrorHookCallback[]
	onSend: HookWithPayloadCallback[]
	onResponse: HookCallback[]
	onTimeout: HookCallback[]
}

export function initHooks(): HooksCallbacks {
	return {
		onRequest: [],
		preParsing: [],
		preValidation: [],
		preHandler: [],
		preSerialization: [],
		onError: [],
		onSend: [],
		onResponse: [],
		onTimeout: [],
	}
}

export type Hooks = {
	/**Sets a onRequest hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	onRequest: Hook
	/**Sets a preParsing hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	preParsing: HookWithPayload
	/**Sets a preValidation hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	preValidation: Hook
	/**Sets a preHandler hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	preHandler: Hook
	/**Sets a preSerialization hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	preSerialization: HookWithPayload
	/**Sets a onError hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	onError: OnErrorHook
	/**Sets a preParsing hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	onSend: HookWithPayload
	/**Sets a onResponse hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	onResponse: Hook
	/**Sets a onTimeout hook callback. Scope is dynamic:
	 * @Server-wide if no prefix nor version are set
	 * @Version-wide if version is set and prefix isn't set
	 * @Prefix-wide if prefix is set
	 * @Execution-order server > version > prefix. Same scope/type hooks get executed in order of registration*/
	onTimeout: Hook
}

export type RouteHooks<RouteTypes extends RouteGenericInterface> = {
	/**Sets a route-specific onRequest hook callback.*/
	onRequest: RouteHook<RouteTypes>
	/**Sets a route-specific preParsing hook callback.*/
	preParsing: RouteHookWithPayload<RouteTypes>
	/**Sets a route-specific preValidation hook callback.*/
	preValidation: RouteHook<RouteTypes>
	/**Sets a route-specific preHandler hook callback.*/
	preHandler: RouteHook<RouteTypes>
	/**Sets a route-specific preSerialization hook callback.*/
	preSerialization: RouteHookWithPayload<RouteTypes>
	/**Sets a route-specific onError hook callback.*/
	onError: RouteOnErrorHook<RouteTypes>
	/**Sets a route-specific onSend hook callback.*/
	onSend: RouteHookWithPayload<RouteTypes>
	/**Sets a route-specific onResponse hook callback.*/
	onResponse: RouteHook<RouteTypes>
	/**Sets a route-specific onTimeout hook callback.*/
	onTimeout: RouteHook<RouteTypes>
}

export function hooksFactory(serverCtx: ServerContext): Hooks {
	if (serverCtx.prefix) return prefixHooksFactory(serverCtx)
	else if (serverCtx.version) return versionHooksFactory(serverCtx)
	else return serverHooksFactory(serverCtx)
}

function serverHooksFactory(serverCtx: ServerContext): Hooks {
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
			routeCtx.hooks.onRequest.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		preParsing(callback: HookWithPayloadCallback): Route<RouteTypes> {
			routeCtx.hooks.preParsing.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		preValidation(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.preValidation.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		preHandler(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.preHandler.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		preSerialization(callback: HookWithPayloadCallback): Route<RouteTypes> {
			routeCtx.hooks.preSerialization.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		onError(callback: OnErrorHookCallback): Route<RouteTypes> {
			routeCtx.hooks.onError.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		onSend(callback: HookWithPayloadCallback): Route<RouteTypes> {
			routeCtx.hooks.onSend.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		onResponse(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.onResponse.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
		onTimeout(callback: HookCallback): Route<RouteTypes> {
			routeCtx.hooks.onTimeout.push(callback)
			return routeFactory(serverCtx, routeCtx)
		},
	}
}

function versionHooksFactory(serverCtx: ServerContext): Hooks {
	if (serverCtx.version !== 0 && !serverCtx.version) throw Error("Waffle Error - something went wrong during initialization - version hooks")
	const version = parseInt(serverCtx.version.toString())
	
	if (!serverCtx.versionHooks[version]) serverCtx.versionHooks[version] = initHooks()

	return {
		onRequest(callback: HookCallback): Server {
			serverCtx.versionHooks[version].onRequest.push(callback)
			return serverFactory(serverCtx)
		},
		preParsing(callback: HookWithPayloadCallback): Server {
			serverCtx.versionHooks[version].preParsing.push(callback)
			return serverFactory(serverCtx)
		},
		preValidation(callback: HookCallback): Server {
			serverCtx.versionHooks[version].preValidation.push(callback)
			return serverFactory(serverCtx)
		},
		preHandler(callback: HookCallback): Server {
			serverCtx.versionHooks[version].onRequest.push(callback)
			return serverFactory(serverCtx)
		},
		preSerialization(callback: HookWithPayloadCallback): Server {
			serverCtx.versionHooks[version].preSerialization.push(callback)
			return serverFactory(serverCtx)
		},
		onError(callback: OnErrorHookCallback): Server {
			serverCtx.versionHooks[version].onError.push(callback)
			return serverFactory(serverCtx)
		},
		onSend(callback: HookWithPayloadCallback): Server {
			serverCtx.versionHooks[version].onSend.push(callback)
			return serverFactory(serverCtx)
		},
		onResponse(callback: HookCallback): Server {
			serverCtx.versionHooks[version].onResponse.push(callback)
			return serverFactory(serverCtx)
		},
		onTimeout(callback: HookCallback): Server {
			serverCtx.versionHooks[version].onTimeout.push(callback)
			return serverFactory(serverCtx)
		},
	}
}

function prefixHooksFactory(serverCtx: ServerContext): Hooks {
	if (!serverCtx.prefix) throw Error("Waffle Error - something went wrong during initialization - version hooks")
	const prefix = serverCtx.prefix.toString()
	if (!serverCtx.prefixHooks[prefix]) serverCtx.prefixHooks[prefix] = initHooks()

	return {
		onRequest(callback: HookCallback): Server {
			serverCtx.prefixHooks[prefix].onRequest.push(callback)
			return serverFactory(serverCtx)
		},
		preParsing(callback: HookWithPayloadCallback): Server {
			serverCtx.prefixHooks[prefix].preParsing.push(callback)
			return serverFactory(serverCtx)
		},
		preValidation(callback: HookCallback): Server {
			serverCtx.prefixHooks[prefix].preValidation.push(callback)
			return serverFactory(serverCtx)
		},
		preHandler(callback: HookCallback): Server {
			serverCtx.prefixHooks[prefix].onRequest.push(callback)
			return serverFactory(serverCtx)
		},
		preSerialization(callback: HookWithPayloadCallback): Server {
			serverCtx.prefixHooks[prefix].preSerialization.push(callback)
			return serverFactory(serverCtx)
		},
		onError(callback: OnErrorHookCallback): Server {
			serverCtx.prefixHooks[prefix].onError.push(callback)
			return serverFactory(serverCtx)
		},
		onSend(callback: HookWithPayloadCallback): Server {
			serverCtx.prefixHooks[prefix].onSend.push(callback)
			return serverFactory(serverCtx)
		},
		onResponse(callback: HookCallback): Server {
			serverCtx.prefixHooks[prefix].onResponse.push(callback)
			return serverFactory(serverCtx)
		},
		onTimeout(callback: HookCallback): Server {
			serverCtx.prefixHooks[prefix].onTimeout.push(callback)
			return serverFactory(serverCtx)
		},
	}
}

