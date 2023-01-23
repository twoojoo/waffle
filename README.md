# <img align="left" src="./logo.png" alt="RxJS Logo" width="86" height="86"> Waffle - A Fastify wrapper that makse HTTP servers stupidly easy to build.

## Examples

One-line ping pong server.

```typescript
import { Server } from "../src"

//default address: localhost:3000
Server().get("/ping").handler(async (_, rep) => rep.send("pong")).listen()
```

## Todo

- validation
- route-specific hooks

