import type { FastifyInstance } from "fastify";
import { env } from "../config/env";
import { cors } from "./fastify-cors";
import { healthcheck } from "./fastify-healthcheck";
import { schemaCompiler } from "./fastify-schema-compiler";
import { swagger } from "./fastify-swagger";
import { rabbitMQ } from "./amqp-rabbitmq";

const plugins =
	env.app.environment?.toUpperCase() === "PRD"
		? [cors, healthcheck, schemaCompiler, rabbitMQ]
		: [swagger, cors, healthcheck, schemaCompiler, rabbitMQ];

export const registerPlugins = (server: FastifyInstance, config: any) => {
	for (const plugin of plugins) {
		plugin(server, config);
	}
};
