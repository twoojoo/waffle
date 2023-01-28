import { RouteGenericInterface } from 'fastify'
import { Route, routeFactory, RouteContext } from './routes'
import { ServerContext } from './server'
import { FromSchema, JSONSchema7, JSONSchema } from "json-schema-to-ts"

export type ResponseSchema = {
  [statusCode: string | number]: (JSONSchema7 | JSONSchema)
}

export type RouteValidation<RouteTypes extends RouteGenericInterface> = {
  /**Sets a JSON schema for the route Body (automatically sets request body type [typescript])*/
  bodySchema: <S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S) => Route<Omit<RouteTypes, 'Body'> & { Body: T }>
  /**Sets a JSON schema for the route Params (automatically sets request params type [typescript])*/
  paramsSchema: <S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S) => Route<Omit<RouteTypes, 'Params'> & { Params: T }>
  /**Sets a JSON schema for the route QueryString (automatically sets request query type [typescript])*/
  querySchema: <S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S) => Route<Omit<RouteTypes, 'Querystring'> & { Querystring: T }>
  /**Sets a JSON schema for the route Headers (automatically sets request body headers [typescript])*/
  headersSchema: <S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S) => Route<Omit<RouteTypes, 'Headers'> & { Headers: T }>
  /**Sets a JSON schema for the route Response*/
  responseSchema: (schema: ResponseSchema) => Route<RouteTypes>
}

export function routeValidationFactory<RouteTypes extends RouteGenericInterface>(serverCtx: ServerContext, routeCtx: RouteContext): RouteValidation<RouteTypes> {
  return {
    bodySchema<S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S): Route<Omit<RouteTypes, 'Body'> & { Body: T }> {
      routeCtx.schema.body = schema           
      return routeFactory<Omit<RouteTypes, 'Body'> & { Body: T }>(serverCtx, routeCtx)
    },
    paramsSchema<S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S): Route<Omit<RouteTypes, 'Params'> & { Params: T }> {
      routeCtx.schema.params = schema      
      return routeFactory<Omit<RouteTypes, 'Params'> & { Params: T }>(serverCtx, routeCtx)
    },
    querySchema<S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S): Route<Omit<RouteTypes, 'Querystring'> & { Querystring: T }> {
      routeCtx.schema.querystring = schema   
      return routeFactory<Omit<RouteTypes, 'Querystring'> & { Querystring: T }>(serverCtx, routeCtx)
    },
    headersSchema<S extends (JSONSchema7 | JSONSchema), T = FromSchema<S>>(schema: S): Route<Omit<RouteTypes, 'Headers'> & { Headers: T }> {
      routeCtx.schema.headers = schema   
      return routeFactory<Omit<RouteTypes, 'Headers'> & { Headers: T }>(serverCtx, routeCtx)
    },
    responseSchema(schema: ResponseSchema): Route<RouteTypes> {
      routeCtx.schema.response = schema
      return routeFactory<RouteTypes>(serverCtx, routeCtx)
    }
  }
}
