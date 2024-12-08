import { z } from "zod";

export const sendRequestSchema = z.object({
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
  params: z.record(z.string(), z.string(), {
    errorMap: () => ({ message: "Params must be an object with string keys and values." }),
  }),
  headers: z.record(z.string(), z.string(), {
    errorMap: () => ({ message: "Headers must be an object with string keys and values." }),
  }),
});

export type SendRequestSchema = z.infer<typeof sendRequestSchema>;
