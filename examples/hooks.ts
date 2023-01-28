import { Waffle } from "../src/"

const server = Waffle()
	.address("localhost", 3000)
	.onRequest(async () => console.log("#> server hook"))

server.version(1)
	.onRequest(async () => console.log("#> version hook [1]"))

	.prefix("users")
	.onRequest(async () => console.log("#> prefix hook [users]"))

	.GET(":id")
	.onRequest(async () => console.log("#> route hook [get]"))
	.handler(async (req, rep) => rep.send("ok"))

server.version(2)
	.onRequest(async () => console.log("#> version hook [2]"))

	.prefix("customers")
	.onRequest(async () => console.log("#> prefix hook [customers]"))

	.DELETE(":id")
	.onRequest(async () => console.log("#> route hook [delete]"))
	.handler(async (req, rep) => rep.send("ok"))

server.listen({}, (err, addr) => {
	if (err) console.error(err)
	else console.log(`#> Server listening at`, addr)
})