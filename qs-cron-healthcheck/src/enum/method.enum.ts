export const HttpMethodEnum = {
	GET: "GET",
	HEAD: "HEAD",
	POST: "POST",
	PUT: "PUT",
	PATCH: "PATCH",
	DELETE: "DELETE",
	CONNECT: "CONNECT",
	OPTIONS: "OPTIONS",
	TRACE: "TRACE",
} as const;

export type HttpMethodEnumType = keyof typeof HttpMethodEnum;

export const httpMethodEnum = Object.values(HttpMethodEnum) as [
	string,
	...string[],
];
