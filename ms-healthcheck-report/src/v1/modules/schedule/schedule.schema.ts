import type { FastifySchema } from "fastify";

export class ScheduleSchema {
	public findById: FastifySchema = {
		params: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
			required: ["id"],
		},
	};
}
