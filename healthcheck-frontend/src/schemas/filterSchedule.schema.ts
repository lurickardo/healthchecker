import { z } from "zod";

export const filterScheduleListSchema = z.object({
	sla: z
		.string()
		.refine((val) => /^\d+(\.\d{1,11})?$/.test(val) && parseFloat(val) <= 100, {
			message: "SLA inválido",
		}),
	from: z.string().optional(),
	to: z.string().optional(),
	timeInterval: z.string().optional(),
});

export type FilterScheduleListSchema = z.infer<typeof filterScheduleListSchema>;
