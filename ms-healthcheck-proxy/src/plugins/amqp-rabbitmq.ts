import * as amqp from "amqplib";
import { env } from "../config/env";

export const rabbitMQ = async () => {
	const connection = await createConnection(amqp, env.amqp.amqpUrl);
	const channel = await connection.createChannel();

	await channel.assertExchange(
		String(env.amqp.exchangeName),
		String(env.amqp.exchangeType),
		{
			durable: true,
		},
	);

	await channel.assertQueue(
		String(env.amqp.queues.inputCreateScheduleRequest),
		{ durable: true },
	);
	await channel.bindQueue(
		String(env.amqp.queues.inputCreateScheduleRequest),
		String(env.amqp.exchangeName),
		"",
	);

	console.log("[✔] : Server amqp connected.");
};

export const getChannel = async () => {
	const connection = await amqp.connect(String(env.amqp.amqpUrl));
	return await connection.createChannel();
};

async function createConnection(amqp: any, amqpUrl: string) {
	try {
		const connection = await amqp.connect(amqpUrl);
		connection.on("error", (err: any) => {
			console.error("Connection error:", err);
			setTimeout(createConnection, 5000);
		});
		connection.on("close", () => {
			console.warn("Connection closed, reconnecting...");
			setTimeout(createConnection, 5000);
		});
		return connection;
	} catch (err) {
		console.error("Failed to connect to RabbitMQ:", err);
		setTimeout(createConnection, 5000);
	}
}
