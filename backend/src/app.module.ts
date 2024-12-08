import type { FastifyInstance } from "fastify";
import { HealthcheckRouteV1 } from "./v1/modules/healthcheck/healthcheck.route";

export class Route {
	public registerRoutes = async (server: FastifyInstance): Promise<void> => {
		for (const route of [...new HealthcheckRouteV1().routes()]) {
			server.route(route);
		}
	};
}
