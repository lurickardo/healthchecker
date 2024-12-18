import * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { ScheduleRepository } from "../../../database/couchdb/repository/schedule.repository";

export class ScheduleService {
	private scheduleRepository: ScheduleRepository;

	constructor() {
		this.scheduleRepository = new ScheduleRepository();
	}

	public async findById(id: string) {
		try {
			if (!id) throw httpException("Id schedule not found.", HttpStatus.NOT_FOUND);

			const schedule = await this.scheduleRepository.findOne(id);
			if (!schedule) throw httpException("Schedule not found.", HttpStatus.NOT_FOUND);

			return schedule;
		} catch (error) {
			throw error;
		}
	}
}
