import type { FastifySchema } from "fastify";

export class HealthcheckSchema {
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

	public proxy: FastifySchema = {
		body: {
			type: "object",
			properties: {
				url: {
					type: "string",
				},
				headers: {
					type: "object",
				},
				body: {
					type: "object",
				},
			},
			required: ["url", "headers", "body"],
		},
	};

	public remove: FastifySchema = {
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
			properties: {},
			additionalProperties: true,
		},
	};
}
