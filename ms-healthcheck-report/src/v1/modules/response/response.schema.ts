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
	};

	public listAll: FastifySchema = {
		querystring: {
			type: "object",
			properties: {
				from: { type: "string" },
				to: { type: "string" },
				quickInterval: { type: "string" },
				limit: { type: "number" },
				skip: { type: "number" },
			},
			required: ["limit"],
		},
		headers: {
			type: "object",
			properties: {},
			additionalProperties: true,
		},
	};
}
