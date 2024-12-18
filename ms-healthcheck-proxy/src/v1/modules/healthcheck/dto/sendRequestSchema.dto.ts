import { z } from "zod";

const sendRequestSchema = z.object({
	url: z.string().url(),
	method: z.string().optional().default("GET"),
	headers: z.record(z.string()),
	body: z.record(z.any()).optional(),
});

export type SendRequestSchema = z.infer<typeof sendRequestSchema>;

export const transformSendRequestDto = (data): SendRequestSchema => {
	return sendRequestSchema.parse(data);
};
