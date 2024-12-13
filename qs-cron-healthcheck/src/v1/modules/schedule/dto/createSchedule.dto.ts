import { z } from "zod";

const createScheduleSchema = z
	.object({
		method: z.enum(["GET", "POST", "PUT", "DELETE"], {
			errorMap: () => ({
				message: "Method must be one of: GET, POST, PUT, DELETE.",
			}),
		}),
		url: z
			.string()
			.url("The URL must be in a valid format (e.g., https://google.com)."),
		body: z
			.string()
			.optional()
			.refine(
				(value) => {
					try {
						if (value) {
							JSON.parse(value);
						}
						return true;
					} catch {
						return false;
					}
				},
				{ message: "Body must contain a valid JSON string." },
			),
		monday: z
			.enum(["on", "off"], {
				errorMap: () => ({ message: "Monday must be either 'on' or 'off'." }),
			})
			.optional(),
		tuesday: z
			.enum(["on", "off"], {
				errorMap: () => ({ message: "Tuesday must be either 'on' or 'off'." }),
			})
			.optional(),
		wednesday: z
			.enum(["on", "off"], {
				errorMap: () => ({
					message: "Wednesday must be either 'on' or 'off'.",
				}),
			})
			.optional(),
		thursday: z
			.enum(["on", "off"], {
				errorMap: () => ({ message: "Thursday must be either 'on' or 'off'." }),
			})
			.optional(),
		friday: z
			.enum(["on", "off"], {
				errorMap: () => ({ message: "Friday must be either 'on' or 'off'." }),
			})
			.optional(),
		saturday: z
			.enum(["on", "off"], {
				errorMap: () => ({ message: "Saturday must be either 'on' or 'off'." }),
			})
			.optional(),
		sunday: z
			.enum(["on", "off"], {
				errorMap: () => ({ message: "Sunday must be either 'on' or 'off'." }),
			})
			.optional(),
		intervalType: z.enum(["minute", "hour"], {
			errorMap: () => ({
				message: "Interval type must be either 'minute' or 'hour'.",
			}),
		}),
		interval: z
			.string({ message: "Interval cannot be empty." })
			.min(1, { message: "Interval cannot be empty." })
			.regex(/^\d+$/, { message: "Interval must be a number." }),
		params: z.record(z.string(), z.string(), {
			errorMap: () => ({
				message: "Params must be an object with string keys and values.",
			}),
		}),
		headers: z.record(z.string(), z.string(), {
			errorMap: () => ({
				message: "Headers must be an object with string keys and values.",
			}),
		}),
		daysOfWeek: z.array(z.number()),
		cronInterval: z.string(),
	})
	.refine(
		(data: any) => {
			const daysOfWeek = data.daysOfWeek;
			return (
				daysOfWeek.includes(0) ||
				daysOfWeek.includes(1) ||
				daysOfWeek.includes(2) ||
				daysOfWeek.includes(3) ||
				daysOfWeek.includes(4) ||
				daysOfWeek.includes(5) ||
				daysOfWeek.includes(6)
			);
		},
		{ message: "At least one of the days of week must be selected." },
	);

export type CreateScheduleDto = z.infer<typeof createScheduleSchema>;

export const validateCreateSchedule = (data: any): CreateScheduleDto => {
	return createScheduleSchema.parse(data);
};
