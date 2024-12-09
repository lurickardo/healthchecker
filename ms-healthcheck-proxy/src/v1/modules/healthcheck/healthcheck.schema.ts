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
						minimum: 0,
						maximum: 6,
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
					pattern: "^[1-9]\\d*$",
				},
				params: {
					type: "object",
				},
				headers: {
					type: "object",
				},
				cronInterval: {
					type: "string",
				},
			},
			required: ["method", "url", "intervalType", "interval"],
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
