import * as nano from "nano";
import { env } from "../../config/env";

export class DatabaseInitializer {
	couchDbUrl: string;
	collections: Record<string, string>;

	constructor() {
		this.couchDbUrl = env.databases.couchdb.url;
		this.collections = env.databases.couchdb.collections;
	}

	public async initializeDatabases(): Promise<void> {
		try {
			const couchInstance = nano(this.couchDbUrl);
			const existingDbs = await couchInstance.db.list();

			for (const [collectionName, dbName] of Object.entries(this.collections)) {
				if (!existingDbs.includes(dbName)) {
					console.log(
						`Database"${dbName}" (${collectionName}) not found. Creating...`,
					);
					await couchInstance.db.create(dbName);
					console.log(
						`Database "${dbName}" (${collectionName}) create successfully.`,
					);
					return;
				}

				if (env.databases.couchdb.clearOnInit) {
					const allDocs = await couchInstance.db
						.use(dbName)
						.list({ include_docs: true });

					if (allDocs.rows.length === 0) {
						console.log(`Database "${dbName}" (${collectionName}) its void.`);
						continue;
					}

					const bulkDeletes = allDocs.rows.map((row) => ({
						_id: row.id,
						_rev: row.doc?._rev,
						_deleted: true,
					}));

					await couchInstance.db.use(dbName).bulk({ docs: bulkDeletes });
					console.log(
						`Database"${dbName}" (${collectionName}) clear successfully.`,
					);
				}
			}
		} catch (error) {
			console.error("Erro ao inicializar os bancos de dados:", error);
			throw error;
		}
	}
}
