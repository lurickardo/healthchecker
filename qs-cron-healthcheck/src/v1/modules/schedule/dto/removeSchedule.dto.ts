import { z } from "zod";

const removeScheduleSchema = z.object({
	_id: z.string().nonempty("A valid schedule ID is required."),
});

export type RemoveScheduleDto = z.infer<typeof removeScheduleSchema>;

export const validateRemoveSchedule = (data: any): RemoveScheduleDto => {
	return removeScheduleSchema.parse(data);
};
