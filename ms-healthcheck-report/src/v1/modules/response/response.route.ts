import type { RouteHandlerMethod, RouteOptions } from "fastify";
import { ResponseController } from "./response.controller";
import { ResponseSchema } from "./response.schema";

export class ResponseRouteV1 {
	private responseController: ResponseController;
	private responseSchema: ResponseSchema;

	constructor() {
		this.responseController = new ResponseController();
		this.responseSchema = new ResponseSchema();
	}

	private findById = (): RouteOptions => {
		return {
			method: "GET",
			url: "/v1/response/:id",
			schema: {
				tags: ["v1"],
				summary: "Find data of response by id",
				...this.responseSchema.findById,
			},
			handler: this.responseController.findById as RouteHandlerMethod,
		};
	};

	private listAll = (): RouteOptions => {
		return {
			method: "GET",
			url: "/v1/response",
			schema: {
				tags: ["v1"],
				summary: "Find data of all responses",
				...this.responseSchema.listAll,
			},
			handler: this.responseController.listAll as RouteHandlerMethod,
		};
	};


	public routes = (): RouteOptions[] => {
		return [
			this.findById(),
			this.listAll(),
		];
	};
}
