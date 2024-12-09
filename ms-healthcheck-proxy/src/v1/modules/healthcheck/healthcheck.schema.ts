import type { FastifySchema } from "fastify";

export class HealthcheckSchema {
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

	public createScheduleRequest: FastifySchema = {
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
