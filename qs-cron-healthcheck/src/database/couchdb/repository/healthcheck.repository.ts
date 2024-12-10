import { env } from "../../../config/env";
import type { HealthcheckEntity } from "../entity/healthcheck.entity";
import { randomUUID } from "node:crypto";
import * as nano from "nano";

export class HealthcheckRepository {
	couchDbUrl: string;
	collection: string;
	db: nano.DocumentScope<HealthcheckEntity | any>;

	constructor() {
		this.couchDbUrl = env.databases.couchdb.url;
		this.collection = env.databases.couchdb.collections.healthchecks;
		this.db = nano(this.couchDbUrl).use<HealthcheckEntity>(this.collection);
	}

	public async findOne(id: string): Promise<HealthcheckEntity | null> {
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
		selector: Partial<HealthcheckEntity> = {},
	): Promise<HealthcheckEntity[]> {
		const query = {
			selector: { ...selector },
		};
		const result = await this.db.find(query);
		return result.docs;
	}

	public async create(
		entity: Partial<HealthcheckEntity>,
		customId: any = randomUUID(),
	): Promise<HealthcheckEntity> {
		const newEntity = {
			_id: customId,
			...entity,
		};

		await this.db.insert(newEntity);
		return newEntity as HealthcheckEntity;
	}

	public async updateById(
		id: string,
		update: Partial<HealthcheckEntity>,
	): Promise<HealthcheckEntity | null> {
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

	public async deleteAll(): Promise<boolean> {
		try {
			const allDocs = await this.db.list({ include_docs: true });

			if (!allDocs.rows.length) {
				console.log("Nenhum documento encontrado para deletar.");
				return false;
			}

			const bulkDeletes = allDocs.rows.map((row) => ({
				_id: row.id,
				_rev: row.doc?._rev,
				_deleted: true,
			}));

			await this.db.bulk({ docs: bulkDeletes });
			console.log("Todos os documentos foram deletados.");
			return true;
		} catch (error) {
			console.error("Erro ao deletar todos os documentos:", error);
			throw error;
		}
	}
}
