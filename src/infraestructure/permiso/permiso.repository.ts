import { DatabasePool } from "@src/data/init";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { CreatePermisoDto } from "@src/domain/permiso/dtos/create-permiso.dto";
import { Permiso } from "@src/domain/permiso/permiso.model";
import { IPermisoRepository } from "@src/domain/permiso/permiso.repository";
import { VarChar } from "mssql";

interface Inject {
    databasePool: DatabasePool
}

export class PermisoRespository implements IPermisoRepository {
    public databasePool: DatabasePool;

    constructor({databasePool}:Inject) {
        this.databasePool = databasePool
    }

    create = async (createDTO: CreatePermisoDto): Promise<OperationResult> =>  {
        const { titulo } = createDTO
        const pool = await this.databasePool.getPool()
        const request = pool.request()

        request.input("titulo", VarChar(50), titulo )
        
        
        const { recordset } = await request.query<OperationResultRaw>(`
              BEGIN TRY
                BEGIN TRANSACTION;
                INSERT INTO Permisos (Titulo)
                VALUES (@titulo);
                SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;
                COMMIT TRANSACTION;
            END TRY
            BEGIN CATCH
                ROLLBACK TRANSACTION;
                SELECT NULL AS Id, ERROR_MESSAGE() AS Message;
            END CATCH;
        `) 

        return  toOperationResult(recordset[0])
    };
    update = (): OperationResult => {
        throw new Error("No implementado")
    };
    
    getAll = async (): Promise<Permiso[]> => {
        const pool = await this.databasePool.getPool()
        const request = pool.request()

        const { recordset } = await request.query<Permiso>(`
            SELECT Id id, Titulo titulo FROM Permisos    
        `)
        return recordset
    };

    getOne = (rolId: Permiso["id"]): Promise<Permiso> => {
        throw new Error("No implementado")
    };

}