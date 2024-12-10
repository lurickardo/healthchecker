import { DaysOfWeekValues } from "../../enum/daysOfWeek.enum";
import { httpMethodEnum } from "../../enum/method.enum";
import { z } from "zod";

export const createJobSchema = z.object({
	_id: z.string().optional(),
	_rev: z.string().optional(),
	method: z.enum(httpMethodEnum),
	url: z.string().url(),
	headers: z.record(z.any()).default({}),
	body: z.record(z.any()).default({}),
	cronInterval: z
		.string()
		.refine((value) => (value.match(/\*/g) || []).length === 4, {
			message: "O cronInterval precisa conter exatamente 4 asteriscos.",
		}),
	interval: z.string().min(1),
	daysOfWeek: z
		.array(z.number().int().min(0).max(6))
		.min(1)
		.default(DaysOfWeekValues),
});

export type CreateJobSchema = z.infer<typeof createJobSchema>;
