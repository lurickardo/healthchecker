export class ScheduleEntity {
	_id: string;
	_rev: string;
	method: string;
	url: string;
	body?: string;
	daysOfWeek: number[];
	intervalType: string;
	interval: string;
	params: { [key: string]: string };
	headers: { [key: string]: string };
	cronInterval: string;

	constructor(
		_id?: string,
		_rev?: string,
		method?: string,
		url?: string,
		body?: string,
		daysOfWeek?: number[],
		intervalType?: string,
		interval?: string,
		params?: { [key: string]: string },
		headers?: { [key: string]: string },
		cronInterval?: string,
	) {
		this._id = _id;
		this._rev = _rev;
		this.method = method;
		this.url = url;
		this.body = body;
		this.daysOfWeek = daysOfWeek;
		this.intervalType = intervalType;
		this.interval = interval;
		this.params = params;
		this.headers = headers;
		this.cronInterval = cronInterval;
	}
}
