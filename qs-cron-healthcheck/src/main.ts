import * as amqp from "amqplib";
import { env } from "./config/env";
import { queues } from "./app.module";
import { DatabaseInitializer } from "./database/couchdb/database.initializer";
import { scheduleManager } from "./v1/modules/schedule/schedule.manager";
import { createConnection } from "./provider/amqp.provider";

async function bootstrap(): Promise<void> {
	const connection = await createConnection(amqp, env.amqp.amqpUrl);
	const channel = await connection.createChannel();

	await channel.assertExchange(env.amqp.exchangeName, env.amqp.exchangeType, {
		durable: true,
	});
	await new DatabaseInitializer().initializeDatabases();

	process.stdout.write(
		`\x1Bc\n\x1b[32m[*] awaiting messages at exchange ${env.amqp.exchangeName}...\x1b[0m\n`,
	);
	await scheduleManager.initAllSchedules();

	await queues(channel);
}

bootstrap();
