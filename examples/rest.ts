import { Server } from "../src"

const server = Server({ logger: true })

type User = {
	id: number,
	name: string,
}

let users: User[] = [
	{ id: 1, name: "John" }, 
	{ id: 2, name: "Angela" }, 
	{ id: 3, name: "Bob" }
]

// <mehtod> http://lcoalhost:3000/v1/users

server.version(1)
	.prefix("users")

	.get<{ Params: { id: number } }>(":id")
	.handler(async (req, rep) => rep.send(users.find(u => u.id == req.params.id)))

	.delete<{ Params: { id: number } }>(":id")
	.handler(async (req, rep) => {
		const id = (req.params as any).id
		const user = users.find(u => u == id)
		users = users.filter(u => u != id)
		rep.send(user)
	})

	.post<{ Body: User }>()
	.handler(async (req, rep) => {
		users.push(req.body)
		rep.send(req.body)
	})

	.put<{ Params: { id: number }, Body: Omit<User, "id"> }>(":id")
	.handler(async (req, rep) => {
		const index = users.findIndex(u => u.id == req.params.id)
		users[index].name = req.body.name
		rep.send(users[index])
	})