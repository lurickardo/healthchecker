import * as application from "../../package.json";
import { z } from "zod";

const envSchema = z.object({
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
	databases: z.object({
		couchdb: z.object({
			url: z.string().url().min(1),
			clearOnInit: z.boolean(),
			collections: z.object({
				schedule: z.string().min(1),
				response: z.string().min(1),
			}),
		}),
	}),
});

export const env = envSchema.parse({
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
	databases: {
		couchdb: {
			url: process.env.COUCHDB_URL,
			clearOnInit: process.env.COUCHDB_CLEAR_ON_INIT === "true",
			collections: {
				schedule: process.env.COUCHDB_COLLECTIONS_SCHEDULES,
				response: process.env.COUCHDB_COLLECTIONS_RESPONSES,
			},
		},
	},
});
