import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import type { SendRequestSchema } from "./dto";
import axios, { type AxiosRequestConfig } from "axios";
import { CreateScheduleRequest } from "./dto/createScheduleRequest.dto";
import { RabbitmqProvider } from "../../../provider/rabbitmq.provider";
import { env } from "../../../config/env";

export class HealthcheckService {
	public async sendRequest(sendRequestSchema: SendRequestSchema) {
		const config: AxiosRequestConfig = {
			method: sendRequestSchema.method,
			url: sendRequestSchema.url,
			headers: {
				...sendRequestSchema.headers,
				"Content-Type":
					sendRequestSchema.headers?.["Content-Type"] || "application/json",
				Accept: sendRequestSchema.headers?.Accept || "*/*",
			},
			...(sendRequestSchema.body && sendRequestSchema.method !== "GET"
				? { data: sendRequestSchema.body }
				: {}),
		};

		const response = await axios(config);

		return {
			success: true,
			data: response.data,
			status: response.status,
		};
	}

	public async createScheduleRequest(
		createScheduleRequest: CreateScheduleRequest,
	) {
		const rabbitmqProvider = new RabbitmqProvider();
		await rabbitmqProvider.sendMessage(
			env.amqp.queues.inputCreateScheduleRequest,
			createScheduleRequest,
		);

		return { success: true, messageStatus: "send" };
	}

	public async remove(id: string) {
		if (!id)
			throw httpException("Id healthcheck not found.", HttpStatus.NOT_FOUND);
		const rabbitmqProvider = new RabbitmqProvider();
		await rabbitmqProvider.sendMessage(
			env.amqp.queues.inputRemoveScheduleRequest,
			{ _id: id },
		);
		return { message: "User successfully removed" };
	}
}
