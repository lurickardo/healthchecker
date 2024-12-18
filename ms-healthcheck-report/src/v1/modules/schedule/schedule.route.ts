import type { RouteHandlerMethod, RouteOptions } from "fastify";
import { ScheduleController } from "./schedule.controller";
import { ScheduleSchema } from "./schedule.schema";

export class ScheduleRouteV1 {
	private scheduleController: ScheduleController;
	private scheduleSchema: ScheduleSchema;

	constructor() {
		this.scheduleController = new ScheduleController();
		this.scheduleSchema = new ScheduleSchema();
	}

	private findById = (): RouteOptions => {
		return {
			method: "GET",
			url: "/v1/schedule/:id",
			schema: {
				tags: ["v1"],
				summary: "Find data of schedule by id",
				...this.scheduleSchema.findById,
			},
			handler: this.scheduleController.findById as RouteHandlerMethod,
		};
	};

	public routes = (): RouteOptions[] => {
		return [this.findById()];
	};
}
