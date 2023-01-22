import { Server } from "../src"

const server = Server({ logger: true })

let users = [
	{ id: 1, name: "John" }, 
	{ id: 2, name: "Angela" }, 
	{ id: 3, name: "Bob" }
]

// <mehtod> http://lcoalhost:3000/v1/users

server.version(1)
	.prefix("users")
	.get(":id").handler(async (req, rep) => rep.send(users.find(u => u.id == req.body.id)))
	.delete(":id").handler(async (req, rep) => {
		const id = (req.params as any).id
		const user = users.find(u => u == id)
		users = users.filter(u => u != id)
		rep.send(user)
	})
	.post().handler(async (req, rep) => {
		users.push(req.body as any)
		rep.send(req.body as any)
	})
	.put(":id").handler(async (req, rep) => {
		const index = users.findIndex(u => u.id == (req.params as any).id)
		users[index].name = (req.body as any).name
		rep.send(users[index])
	})