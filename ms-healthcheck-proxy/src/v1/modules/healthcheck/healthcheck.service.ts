import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import type { SendRequestSchema } from "./dto";
import axios, { type AxiosRequestConfig } from "axios";
import { CreateScheduleRequest } from "./dto/createScheduleRequest.dto";

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
		console.log(createScheduleRequest);

		return { success: true };
	}

	public async remove(id: string) {
		if (!id)
			throw httpException("Id healthcheck not found.", HttpStatus.NOT_FOUND);
		return { message: "User successfully removed" };
	}
}
