import type { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { transformSendRequestDto } from "./dto";
import { HealthcheckService } from "./healthcheck.service";

export class HealthcheckController {
	private healthcheckService: HealthcheckService;

	constructor() {
		this.healthcheckService = new HealthcheckService();
	}

	public proxy = async (
		{ body }: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply
			.code(200)
			.send(await this.healthcheckService.proxy(transformSendRequestDto(body)));
	};

	public remove = async (
		{ params: { id } },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.healthcheckService.remove(id));
	};
}
