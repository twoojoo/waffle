import { Waffle } from "../src/"

const server = Waffle()
	.address("localhost", 3000)

const paramsSchema = {
	type: 'object',
	required: ['id'],
	properties: {
		id: { type: 'number' }
	}
} as const //important

const bodySchema = {
	type: 'object',
	required: ['name'],
	properties: {
		name: { type: 'string' }
	}
} as const

const queryStringSchema = {
	type: 'object',
	required: ['myRequiredKey'],
	properties: {
		myRequiredKey: { type: 'string' }
	}
} as const

const headersSchema = {
	type: 'object',
	required: ['myRequiredHeader'],
	properties: {
		myRequiredHeader: { const: 'myHeaderValue' }
	}
} as const

const responseSchema = {
	200: { type: 'string' }
} as const

server.version(1)
	.prefix("users")

	.PUT(":id")
	.paramsSchema(paramsSchema)
	.bodySchema(bodySchema)
	.querySchema(queryStringSchema)
	.headersSchema(headersSchema)
	.responseSchema(responseSchema)
	.handler(async (req, rep) => {
		console.log(req.body)
		console.log(req.params.id)
		rep.send()
	})

server.listen({}, (err, addr) => {
	if (err) console.error(err)
	else console.log(`server listening at`, addr)
})

//CURL 
//curl -X PUT http://localhost:3000/v1/users/1?myRequiredKey=foo -d '{"name":"Bob"}' -H "Content-Type: application/json" -H 'myRequiredHeader:myHeaderValue'
