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
