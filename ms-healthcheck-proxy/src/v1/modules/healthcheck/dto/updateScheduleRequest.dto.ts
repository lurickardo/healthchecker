import { z } from "zod";

const updateScheduleRequest = z.object({
	method: z.enum(["GET", "POST", "PUT", "DELETE"]),
	url: z.string().url(),
	body: z
		.string()
		.optional()
		.refine(
			(val) => {
				try {
					if (val) JSON.parse(val);
					return true;
				} catch {
					return false;
				}
			},
			{ message: "Body must be a valid JSON string" },
		),
	daysOfWeek: z
		.array(z.number().int().min(0).max(6))
		.optional()
		.refine((days) => new Set(days).size === days.length, {
			message: "daysOfWeek must not contain duplicate values",
		}),
	monday: z.enum(["on", "off"]).optional(),
	tuesday: z.enum(["on", "off"]).optional(),
	wednesday: z.enum(["on", "off"]).optional(),
	thursday: z.enum(["on", "off"]).optional(),
	friday: z.enum(["on", "off"]).optional(),
	saturday: z.enum(["on", "off"]).optional(),
	sunday: z.enum(["on", "off"]).optional(),
	intervalType: z.enum(["hour", "minute"]),
	interval: z
		.string()
		.refine((val) => /^[1-9]\d*$/.test(val), {
			message: "Interval must be a positive integer",
		}),
	params: z.record(z.string()).optional(),
	headers: z.record(z.string()).optional(),
	cronInterval: z
		.string()
		.optional()
		.refine(
			(val) =>
				!val ||
				/^(\*|\d+|\d+-\d+)( \*|\d+|\d+-\d+){4}$/.test(val.trim()),
			{
				message: "cronInterval must be a valid cron expression",
			},
		),
});

export type UpdateScheduleRequest = z.infer<typeof updateScheduleRequest>;

export const transformUpdateScheduleRequest = (
	data: any,
): UpdateScheduleRequest => {
	return updateScheduleRequest.parse(data);
};
