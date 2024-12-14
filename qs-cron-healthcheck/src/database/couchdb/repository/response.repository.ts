import { env } from "../../../config/env";
import type { ResponseEntity } from "../entity/response.entity";
import { randomUUID } from "node:crypto";
import * as nano from "nano";

export class ResponseRepository {
	couchDbUrl: string;
	collection: string;
	db: nano.DocumentScope<ResponseEntity | any>;

	constructor() {
		this.couchDbUrl = env.databases.couchdb.url;
		this.collection = env.databases.couchdb.collections.response;
		this.db = nano(this.couchDbUrl).use<ResponseEntity>(this.collection);
	}

	public async findOne(id: string): Promise<ResponseEntity | null> {
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
		selector: Partial<ResponseEntity> = {},
	): Promise<ResponseEntity[]> {
		const query = {
			selector: { ...selector },
		};
		const result = await this.db.find(query);
		return result.docs;
	}

	public async create(
		entity: Partial<ResponseEntity>,
		customId: any = randomUUID(),
	): Promise<ResponseEntity> {
		const newEntity = {
			_id: customId,
			...entity,
		};

		await this.db.insert(newEntity);
		return newEntity as ResponseEntity;
	}

	public async updateById(
		id: string,
		update: Partial<ResponseEntity>,
	): Promise<ResponseEntity | null> {
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

	public async deleteAll(): Promise<boolean> {
		try {
			const allDocs = await this.db.list({ include_docs: true });

			if (!allDocs.rows.length) {
				console.log("No documents to delete.");
				return false;
			}

			const bulkDeletes = allDocs.rows.map((row) => ({
				_id: row.id,
				_rev: row.doc?._rev,
				_deleted: true,
			}));

			await this.db.bulk({ docs: bulkDeletes });
			console.log("All documents deleted.");
			return true;
		} catch (error) {
			console.error("Error on delete documents:", error);
			throw error;
		}
	}
}
