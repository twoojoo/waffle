import { Waffle } from "../src/"

const server = Waffle({ logger: true }).address("localhost", 3000)
	.limiter({ max: 5, timeWindow: 5000 })

server.version(1)
	.limiter({max: 1, timeWindow: 6000 })

	.prefix("users")
	.limiter({max: 2, timeWindow: 6000 })

	.GET(":id")
	.limiter({max: 3, timeWindow: 6000 })
	.onRequest(async () => console.log("onRequest Users Route Hook"))
	.handler(async (req, rep) => rep.send({ id: req.params.id }))

	.version(2)

	.prefix("customers")
	.GET(":id")
	.onRequest(async () => console.log("onRequest Customers Route Hook"))
	.handler(async (req, rep) => rep.send({ id: req.params.id }))

server.listen()