export class TaskEntity {
	_id: string;
	_rev: string;
	customId: any;
	name: string;
	timezone: string;
	jobId: string;

	constructor(
		name: string,
		timezone: string,
		jobId: string,
		_id?: string,
		_rev?: string,
		customId?: any,
	) {
		this._id = _id;
		this._rev = _rev;
		this.customId = customId;
		this.name = name;
		this.timezone = timezone;
		this.jobId = jobId;
	}
}
