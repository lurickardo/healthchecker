import type * as nano from "nano";

export class CouchRepository {
	protected async ensureDatabaseExists(
		couchInstance: nano.ServerScope,
		dbName: string,
	): Promise<void> {
		try {
			const databases = await couchInstance.db.list();
			if (!databases.includes(dbName)) {
				console.log(`Database "${dbName}" not found. Creating...`);
				await couchInstance.db.create(dbName);
				console.log(`Database "${dbName}" create successfuly.`);
				return;
			}
			console.log(`Database "${dbName}" exists now.`);
		} catch (error) {
			console.error(`Error checking/creating database "${dbName}":`, error);
			throw error;
		}
	}
}
