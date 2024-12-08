import { DatabasePool } from "@src/data/init";

interface Inject {
	databasePool: DatabasePool;
}

export class ExampleRepository {
	private database: DatabasePool;

	constructor({ databasePool }: Inject) {
		this.database = databasePool;
	}

	getUsuarios = async () => {
		const pool = await this.database.getPool();
		const { recordset } = await pool.query("SELECT Id id, Nombre nombre, Username nickname FROM Usuarios");
		return recordset;
	};
}
