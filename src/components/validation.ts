import { RouteGenericInterface } from 'fastify'
import { Route, routeFactory, RouteContext } from './routes'
import { Server, ServerContext, serverFactory } from './server'

export type RouteValidation<RouteTypes extends RouteGenericInterface> = {
  bodySchema: (schema: any) => Route<RouteTypes>,
  paramsSchema: (schema: any) => Route<RouteTypes>,
  querySchema: (schema: any) => Route<RouteTypes>,
  headersSchema: (schema: any) => Route<RouteTypes>
}

export function routeValidationFactory<RouteTypes extends RouteGenericInterface>(serverCtx: ServerContext, routeCtx: RouteContext): RouteValidation<RouteTypes> {
  return {
    bodySchema(schema: any): Route<RouteTypes> {
      routeCtx.schema.body = schema                         
      return routeFactory<RouteTypes>(serverCtx, routeCtx)
    },
    paramsSchema(schema: any): Route<RouteTypes> {
      routeCtx.schema.params = schema    
      return routeFactory(serverCtx, routeCtx)
    },
    querySchema(schema: any): Route<RouteTypes> {
      routeCtx.schema.querystring = schema    
      return routeFactory(serverCtx, routeCtx)
    },
    headersSchema(schema: any): Route<RouteTypes> {
      routeCtx.schema.headers = schema    
      return routeFactory(serverCtx, routeCtx)
    }
  }
}