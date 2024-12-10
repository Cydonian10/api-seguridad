import { ConnectionPool, Request, config as SQLConfig, Transaction } from "mssql";

export class DatabasePool {
	public pool: ConnectionPool | null = null;
	private readonly config: SQLConfig = {
		user: "sa",
		password: "TuPassword123",
		server: "localhost",
		database: "prueba",
		port: 1433,
		options: {
			encrypt: false,
			trustServerCertificate: true,
		},
	};

	public async getPool(): Promise<Request> {
		if (!this.pool) {
			try {
				this.pool = new ConnectionPool(this.config);
				console.log("Conexión al pool establecida.");
				return (await this.pool.connect()).request();
			} catch (error) {
				console.error("Error al conectar al pool:", error);
				throw error;
			}
		}
		return this.pool.request();
	}

	public async closePool(): Promise<void> {
		if (this.pool) {
			try {
				await this.pool.close();
				console.log("Conexión al pool cerrada.");
				this.pool = null;
			} catch (error) {
				console.error("Error al cerrar el pool:", error);
				throw error;
			}
		}
	}

	public async beginTransaction(): Promise<{ transaction: Transaction; request: Request }> {
		if (!this.pool) {
			await this.getPool(); // Asegúrate de que el pool esté disponible
		}

		const transaction = new Transaction(this.pool!);
		try {
			await transaction.begin();
			console.log("Transacción iniciada.");
			return {
				transaction,
				request: transaction.request(),
			};
		} catch (error) {
			console.error("Error al iniciar la transacción:", error);
			throw error;
		}
	}
}
