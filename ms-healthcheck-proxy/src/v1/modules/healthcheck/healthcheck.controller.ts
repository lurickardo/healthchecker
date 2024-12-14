import type { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { transformSendRequestDto } from "./dto";
import { HealthcheckService } from "./healthcheck.service";
import { transformCreateScheduleRequest } from "./dto";

export class HealthcheckController {
	private healthcheckService: HealthcheckService;

	constructor() {
		this.healthcheckService = new HealthcheckService();
	}

	public sendRequest = async (
		{ body }: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply
			.code(200)
			.send(
				await this.healthcheckService.sendRequest(
					transformSendRequestDto(body),
				),
			);
	};

	public createScheduleRequest = async (
		{ body }: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply
			.code(200)
			.send(
				await this.healthcheckService.createScheduleRequest(
					transformCreateScheduleRequest(body),
				), 
			);
	};

	public remove = async (
		{ params: { id } },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.healthcheckService.remove(id));
	};
}
