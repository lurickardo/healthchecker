import { z } from "zod";

const removeScheduleSchema = z.object({});

export type RemoveScheduleDto = z.infer<typeof removeScheduleSchema>;

export const validateRemoveSchedule = (data: any): RemoveScheduleDto => {
	// return removeScheduleSchema.parse(data);
	return data; //TODO: add to test
};
