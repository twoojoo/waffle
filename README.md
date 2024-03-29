# Waffle - A fluent Fastify wrapper that makes HTTP servers stupidly easy

## Install

```bash
npm i @twoojoo/waffle
```

## Description

Waffle allows you to easily build an HTTP server using [Fastyfy](https://github.com/fastify/fastify) with a completely **fluent syntax**. 
It supports route types and schemas and all main Fastify features, while fully allowing to interact with the underlying Fastify instance.

It also comes **shipped with some useful plugins** such as [rate limter](https://github.com/fastify/fastify-rate-limit), [cors](https://github.com/fastify/fastify-cors) and [json schema parser](https://www.npmjs.com/package/json-schema-to-ts), to further decrease development time.

It's **typescript first**. If you provide json schemas (see [this example](./examples/validation.ts)), route types will be automatically inferred, achieving validation and type safety all at once!

## Sample

```typescript
import { Waffle } from "@twoojoo/waffle"

const server = Waffle({ logger: true })
	//all Fastify hooks available (at server, version, prefix or route level)
	.onRequest(async (req, rep) => console.log("1) on request hook"))
	.preParsing(async (req, rep) => console.log("2) pre parsing hook"))
	.preValidation(async (req, rep) => console.log("3) pre validation hook"))
	.preHandler(async (req, rep) => console.log("4) pre handler hook"))
	.preSerialization(async (req, rep) => console.log("5) pre serialization hook"))
	.onSend(async (req, rep) => console.log("6) on send hook"))
	.onError(async (req, rep) => console.log("6) on error hook"))
	.onResponse(async (req, rep) => console.log("6) on response hook"))
	.limiter({max: 1, timeWindow: 60*1000}) 
	.cors({/*..cors options..*/})

server.version(1) //API version management
	.prefix("users") //API resource management through route prefix
	.GET(":id").handler(async (req, rep) =>  /*...route logic..*/) // GET http://localhost:3001/v1/users/:id
	.DELETE(":id").handler(async (req, rep) =>   /*...route logic..*/) // DELETE http://localhost:3001/v1/users/:id

server.version(2)
	.prefix("customers") //prefix specific hooks and limiters
	.limiter({max: 1, timeWindow: 60*1000})
	.onRequest(async (req, rep) => console.log("on request customers hook")) 

	.GET(":id")  // GET http://localhost:3001/v1/customers/:id
	.handler(async (req, rep) =>  /*...route logic..*/)

	.POST()  // POST http://localhost:3001/v1/customers
	.bodySchema(bodySchema) //route json schema both for validation and type safety
	.handler(async (req, rep) =>  console.log(req.body.name)) // <-- autocomplete

server.address("localhost", 3001)
	.listen()
```

## Examples

See [examples folder](./examples)