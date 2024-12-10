import { env } from "../../../config/env";
import type { JobEntity } from "../entity/job.entity";
import { randomUUID } from "node:crypto";
import * as nano from "nano";

export class JobsRepository {
	couchDbUrl: string;
	collection: string;
	db: nano.DocumentScope<JobEntity | any>;

	constructor() {
		this.couchDbUrl = env.databases.couchdb.url;
		this.collection = env.databases.couchdb.collections.jobs;
		this.db = nano(this.couchDbUrl).use<JobEntity>(this.collection);
	}

	public async findOne(id: string): Promise<JobEntity | null> {
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

	public async find(selector: Partial<JobEntity> = {}): Promise<JobEntity[]> {
		const query = {
			selector: { ...selector },
		};
		const result = await this.db.find(query);
		return result.docs;
	}

	public async create(
		entity: Partial<JobEntity>,
		customId?: any,
	): Promise<JobEntity> {
		if (customId) {
			entity.customId = customId;
		}

		await this.db.insert(entity);
		return entity as JobEntity;
	}

	public async updateById(
		id: string,
		update: Partial<JobEntity>,
	): Promise<JobEntity | null> {
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
			await this.db.destroy(id, doc._rev!);
			return true;
		} catch (error) {
			throw error;
		}
	}
}
