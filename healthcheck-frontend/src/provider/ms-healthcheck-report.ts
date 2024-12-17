import { ListResponseSchema } from "@/schemas/listResponse.schema";
import axios, { AxiosRequestConfig } from "axios";

interface DefaultResponse {
  success: boolean;
  data?: any;
  status?: number;
  message?: string;
  count?: number;
  total?: number;
  limit?: number;
  skip?: number;
}

export class HealthcheckProxyProvider {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://localhost:3002/api/mshealthcheckreport";
  }

  public async listResponses(listResponseSchema: ListResponseSchema): Promise<DefaultResponse> {
    try {
      const params = new URLSearchParams({
        ...(listResponseSchema.from && { from: listResponseSchema.from }),
        ...(listResponseSchema.to && { to: listResponseSchema.to }),
        ...(listResponseSchema.quickInterval && { quickInterval: listResponseSchema.quickInterval }),
        limit: listResponseSchema.limit.toString(),
        skip: listResponseSchema.skip.toString(),
      });

      const config: AxiosRequestConfig = {
        method: "GET",
        url: `${this.baseURL}/v1/response?${params.toString()}`,
        headers: {
          "accept": "application/json",
        },
      };

      const response = await axios(config);

      return {
        success: true,
        data: response.data.data,
        count: response.data.count,
        total: response.data.total,
        limit: listResponseSchema.limit,
        skip: listResponseSchema.skip,
        status: response.status,
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message:
            error.response?.data?.message || "An error occurred during the request.",
          status: error.response?.status || 500,
        };
      }

      return {
        success: false,
        message: "An unexpected error occurred.",
        status: 500,
      };
    }
  }
}
