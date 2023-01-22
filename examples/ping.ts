import { Server } from "../src"

//default address: localhost:3001

Server({logger: true})
	.get("/ping").handler(async (req, rep) => rep.send("pong"))
	.listen()