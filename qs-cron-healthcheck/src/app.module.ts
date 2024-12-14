import type { Channel } from "amqplib";
import type { Queue } from "./@types/Queue";
import { env } from "./config/env";
import { errorHandler } from "./config/error";
import { bufferToObject } from "./config/utils";
import { scheduleQueues } from "./v1/modules/schedule/schedule.queue";

const bindQueues = (channel: Channel, queues: Queue[]) => {
	queues.forEach(async (queue) => {
		await channel.assertQueue(queue.name, queue.options);
		await channel.bindQueue(queue.name, env.amqp.exchangeName, "");
		channel.consume(
			queue.name,
			({ content }) => {
				try {
					return queue.service(queue.validate(bufferToObject(content)));
				} catch (error) {
					errorHandler(error, queue.name);
				}
			},
			{ noAck: true }, //OBS: disable to test
		);
	});
};

export const queues = async (channel: Channel): Promise<void> => {
	bindQueues(channel, [...scheduleQueues]);
};
