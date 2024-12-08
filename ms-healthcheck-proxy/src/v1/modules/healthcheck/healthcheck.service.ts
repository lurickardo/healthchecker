import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { Log } from "../../../config/logger/logger.decorator";
import type { SendRequestSchema } from "./dto";
import axios, { AxiosRequestConfig } from "axios";

export class HealthcheckService {
	@Log()
	public async findById(id: string) {
		try {
			if (!id) throw httpException("Id healthcheck not found.", HttpStatus.NOT_FOUND);

			return {
				_id: id,
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			};
		} catch (error) {
			throw error;
		}
	}

	public async listAll() {
		return [
			{
				_id: String(Math.floor(Math.random() * 1000)),
				name: "Jhon Doe",
				email: "jhondoe@gmail.com",
			},
			{
				_id: String(Math.floor(Math.random() * 1000)),
				name: "Foo Bar",
				email: "foobar@gmail.com",
			},
		];
	}

	public async proxy(sendRequestSchema: SendRequestSchema) {
			const config: AxiosRequestConfig = {
				method: sendRequestSchema.method,
				url: sendRequestSchema.url,
				headers: {
				  ...sendRequestSchema.headers,
				  'Content-Type': sendRequestSchema.headers?.['Content-Type'] || 'application/json',
				  Accept: sendRequestSchema.headers?.['Accept'] || '*/*',
				},
				...(sendRequestSchema.body && sendRequestSchema.method !== 'GET' ? { data: sendRequestSchema.body } : {}),
			  };
			  
		
			const response = await axios(config);
		
			return {
			  success: true,
			  data: response.data,
			  status: response.status,
			};
			
	}


	public async remove(id: string) {
		try {
			if (!id) throw httpException("Id healthcheck not found.", HttpStatus.NOT_FOUND);
			return { message: "User successfully removed" };
		} catch (error) {
			throw error;
		}
	}
}
