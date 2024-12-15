import type { FastifyInstance } from "fastify";
import { ResponseRouteV1 } from "./v1/modules/response/response.route";

export class Route {
	public registerRoutes = async (server: FastifyInstance): Promise<void> => {
		for (const route of [...new ResponseRouteV1().routes()]) {
			server.route(route);
		}
	};
}
