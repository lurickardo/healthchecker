import httpStatus, * as HttpStatus from "http-status";
import { httpException } from "../../../../src/config/error";
import { ResponseRepository } from "../../../database/couchdb/repository/response.repository";
import { ResponseEntity } from "../../../database/couchdb/entity/response.entity";

export class ResponseService {
	private responseRepository: ResponseRepository;

	constructor() {
		this.responseRepository = new ResponseRepository();
	}

	public async findById(id: string) {
		try {
			if (!id)
				throw httpException("Id response not found.", HttpStatus.NOT_FOUND);

			const response = await this.responseRepository.findOne(id);
			if (!response)
				throw httpException("Response not found.", HttpStatus.NOT_FOUND);

			return response;
		} catch (error) {
			throw error;
		}
	}

	public async listAll(
		from?: string,
		to?: string,
		quickInterval?: string,
		limit: number = 10,
		skip: number = 0,
	) {
		if (!from && !to && !quickInterval) {
			throw httpException("Filter was not sent.", 400);
		}

		let selector: Partial<ResponseEntity> = {};

		if (from && to) {
			selector.datetime = {
				$gte: new Date(from).toISOString(),
				$lte: new Date(to).toISOString(),
			} as any;
		} else if (quickInterval) {
			const { startDate, endDate } = this.calculateQuickInterval(quickInterval);
			selector.datetime = {
				$gte: startDate.toISOString(),
				$lte: endDate.toISOString(),
			} as any;
		}

		const responses = await this.responseRepository.find(selector, limit, skip);
		const totalResponses = await this.responseRepository.count(selector);

		return {
			count: responses.length,
			total: totalResponses,
			limit: limit,
			skip: skip,
			data: responses,
		};
	}

	private calculateQuickInterval(interval: string): {
		startDate: Date;
		endDate: Date;
	} {
		const endDate = new Date();
		const startDate = new Date(endDate);

		const match = interval.match(/^(\d+)(min|hr|d|w|m)$/);
		if (!match) {
			throw httpException(
				"Invalid quickInterval format. Use: '1hr', '2d', '1w', '1m'",
				400,
			);
		}

		const [_, value, unit] = match;
		const amount = parseInt(value, 10);

		switch (unit) {
			case "min":
				startDate.setMinutes(endDate.getMinutes() - amount);
				break;
			case "hr":
				startDate.setHours(endDate.getHours() - amount);
				break;
			case "d":
				startDate.setDate(endDate.getDate() - amount);
				break;
			case "w":
				startDate.setDate(endDate.getDate() - amount * 7);
				break;
			case "m":
				startDate.setMonth(endDate.getMonth() - amount);
				break;
			default:
				throw httpException("Unsupported time unit in quickInterval", 400);
		}

		return { startDate, endDate };
	}
}
