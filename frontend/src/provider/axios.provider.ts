import { SendRequestSchema } from "@/schemas/send.schema";
import axios, { AxiosRequestConfig } from "axios";

interface SendRequestResponse {
  success: boolean,
  data?: any,
  status?: number,
  everythingElse?: any,
  message?: string
}

export async function sendRequest(data: SendRequestSchema): Promise<SendRequestResponse> {
  try {
    const proxyUrl = 'http://localhost:3001/api/mshealthcheckproxy/v1/proxy';
    const proxyData = {
      url: `${data.url}?${new URLSearchParams(data.params).toString()}`,
      headers: data.headers,
      body: data.body ? JSON.parse(data.body) : {},
    };    

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: proxyUrl,
      headers: {
        'Content-Type': 'application/json',
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
        message: error.response?.data?.message || "An error occurred during the request.",
        status: error.response?.data?.statusCode,
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}