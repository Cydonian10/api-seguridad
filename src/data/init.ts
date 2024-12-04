import { ConnectionPool, config as SQLConfig } from 'mssql';


export class DatabasePool {
    private pool: ConnectionPool | null = null
    private readonly config: SQLConfig = {
        user: 'sa',                 
        password: 'TuPassword123', 
        server: 'localhost',        
        database: 'prueba',  
        port: 1433,                 
        options: {
          encrypt: false,           
          trustServerCertificate: true, 
        },
    }

    public async getPool() : Promise<ConnectionPool> {
        if (!this.pool) {
            try {
              this.pool = new ConnectionPool(this.config);
              await this.pool.connect();
              console.log('Conexión al pool establecida.');
            } catch (error) {
              console.error('Error al conectar al pool:', error);
              throw error;
            }
          }
        return this.pool;      
    }

    public async closePool(): Promise<void> {
        if (this.pool) {
          try {
            await this.pool.close();
            console.log('Conexión al pool cerrada.');
            this.pool = null;
          } catch (error) {
            console.error('Error al cerrar el pool:', error);
            throw error;
          }
        }
      }
}