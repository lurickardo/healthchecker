import * as application from "../../package.json";
import { z } from "zod";

const envSchema = z.object({
	app: z.object({
		port: z.number().int().positive().optional(),
		environment: z.string().min(1).optional(),
	}),
	plugins: z.object({
		swagger: z.object({
			basePath: z.string().min(1),
		}),
	}),
	stripPrefix: z.object({
		path: z.string().min(1),
	}),
	amqp: z.object({
		amqpUrl: z.string().min(1),
		exchangeName: z.string().min(1),
		exchangeType: z.enum(["direct", "fanout", "topic", "headers"]),
		queues: z.object({
			inputCreateScheduleRequest: z.string().min(1),
			inputUpdateScheduleRequest: z.string().min(1),
			inputRemoveScheduleRequest: z.string().min(1),
		}),
	}),
});

export const env = envSchema.parse({
	app: {
		port: Number(process.env.PORT),
		environment: process.env.APP_ENVIRONMENT,
	},
	plugins: {
		swagger: {
			basePath: Object.is(process.env.USE_ROUTE_PREFIX, "true")
				? `/api/${application.name.replace(/-/g, "")}/`
				: "/",
		},
	},
	stripPrefix: {
		path: `/api/${application.name.replace(/-/g, "")}`,
	},
	amqp: {
		amqpUrl: process.env.AMQP_URL,
		exchangeName: process.env.EXCHANGE_NAME,
		exchangeType: process.env.EXCHANGE_TYPE,
		queues: {
			inputCreateScheduleRequest: process.env.INPUT_CREATE_SCHEDULE_REQUEST,
			inputUpdateScheduleRequest: process.env.INPUT_UPDATE_SCHEDULE_REQUEST,
			inputRemoveScheduleRequest: process.env.INPUT_REMOVE_SCHEDULE_REQUEST,
		},
	},
});
