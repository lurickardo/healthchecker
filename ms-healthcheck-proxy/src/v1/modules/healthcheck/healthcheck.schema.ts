import type { FastifySchema } from "fastify";

export class HealthcheckSchema {
	public sendRequest: FastifySchema = {
		body: {
			type: "object",
			properties: {
				url: {
					type: "string",
				},
				headers: {
					type: "object",
					additionalProperties: { type: "string" },
				},
				body: {
					type: "object",
					additionalProperties: true,
				},
			},
			required: ["url", "headers", "body"],
		},
	};

	public createScheduleRequest: FastifySchema = {
		body: {
			type: "object",
			properties: {
				method: {
					type: "string",
					enum: ["GET", "POST", "PUT", "DELETE"],
				},
				url: {
					type: "string",
				},
				body: {
					type: "string",
				},
				daysOfWeek: {
					type: "array",
					items: {
						type: "number",
					},
				},
				monday: {
					type: "string",
					enum: ["on", "off"],
				},
				tuesday: {
					type: "string",
					enum: ["on", "off"],
				},
				wednesday: {
					type: "string",
					enum: ["on", "off"],
				},
				thursday: {
					type: "string",
					enum: ["on", "off"],
				},
				friday: {
					type: "string",
					enum: ["on", "off"],
				},
				saturday: {
					type: "string",
					enum: ["on", "off"],
				},
				sunday: {
					type: "string",
					enum: ["on", "off"],
				},
				intervalType: {
					type: "string",
					enum: ["hour", "minute"],
				},
				interval: {
					type: "string",
				},
				params: {
					type: "object",
					additionalProperties: { type: "string" },
				},
				headers: {
					type: "object",
					additionalProperties: { type: "string" },
				},
				cronInterval: {
					type: "string",
				},
			},
			required: ["method", "url", "intervalType", "interval", "cronInterval"],
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
