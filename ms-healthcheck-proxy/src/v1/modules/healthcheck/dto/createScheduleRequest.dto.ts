import { z } from "zod";

const createScheduleRequest = z.object({
	method: z.enum(["GET", "POST", "PUT", "DELETE"]),
	url: z.string().url(),
	body: z.string().optional(),
	daysOfWeek: z.array(z.number().int().min(0).max(6)).optional(),
	monday: z.enum(["on", "off"]).optional(),
	tuesday: z.enum(["on", "off"]).optional(),
	wednesday: z.enum(["on", "off"]).optional(),
	thursday: z.enum(["on", "off"]).optional(),
	friday: z.enum(["on", "off"]).optional(),
	saturday: z.enum(["on", "off"]).optional(),
	sunday: z.enum(["on", "off"]).optional(),
	intervalType: z.enum(["hour", "minute"]),
	interval: z.string().refine((val) => /^[1-9]\d*$/.test(val), {
		message: "Interval must be a positive integer",
	}),
	params: z.record(z.string()).optional(),
	headers: z.record(z.string()).optional(),
	cronInterval: z.string().optional(),
});

export type CreateScheduleRequest = z.infer<typeof createScheduleRequest>;

export const transformCreateScheduleRequest = (
	data: any,
): CreateScheduleRequest => {
	return createScheduleRequest.parse(data);
};
