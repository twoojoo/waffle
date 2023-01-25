import { Waffle } from "../src/"

const server = Waffle({ logger: true })
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
	required: ['requiredKey'],
	properties: {
		name: { type: 'string' }
	}
}

const headersSchema = {
	type: 'object',
	required: ['myRequiredHeader'],
	properties: {
		myRequiredHeader: { const: 'myHeaderValue' }
	}
}

server.version(1)
	.prefix("users")

	.PUT(":id")
	.paramsSchema(paramsSchema)
	.bodySchema(bodySchema)
	.querySchema(queryStringSchema)
	.headersSchema(headersSchema)
	.handler(async (_, rep) => rep.send("all schemas are OK"))

server.listen()

