import * as amqp from "amqplib";
import { env } from "./config/env";
import { queues } from "./app.module";
import { DatabaseInitializer } from "./database/couchdb/database.initializer";

async function bootstrap(): Promise<void> {
	const connection = await amqp.connect(env.amqp.amqpUrl);
	const channel = await connection.createChannel();

	await channel.assertExchange(env.amqp.exchangeName, env.amqp.exchangeType, {
		durable: true,
	});
	await new DatabaseInitializer().initializeDatabases();

	process.stdout.write(
		`\x1Bc\n\x1b[32m[*] awaiting messages at exchange ${env.amqp.exchangeName}...\x1b[0m\n`,
	);

	await queues(channel);
}

bootstrap();
