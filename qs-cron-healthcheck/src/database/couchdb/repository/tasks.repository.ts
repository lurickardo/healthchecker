import { env } from "../../../config/env";
import type { TaskEntity } from "../entity/task.entity";
import { randomUUID } from "node:crypto";
import * as nano from "nano";

export class TasksRepository {
	couchDbUrl: string;
	collection: string;
	db: nano.DocumentScope<TaskEntity | any>;

	constructor() {
		this.couchDbUrl = env.databases.couchdb.url;
		this.collection = env.databases.couchdb.collections.tasks;
		this.db = nano(this.couchDbUrl).use<TaskEntity>(this.collection);
	}

	public async findOne(id: string): Promise<TaskEntity | null> {
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

	public async find(selector: Partial<TaskEntity> = {}): Promise<TaskEntity[]> {
		const query = {
			selector: { ...selector },
		};
		const result = await this.db.find(query);
		return result.docs;
	}

	public async create(
		entity: Partial<TaskEntity>,
		customId?: any,
	): Promise<TaskEntity> {
		if (customId) {
			entity.customId = customId;
		}

		await this.db.insert(entity);
		return entity as TaskEntity;
	}

	public async updateById(
		id: string,
		update: Partial<TaskEntity>,
	): Promise<TaskEntity | null> {
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
			return true;
		} catch (error) {
			console.error("Erro ao deletar todos os documentos:", error);
			throw error;
		}
	}
}
