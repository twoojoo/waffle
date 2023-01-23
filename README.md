# <img align="left" src="./logo.png" alt="RxJS Logo" width="86" height="86"> Waffle - A Fastify wrapper that makes HTTP servers stupidly easy to build

## Install

```bash
npm i @twoojoo/waffle
```

## Examples

One-line ping pong server

```typescript
import { Server } from "@twoojoo/waffle"

//default address: 0.0.0.0:80
Server().get("/ping").handler(async (_, rep) => rep.send("pong")).listen()
```

## Todo

- validation
- route-specific hooks

