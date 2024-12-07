import { SendRequestSchema } from "@/schemas/send.schema";
import axios, { AxiosRequestConfig } from "axios";

export async function sendRequest(data: SendRequestSchema) {
  try {
    const config: AxiosRequestConfig = {
      method: data.method,
      url: data.url,
      headers: data.headers,
      params: data.params,
      data: data.body ? JSON.parse(data.body) : undefined,
    };

    const response = await axios(config);

    return {
      success: true,
      data: response.data,
      status: response.status,
      everythingElse: response
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data || "An error occurred during the request.",
        status: error.response?.status,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
