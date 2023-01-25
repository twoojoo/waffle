import { Waffle } from "../src/"

const server = Waffle()
	.address("localhost", 3000)

const paramsSchema = {
	type: 'object',
	required: ['id'],
	properties: {
		id: { type: 'number' }
	}
}

const bodySchema = {
	type: 'object',
	required: ['name'],
	properties: {
		name: { type: 'string' }
	}
}

const queryStringSchema = {
	type: 'object',
	required: ['myRequiredKey'],
	properties: {
		myRequiredKey: { type: 'string' }
	}
}

const headersSchema = {
	type: 'object',
	required: ['myRequiredHeader'],
	properties: {
		myRequiredHeader: { const: 'myHeaderValue' }
	}
}

const responseSchema = {
	200: { type: 'string' }
}

server.version(1)
	.prefix("users")

	.PUT(":id")
	.paramsSchema(paramsSchema)
	.bodySchema(bodySchema)
	.querySchema(queryStringSchema)
	.headersSchema(headersSchema)
	.responseSchema(responseSchema)
	.handler(async (_, rep) => rep.send("all schemas are OK"))

server.listen({}, (err, addr) => {
	if (err) console.error(err)
	else console.log(`server listening at`, addr)
})

//CURL 
//curl -X PUT http://localhost:3000/v1/users/1?myRequiredKey=foo -d '{"name":"Bob"}' -H "Content-Type: application/json" -H 'myRequiredHeader:myHeaderValue'