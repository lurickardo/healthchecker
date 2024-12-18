import * as amqp from "amqplib";
import { env } from "../config/env";

export const rabbitMQ = async () => {
	const connection = await amqp.connect(String(env.amqp.amqpUrl));
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
