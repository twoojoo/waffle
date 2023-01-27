import { RouteGenericInterface } from 'fastify'
import { Route, routeFactory, RouteContext } from './routes'
import { Server, ServerContext, serverFactory } from './server'
import { FromSchema, JSONSchema7, asConst} from "json-schema-to-ts"

export type ResponseSchema = {
  [statusCode: string | number]: any
}

export type RouteValidation<RouteTypes extends RouteGenericInterface> = {
  bodySchema: <S extends JSONSchema7, T = FromSchema<S>>(schema: S) => Route<RouteTypes & { Body: T }>
  paramsSchema: <S extends JSONSchema7, T = FromSchema<S>>(schema: S) => Route<RouteTypes & { Params: T }>
  querySchema: <S extends JSONSchema7, T = FromSchema<S>>(schema: S) => Route<RouteTypes & { Querystring: T }>
  headersSchema: <S extends JSONSchema7, T = FromSchema<S>>(schema: S) => Route<RouteTypes & { Headers: T }>
  responseSchema: (schema: any) => Route<RouteTypes>
}

export function routeValidationFactory<RouteTypes extends RouteGenericInterface>(serverCtx: ServerContext, routeCtx: RouteContext): RouteValidation<RouteTypes> {
  return {
    bodySchema<S extends JSONSchema7, T = FromSchema<S>>(schema: S): Route<RouteTypes  & { Body: T }> {
      routeCtx.schema.body = schema           
      return routeFactory<RouteTypes & { Body: T }>(serverCtx, routeCtx)
    },
    paramsSchema<S extends JSONSchema7, T = FromSchema<S>>(schema: S): Route<RouteTypes  & { Params: T }> {
      routeCtx.schema.params = schema      
      return routeFactory<RouteTypes & { Params: T }>(serverCtx, routeCtx)
    },
    querySchema<S extends JSONSchema7, T = FromSchema<S>>(schema: S): Route<RouteTypes  & { Querystring: T }> {
      routeCtx.schema.querystring = schema   
      return routeFactory<RouteTypes & { Querystring: T }>(serverCtx, routeCtx)
    },
    headersSchema<S extends JSONSchema7, T = FromSchema<S>>(schema: S): Route<RouteTypes  & { Headers: T }> {
      routeCtx.schema.headers = schema   
      return routeFactory<RouteTypes & { Headers: T }>(serverCtx, routeCtx)
    },
    responseSchema(schema: any): Route<RouteTypes> {
      routeCtx.schema.response = schema as ResponseSchema
      return routeFactory<RouteTypes>(serverCtx, routeCtx)
    },
  }
}
