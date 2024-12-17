export class ResponseEntity {
	_id: string;
	_rev: string;
	customId: any;
	scheduleId: string;
	response: object;
	datetime: Date;
	taskName: string;
	timezone: string;

	constructor(
		scheduleId: string,
		response: object,
		datetime: Date,
		taskName: string,
		timezone: string,
		_id?: string,
		_rev?: string,
	) {
		this._id = _id;
		this._rev = _rev;
		this.scheduleId = scheduleId;
		this.response = response;
		this.datetime = datetime;
		this.taskName = taskName;
		this.timezone = timezone;
	}
}
