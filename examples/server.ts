import { Waffle } from "../src"

const server = Waffle({ logger: true })
	.onRequest(async (req, rep) => console.log("1) on request hook"))
	.preParsing(async (req, rep) => console.log("2) pre parsing hook"))
	.preValidation(async (req, rep) => console.log("3) pre validation hook"))
	.preHandler(async (req, rep) => console.log("4) pre handler hook"))
	.preSerialization(async (req, rep) => console.log("5) pre serialization hook"))
	.onSend(async (req, rep) => console.log("6) on send hook"))
	.limiter({max: 200, timeWindow: 60*1000}) 

server.version(1)
	.prefix("users")
	.GET(":id").handler(async (req, rep) => rep.send({ id: req.params.id }))

server.version(2)
	.prefix("customers")
	.GET(":id").handler(async (req, rep) => rep.send({ id: req.params.id }))

server.address("localhost", 3001)
	.listen()