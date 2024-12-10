export class HealthcheckEntity {
	_id: string;
	_rev: string;
	customId: any;
	jobId: string;
	response: object;
	datetime: Date | "manual" | "init";

	constructor(
		jobId: string,
		response: object,
		datetime: Date | "manual" | "init",
		_id?: string,
		_rev?: string,
		customId?: any,
	) {
		this._id = _id;
		this._rev = _rev;
		this.customId = customId;
		this.jobId = jobId;
		this.response = response;
		this.datetime = datetime;
	}
}
