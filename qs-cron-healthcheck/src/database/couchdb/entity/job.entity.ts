import { DaysOfWeekValues } from "../../../enum/daysOfWeek.enum";

export class JobEntity {
	_id: string;
	_rev: string;
	customId: any;
	method: string;
	url: string;
	headers: Record<string, any>;
	body: Record<string, any>;
	cronInterval: string;
	interval: string;
	daysOfWeek: number[];

	constructor(
		method: string,
		url: string,
		headers: Record<string, any> = {},
		body: Record<string, any> = {},
		cronInterval: string,
		interval: string,
		daysOfWeek: number[] = DaysOfWeekValues,
		_id?: string,
		_rev?: string,
		customId?: any,
	) {
		this._id = _id;
		this._rev = _rev;
		this.customId = customId;
		this.method = method;
		this.url = url;
		this.headers = headers;
		this.body = body;
		this.cronInterval = cronInterval;
		this.interval = interval;
		this.daysOfWeek = daysOfWeek;
	}
}
