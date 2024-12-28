export async function createConnection(amqp: any, amqpUrl: string) {
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
