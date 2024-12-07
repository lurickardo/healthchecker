import { z } from "zod";

export const createScheduleSchema = z.object({
  method: z.enum(["GET", "POST", "PUT", "DELETE"], {
    errorMap: () => ({ message: "Method must be one of: GET, POST, PUT, DELETE." }),
  }),
  url: z.string().url("The URL must be in a valid format (e.g., https://google.com)."),
  body: z
    .string()
    .optional()
    .refine(
      (value) => {
        try {
          if (value) {
            JSON.parse(value); // Verifica se o JSON é válido
          }
          return true;
        } catch {
          return false;
        }
      },
      { message: "Body must contain a valid JSON string." }
    ),
  monday: z.enum(["on", "off"], {
    errorMap: () => ({ message: "Monday must be either 'on' or 'off'." }),
  }).optional(),
  tuesday: z.enum(["on", "off"], {
    errorMap: () => ({ message: "Tuesday must be either 'on' or 'off'." }),
  }).optional(),
  wednesday: z.enum(["on", "off"], {
    errorMap: () => ({ message: "Wednesday must be either 'on' or 'off'." }),
  }).optional(),
  thursday: z.enum(["on", "off"], {
    errorMap: () => ({ message: "Thursday must be either 'on' or 'off'." }),
  }).optional(),
  friday: z.enum(["on", "off"], {
    errorMap: () => ({ message: "Friday must be either 'on' or 'off'." }),
  }).optional(),
  saturday: z.enum(["on", "off"], {
    errorMap: () => ({ message: "Saturday must be either 'on' or 'off'." }),
  }).optional(),
  sunday: z.enum(["on", "off"], {
    errorMap: () => ({ message: "Sunday must be either 'on' or 'off'." }),
  }).optional(),
  intervalType: z.enum(["minute", "hour"], {
    errorMap: () => ({ message: "Interval type must be either 'minute' or 'hour'." }),
  }),
  interval: z
    .string({ message: "Interval cannot be empty." })
    .min(1, { message: "Interval cannot be empty." })
    .regex(/^\d+$/, { message: "Interval must be a number." }),
  params: z.record(z.string(), z.string(), {
    errorMap: () => ({ message: "Params must be an object with string keys and values." }),
  }),
  headers: z.record(z.string(), z.string(), {
    errorMap: () => ({ message: "Headers must be an object with string keys and values." }),
  }),
}).refine(
  (data: any) =>
    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].some(
      (day) => data[day] === "on" || data[day] === "off"
    ),
  { message: "At least one day of the week must be selected." }
);

export type CreateScheduleSchema = z.infer<typeof createScheduleSchema>;
