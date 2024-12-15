import type { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { ResponseService } from "./response.service";

export class ResponseController {
	private responseService: ResponseService;

	constructor() {
		this.responseService = new ResponseService();
	}

	public findById = async (
		{ params: { id } },
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.responseService.findById(id));
	};

	public listAll = async (
		request: FastifyRequest,
		reply: FastifyReply,
	): Promise<RouteHandlerMethod> => {
		return reply.code(200).send(await this.responseService.listAll());
	};

}
