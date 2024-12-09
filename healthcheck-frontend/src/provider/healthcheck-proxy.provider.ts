import { SendRequestSchema } from "@/schemas/send.schema";
import axios, { AxiosRequestConfig } from "axios";

interface DefaultResponse {
	success: boolean;
	data?: any;
	status?: number;
	everythingElse?: any;
	message?: string;
}

export class HealthckeckProxyProvider {
	private baseURL: string;

	constructor() {
		this.baseURL = "http://localhost:3001/api/mshealthcheckproxy";
	}

	public async sendRequest(data: SendRequestSchema): Promise<DefaultResponse> {
		try {
			const proxyData = {
				url: `${data.url}?${new URLSearchParams(data.params).toString()}`,
				headers: data.headers,
				body: data.body ? JSON.parse(data.body) : {},
			};

			const config: AxiosRequestConfig = {
				method: "POST",
				url: `${this.baseURL}/v1/healthcheck/proxy/sendRequest`,
				headers: {
					"Content-Type": "application/json",
				},
				data: proxyData,
			};

			const response = await axios(config);

			return {
				success: true,
				data: response.data.data,
				status: response.status,
				everythingElse: response,
			};
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				return {
					success: false,
					message:
						error.response?.data?.message ||
						"An error occurred during the request.",
					status: error.response?.data?.statusCode,
				};
			}

			return {
				success: false,
				message: "An unexpected error occurred.",
			};
		}
	}

	public async createScheduleRequest(
		schedule: Schedule,
	): Promise<DefaultResponse> {
		try {
			const config: AxiosRequestConfig = {
				method: "POST",
				url: `${this.baseURL}/v1/healthcheck/schedule/request`,
				headers: {
					"Content-Type": "application/json",
				},
				data: schedule,
			};
			const response = await axios(config);

			return {
				success: true,
				data: response.data.data,
				status: response.status,
				everythingElse: response,
			};
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				return {
					success: false,
					message:
						error.response?.data?.message ||
						"An error occurred during the request.",
					status: error.response?.data?.statusCode,
				};
			}

			return {
				success: false,
				message: "An unexpected error occurred.",
			};
		}
	}
}
