import { z } from "zod";

export const listResponseSchema = z.object({
  from: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "The 'from' parameter must be a valid ISO date string.",
  }),
  to: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "The 'to' parameter must be a valid ISO date string.",
  }),
  quickInterval: z
    .string()
    .optional(),
  limit: z.string().optional().refine((val) => !val || /^\d+$/.test(val), {
    message: "Limit must be a positive integer.",
  }).default("10").transform((val) => val ? parseInt(val, 10) : 10),
  skip: z.string().optional().refine((val) => !val || /^\d+$/.test(val), {
    message: "Skip must be a non-negative integer.",
  }).default("0").transform((val) => val ? parseInt(val, 10) : 0),
  params: z
    .record(z.string(), z.string())
    .optional()
    .refine(
      (obj) => !obj || Object.keys(obj).length > 0,
      { message: "Params must be a valid object with at least one key-value pair." }
    ),
});

export type ListResponseSchema = z.infer<typeof listResponseSchema>;

export function transformListResponse(data: any): ListResponseSchema {
  return listResponseSchema.parse(data);
}
