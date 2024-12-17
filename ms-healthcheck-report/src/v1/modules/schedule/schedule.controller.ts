import type { FastifyReply, RouteHandlerMethod } from "fastify";
import { ScheduleService } from "./schedule.service";

export class ScheduleController {
	private scheduleService: ScheduleService;

	constructor() {
		this.scheduleService = new ScheduleService();
	}

	public findById = async (
		{ params: { id } },
		reply: FastifyReply
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.scheduleService.findById(id));
	};
}
