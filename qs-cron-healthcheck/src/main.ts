import { JobService } from "./service/job.service";
import { env } from "./config/env";
import * as cron from "node-cron";
import { JobsRepository } from "./database/couchdb/repository/jobs.repository";
import { DatabaseInitializer } from "./database/couchdb/database.initializer";

class Main {
	public static main = async (): Promise<void> => {
		try {
			process.stdout.write("\x1Bc\n\x1b[32mStarting server...\x1b[0m\n");

			await new DatabaseInitializer().initializeDatabases();
			const jobService = new JobService();

			await jobService.clearAllTasks();
			await jobService.initJobs();
		} catch (error) {
			process.exit(1);
		}
	};
}
Main.main();
