import * as cron from "node-cron";
import axios from "axios";
import status from "http-status";
import { HealthcheckRepository } from "./../database/couchdb/repository/healthcheck.repository";
import { TasksRepository } from "./../database/couchdb/repository/tasks.repository";
import { JobsRepository } from "../database/couchdb/repository/jobs.repository";
import { JobEntity } from "../database/couchdb/entity/job.entity";
import { CreateJobSchema } from "./schema/createJob.schema";
import { env } from "../config/env";
import { TaskEntity } from "../database/couchdb/entity/task.entity";
import { HealthcheckEntity } from "../database/couchdb/entity/healthcheck.entity";

export class JobService {
	private jobsRepository: JobsRepository;
	private tasksRepository: TasksRepository;
	private healthcheckRepository: HealthcheckRepository;

	constructor() {
		this.jobsRepository = new JobsRepository();
		this.tasksRepository = new TasksRepository();
		this.healthcheckRepository = new HealthcheckRepository();
	}

	private scheduleJobs = async (
		job: JobEntity | CreateJobSchema,
	): Promise<void> => {
		const task: any = cron.schedule(
			job.cronInterval,
			async (now) => {
				try {
					const response = await axios({
						method: job.method,
						url: job.url,
						headers: job.headers,
						data: job.body,
					});

					this.healthcheckRepository.create(
						new HealthcheckEntity(
							job._id,
							{
								statusText: response.statusText,
								config: response.config,
								headers: response.headers,
								data: response.data,
								status: response.status,
								statusCode: status[response.statusText],
							},
							now,
						),
					);
				} catch (error) {
					this.healthcheckRepository.create(
						new HealthcheckEntity(
							job._id,
							{
								status: error.code,
								code: status[error.code],
								cause: error.cause,
								config: error.config,
								errors: error.errors,
							},
							now,
						),
					);
				}
			},
			{ timezone: env.app.timezone },
		);

		task.start();

		await this.tasksRepository.create(
			new TaskEntity(task.options.name, task.options.timezone, job._id),
		);
	};

	public initJobs = async (): Promise<void> => {
		const jobs = await this.jobsRepository.find();
		console.log("Jobs encontrados:", jobs);

		jobs.forEach((job) => {
			this.scheduleJobs(job);
		});
	};

	public clearAllTasks = async (): Promise<void> => {
		await this.tasksRepository.deleteAll();
		console.log("Tasks apagadas.");
	};

	public createJob = async (createJob: CreateJobSchema): Promise<void> => {
		const cronParts = createJob.cronInterval.trim().split(" ");

		if (createJob.daysOfWeek && createJob.daysOfWeek.length > 0) {
			cronParts[4] = createJob.daysOfWeek.join(",");
		}

		createJob.cronInterval = cronParts.join(" ");

		await this.jobsRepository.create(createJob);
		await this.scheduleJobs(createJob);
	};
}
