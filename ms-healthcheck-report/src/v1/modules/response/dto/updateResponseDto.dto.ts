import { z } from "zod";

const updateResponseSchema = z.object({
	name: z.string(),
	email: z.string().email(),
});

export type UpdateResponseDto = z.infer<typeof updateResponseSchema>;

export const transformUpdateResponseDto = (data): UpdateResponseDto => {
	return updateResponseSchema.parse(data);
};
