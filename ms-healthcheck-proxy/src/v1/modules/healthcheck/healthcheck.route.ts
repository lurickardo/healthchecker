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

	private proxy = (): RouteOptions => {
		return {
			method: "POST",
			url: "/v1/proxy",
			schema: {
				tags: ["v1"],
				summary: "Send request proxy",
				...this.healthcheckSchema.proxy,
			},
			handler: this.healthcheckController.proxy as RouteHandlerMethod,
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
		return [this.proxy(), this.remove()];
	};
}
