export interface ResponseRecord {
	_id: string;
	_rev: string;
	scheduleId: string;
	response: {
		status: number;
		statusText: string;
		headers: Record<string, string>;
		data: Record<string, string>;
		config: {
			transitional: {
				silentJSONParsing: boolean;
				forcedJSONParsing: boolean;
				clarifyTimeoutError: boolean;
			};
			adapter: string[];
			transformRequest: string[];
			transformResponse: string[];
			timeout: number;
			xsrfCookieName: string;
			xsrfHeaderName: string;
			maxContentLength: number;
			maxBodyLength: number;
			env: {
				FormData: string;
				Blob: string;
			};
		};
	};
	datetime: string;
	taskName: string;
	timezone: string;
}
