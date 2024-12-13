import type {
	CreateScheduleDto,
	UpdateScheduleDto,
	RemoveScheduleDto,
} from "./dto";
import { ScheduleRepository } from "../../../database/couchdb/repository/schedule.repository";
import { scheduleManager } from "./schedule.manager";
import { exception } from "../../../config/error";
import { ScheduleEntity } from "../../../database/couchdb/entity/schedule.entity";

export const scheduleService = {
	create: async (createScheduleDto: CreateScheduleDto) => {
		console.log(createScheduleDto);

		const scheduleRepository = new ScheduleRepository();

		const schedule = await scheduleRepository.create({
			method: createScheduleDto.method,
			url: createScheduleDto.url,
			body: createScheduleDto.body,
			daysOfWeek: createScheduleDto.daysOfWeek,
			intervalType: createScheduleDto.intervalType,
			interval: createScheduleDto.interval,
			params: createScheduleDto.params,
			headers: createScheduleDto.headers,
			cronInterval: createScheduleDto.cronInterval,
		});

		await scheduleManager.scheduleJob(schedule);
		console.log(`Schedule criado: ${schedule._id}`);
	},

	update: async (updateScheduleDto: UpdateScheduleDto) => {
		const scheduleRepository = new ScheduleRepository();

		const scheduleId = updateScheduleDto._id;
		if (!scheduleId) {
			exception("Schedule ID is required for update.");
			return;
		}

		const existing = await scheduleRepository.findOne(scheduleId);
		if (!existing) {
			exception(`Schedule ${scheduleId} not found.`);
			return;
		}

		const updated = await scheduleRepository.updateById(scheduleId, {
			method: updateScheduleDto.method,
			url: updateScheduleDto.url,
			body: updateScheduleDto.body,
			daysOfWeek: updateScheduleDto.daysOfWeek,
			intervalType: updateScheduleDto.intervalType,
			interval: updateScheduleDto.interval,
			params: updateScheduleDto.params,
			headers: updateScheduleDto.headers,
			cronInterval: updateScheduleDto.cronInterval,
		});

		if (!updated) {
			exception(`Failed to update schedule ${scheduleId}.`);
			return;
		}

		await scheduleManager.scheduleJob(updated);
		console.log(`Schedule atualizado: ${updated._id}`);
	},

	remove: async (removeScheduleDto: RemoveScheduleDto) => {
		const scheduleRepository = new ScheduleRepository();

		const scheduleId = removeScheduleDto._id;
		if (!scheduleId) {
			exception("Schedule ID is required for remove.");
			return;
		}

		const deleted = await scheduleRepository.delete(scheduleId);
		if (!deleted) {
			exception(`Schedule ${scheduleId} not found or could not be deleted.`);
			return;
		}

		await scheduleManager.removeJob(scheduleId);
		console.log(`Schedule removido: ${scheduleId}`);
	},
};
