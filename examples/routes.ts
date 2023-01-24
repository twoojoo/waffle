import {Waffle} from "../src/"

const server = Waffle({logger: true}).address("localhost", 3000)
	.limiter({max: 1, timeWindow: 5000})

server.version(1)
	.prefix("users")
	.GET(":id")
	.limiter({max: 10, timeWindow: 5000})
	.onRequest(async () => console.log("onRequest Users Route Hook"))
	.handler(async (req, rep) => rep.send({id: req.params.id}))

	.prefix("customers")
	.GET(":id")
	.onRequest(async () => console.log("onRequest Customers Route Hook"))
	.handler(async (req, rep) => rep.send({id: req.params.id}))

server.listen()