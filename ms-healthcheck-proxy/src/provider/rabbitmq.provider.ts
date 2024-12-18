import { getChannel } from "../plugins/amqp-rabbitmq";

export class RabbitmqProvider {
	public async sendMessage(queue: string, message: any) {
		const channel = await getChannel();

		return channel.sendToQueue(
			String(queue),
			Buffer.from(JSON.stringify(message)),
			{
				persistent: true,
			},
		);
	}
}
