import type { FastifyInstance } from "fastify";
import { ResponseRouteV1 } from "./v1/modules/response/response.route";
import { ScheduleRouteV1 } from "./v1/modules/schedule/schedule.route";

export class Route {
	public registerRoutes = async (server: FastifyInstance): Promise<void> => {
		const routes = [...new ResponseRouteV1().routes(), ...new ScheduleRouteV1().routes()];
		for (const route of routes) {
			server.route(route);
		}
	};
}
