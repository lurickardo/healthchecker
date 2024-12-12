import type * as nano from "nano";

export class CouchRepository {
	protected async ensureDatabaseExists(
		couchInstance: nano.ServerScope,
		dbName: string,
	): Promise<void> {
		try {
			const databases = await couchInstance.db.list();
			if (!databases.includes(dbName)) {
				console.log(`Banco de dados "${dbName}" não encontrado. Criando...`);
				await couchInstance.db.create(dbName);
				console.log(`Banco de dados "${dbName}" criado com sucesso.`);
				return;
			}
			console.log(`Banco de dados "${dbName}" já existe.`);
		} catch (error) {
			console.error(
				`Erro ao verificar/criar o banco de dados "${dbName}":`,
				error,
			);
			throw error;
		}
	}
}
