# Waffle - A fluent Fastify wrapper that makes HTTP servers stupidly easy

## Install

```bash
npm i @twoojoo/waffle
```

## Description

Waffle allows you to spin up an HTTP server using [Fastyfy](https://github.com/fastify/fastify) with a completely **fluent syntax**. 
It supports route types and schemas and all main Fastify features, while fully allowing to interact with the underlying Fastify instance.

It also comes **shipped with some useful plugins** such as [rate limter](), [cors]() and [json schema parser](), to further decrease development time.

It's **typescript first**. If you provide json schemas (see [this example](./examples/validation.ts)), route types will be automatically inferred, achieving validation and type safety all at once!

## Sample

```typescript
import { Waffle } from "../src"

const server = Waffle({ logger: true })
	.onRequest(async (req, rep) => console.log("1) on request hook"))
	.preParsing(async (req, rep) => console.log("2) pre parsing hook"))
	.preValidation(async (req, rep) => console.log("3) pre validation hook"))
	.preHandler(async (req, rep) => console.log("4) pre handler hook"))
	.preSerialization(async (req, rep) => console.log("5) pre serialization hook"))
	.onSend(async (req, rep) => console.log("6) on send hook"))
	.onError(async (req, rep) => console.log("6) on error hook"))
	.onResponse(async (req, rep) => console.log("6) on response hook"))
	.limiter({max: 1, timeWindow: 60*1000}) 

server.version(1)
	.prefix("users")
	.GET(":id").handler(async (req, rep) => /*.....*/)
	.DELETE(":id").handler(async (req, rep) =>  /*.....*/)

server.version(2)
	.prefix("customers")
	.GET(":id").handler(async (req, rep) =>  /*.....*/)
	.POST(":id").handler(async (req, rep) =>  /*.....*/)

server.address("localhost", 3001)
	.listen()
```

## Examples

See [examples folder](./examples)