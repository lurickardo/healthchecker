import * as cron from "node-cron";
import axios from "axios";
import { env } from "../../../config/env";
import { ScheduleRepository } from "../../../database/couchdb/repository/schedule.repository";
import { ResponseRepository } from "../../../database/couchdb/repository/response.repository";
import type { ScheduleEntity } from "../../../database/couchdb/entity/schedule.entity";
import { ResponseEntity } from "../../../database/couchdb/entity/response.entity";

class ScheduleManager {
	private scheduleRepository: ScheduleRepository;
	private responseRepository: ResponseRepository;

	private tasks: Map<string, cron.ScheduledTask>;

	constructor() {
		this.scheduleRepository = new ScheduleRepository();
		this.responseRepository = new ResponseRepository();
		this.tasks = new Map<string, cron.ScheduledTask>();
	}

	public async initAllSchedules(): Promise<void> {
		const schedules = await this.scheduleRepository.find({});
		for (const schedule of schedules) {
			await this.scheduleJob(schedule);
		}
	}

	public async scheduleJob(schedule: ScheduleEntity): Promise<void> {
		await this.removeJob(schedule._id);

		const cronExpression = String(schedule.cronInterval);

		if (!cron.validate(cronExpression)) {
			console.error(
				`Cron expression inválida para schedule ${schedule._id}: ${cronExpression}`,
			);
			return;
		}

		const task = cron.schedule(
			cronExpression,
			async (now) => {
				try {
					const response = await axios({
						method: schedule.method,
						url: schedule.url,
						headers: schedule.headers,
						data: schedule.body ? JSON.parse(schedule.body) : undefined,
						params: schedule.params,
					});

					await this.responseRepository.create(
						new ResponseEntity(
							schedule._id,
							{
								status: response.status,
								statusText: response.statusText,
								headers: response.headers,
								data: response.data,
								config: response.config,
							},
							now,
							`schedule-${schedule._id}`,
							env.app?.timezone || "UTC",
						),
					);
				} catch (error: any) {
					await this.responseRepository.create(
						new ResponseEntity(
							schedule._id,
							{
								error: error.message,
								code: error.code,
								cause: error.cause,
								config: error.config,
							},
							now,
							`schedule-${schedule._id}`,
							env.app?.timezone || "UTC",
						),
					);
				}
			},
			{ timezone: env.app?.timezone || "UTC" },
		);

		task.start();
		this.tasks.set(schedule._id, task);
		console.log(`Schedule ${schedule._id} criado com cron: ${cronExpression}`);
	}

	public async removeJob(scheduleId: string): Promise<void> {
		const task = this.tasks.get(scheduleId);
		if (task) {
			task.stop();
			this.tasks.delete(scheduleId);
			console.log(`Schedule ${scheduleId} removido.`);
		}
	}
}

export const scheduleManager = new ScheduleManager();
