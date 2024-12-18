import { env } from "../../../config/env";
import type { Queue } from "../../../@types/Queue";
import {
	validateCreateSchedule,
	validateUpdateSchedule,
	validateRemoveSchedule,
} from "./dto";
import { scheduleService } from "./schedule.service";

export const scheduleQueues: Queue[] = [
	{
		name: env.amqp.queues.inputCreateScheduleRequest,
		service: scheduleService.create,
		validate: validateCreateSchedule,
		options: { durable: true },
	},
	{
		name: env.amqp.queues.inputUpdateScheduleRequest,
		service: scheduleService.update,
		validate: validateUpdateSchedule,
		options: { durable: true },
	},
	{
		name: env.amqp.queues.inputRemoveScheduleRequest,
		service: scheduleService.remove,
		validate: validateRemoveSchedule,
		options: { durable: true },
	},
];
