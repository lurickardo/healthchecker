import type { FastifySchema } from "fastify";

export class ResponseSchema {
	public findById: FastifySchema = {
		params: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
			},
			required: ["id"],
		},
		headers: {
			type: "object",
			properties: {
				Authorization: { type: "string" },
			},
			additionalProperties: true,
		},
	};

	public listAll: FastifySchema = {
		params: {
			type: "object",
			properties: {},
			required: [],
		},
		headers: {
			type: "object",
			properties: {},
			additionalProperties: true,
		},
	};
}
