import * as application from "../../package.json";
import { z } from "zod";

const envSchema = z.object({
	app: z.object({
		port: z.number().int().positive().optional(),
		environment: z.string().min(1).optional(),
		timezone: z.string().optional(),
	}),
	databases: z.object({
		couchdb: z.object({
			url: z.string().url().min(1),
			clearOnInit: z.boolean(),
			collections: z.object({
				jobs: z.string().min(1),
				tasks: z.string().min(1),
				healthchecks: z.string().min(1),
			}),
		}),
	}),
});

export const env = envSchema.parse({
	app: {
		port: Number(process.env.APP_PORT),
		environment: process.env.APP_ENVIRONMENT,
		timezone: process.env.APP_TIMEZONE || "America/Sao_Paulo",
	},
	databases: {
		couchdb: {
			url: process.env.COUCHDB_URL,
			clearOnInit: process.env.COUCHDB_CLEAR_ON_INIT === "true",
			collections: {
				jobs: process.env.COUCHDB_COLLECTIONS_JOBS,
				tasks: process.env.COUCHDB_COLLECTIONS_TASKS,
				healthchecks: process.env.COUCHDB_COLLECTIONS_HEALTHCHEKS,
			},
		},
	},
});
