import { z } from "zod";

const createResponseSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

export type CreateResponseDto = z.infer<typeof createResponseSchema>;

export const transformCreateResponseDto = (data): CreateResponseDto => {
	return createResponseSchema.parse(data);
};
