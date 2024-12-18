import type { RouteHandlerMethod, RouteOptions } from "fastify";
import { HealthcheckController } from "./healthcheck.controller";
import { HealthcheckSchema } from "./healthcheck.schema";

export class HealthcheckRouteV1 {
	private healthcheckController: HealthcheckController;
	private healthcheckSchema: HealthcheckSchema;

	constructor() {
		this.healthcheckController = new HealthcheckController();
		this.healthcheckSchema = new HealthcheckSchema();
	}

	private sendRequest = (): RouteOptions => {
		return {
			method: "POST",
			url: "/v1/healthcheck/proxy/sendRequest",
			schema: {
				tags: ["v1"],
				summary: "Send request proxy",
				...this.healthcheckSchema.sendRequest,
			},
			handler: this.healthcheckController.sendRequest as RouteHandlerMethod,
		};
	};

	private createScheduleRequest = (): RouteOptions => {
		return {
			method: "POST",
			url: "/v1/healthcheck/schedule/request",
			schema: {
				tags: ["v1"],
				summary: "Create schedule request",
				...this.healthcheckSchema.createScheduleRequest,
			},
			handler: this.healthcheckController
				.createScheduleRequest as RouteHandlerMethod,
		};
	};

	private remove = (): RouteOptions => {
		return {
			method: "DELETE",
			url: "/v1/healthcheck/:id",
			schema: {
				tags: ["v1"],
				summary: "Remove healthcheck",
				...this.healthcheckSchema.remove,
			},
			handler: this.healthcheckController.remove as RouteHandlerMethod,
		};
	};

	public routes = (): RouteOptions[] => {
		return [this.sendRequest(), this.createScheduleRequest(), this.remove()];
	};
}
