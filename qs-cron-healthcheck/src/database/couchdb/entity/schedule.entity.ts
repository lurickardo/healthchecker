import { DaysOfWeekValues } from "../../../enum/daysOfWeek.enum";

export class ScheduleEntity {
	_id: string;
	_rev: string;
	method: string;
	url: string;
	body?: string;
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sunday: string;
	intervalType: string;
	interval: string;
	params: { [key: string]: string };
	headers: { [key: string]: string };

	constructor(
		_id?: string,
		_rev?: string,
		method?: string,
		url?: string,
		body?: string,
		monday?: string,
		tuesday?: string,
		wednesday?: string,
		thursday?: string,
		friday?: string,
		saturday?: string,
		sunday?: string,
		intervalType?: string,
		interval?: string,
		params?: { [key: string]: string },
		headers?: { [key: string]: string }
	) {
		this._id = _id;
		this._rev = _rev;
		this.method = method;
		this.url = url;
		this.body = body;
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
		this.sunday = sunday;
		this.intervalType = intervalType;
		this.interval = interval;
		this.params = params;
		this.headers = headers;
	}
}
