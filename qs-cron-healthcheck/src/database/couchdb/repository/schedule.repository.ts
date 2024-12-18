import { env } from "../../../config/env";
import type { ScheduleEntity } from "../entity/schedule.entity";
import { randomUUID } from "node:crypto";
import * as nano from "nano";

export class ScheduleRepository {
	couchDbUrl: string;
	collection: string;
	db: nano.DocumentScope<ScheduleEntity | any>;

	constructor() {
		this.couchDbUrl = env.databases.couchdb.url;
		this.collection = env.databases.couchdb.collections.schedule;
		this.db = nano(this.couchDbUrl).use<ScheduleEntity>(this.collection);
	}

	public async findOne(id: string): Promise<ScheduleEntity | null> {
		try {
			const doc = await this.db.get(id);
			return doc;
		} catch (error) {
			if (error.statusCode === 404) {
				return null;
			}
			throw error;
		}
	}

	public async find(
		selector: Partial<ScheduleEntity> = {},
	): Promise<ScheduleEntity[]> {
		const query = {
			selector: { ...selector },
		};
		const result = await this.db.find(query);
		return result.docs;
	}

	public async create(
		entity: Partial<ScheduleEntity>,
		customId: any = randomUUID(),
	): Promise<ScheduleEntity> {
		const newEntity = {
			_id: customId,
			...entity,
		};

		await this.db.insert(newEntity);
		return newEntity as ScheduleEntity;
	}

	public async updateById(
		id: string,
		update: Partial<ScheduleEntity>,
	): Promise<ScheduleEntity | null> {
		try {
			const existing = await this.findOne(id);
			if (!existing) {
				return null;
			}
			const updatedEntity = { ...existing, ...update };
			await this.db.insert(updatedEntity);
			return updatedEntity;
		} catch (error) {
			throw error;
		}
	}

	public async delete(id: string): Promise<boolean> {
		try {
			const doc = await this.findOne(id);
			if (!doc) {
				return false;
			}
			await this.db.destroy(id, doc._rev);
			return true;
		} catch (error) {
			throw error;
		}
	}
}
