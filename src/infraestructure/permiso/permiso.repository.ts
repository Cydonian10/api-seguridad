import { DatabasePool } from "@src/data/init";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { CreatePermisoDto } from "@src/domain/permiso/dtos/create-permiso.dto";
import { UpdatePermisoDto } from "@src/domain/permiso/dtos/update-permiso.dto";
import { Permiso } from "@src/domain/permiso/permiso.model";
import { IPermisoRepository } from "@src/domain/permiso/permiso.repository";
import { Int, VarChar } from "mssql";

interface Inject {
	databasePool: DatabasePool;
}

export class PermisoRespository implements IPermisoRepository {
	public databasePool: DatabasePool;

	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}

	create = async (createDTO: CreatePermisoDto): Promise<OperationResult> => {
		const { titulo } = createDTO;
		const request = await this.databasePool.getPool();

		request.input("titulo", VarChar(50), titulo);

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
        `);

		return toOperationResult(recordset[0]);
	};
	update = async (updateDTO: UpdatePermisoDto, id: Permiso["id"]): Promise<OperationResult> => {
		const { titulo } = updateDTO;
		const request = await this.databasePool.getPool();

		request.input("permisoId", Int, id).input("titulo", VarChar(50), titulo);

		const { recordset } = await request.query<OperationResultRaw>(`
            UPDATE Permisos SET
                Titulo =  @titulo
                WHERE Id = @permisoId

            SELECT @permisoId AS Id, 'Updated successful' AS Message;
        `);

		return toOperationResult(recordset[0]);
	};

	getAll = async (): Promise<Permiso[]> => {
		const request = await this.databasePool.getPool();

		const { recordset } = await request.query<Permiso>(`
            SELECT Id id, Titulo titulo FROM Permisos WHERE Estado = 1 
        `);
		return recordset;
	};

	getOne = async (id: Permiso["id"]): Promise<Permiso> => {
		const request = await this.databasePool.getPool();
		request.input("permisoId", Int, id);

		const { recordset } = await request.query<Permiso>(`
            SELECT Id id, Titulo titulo FROM Permisos
                WHERE Id = @permisoId and Estado = 1
        `);
		return recordset[0];
	};

	delete = async (id: Permiso["id"]): Promise<OperationResult> => {
		const request = await this.databasePool.getPool();
		request.input("permisoId", Int, id);

		const { recordset } = await request.query<OperationResultRaw>(`
            UPDATE Permisos SET
                Estado =  0
                WHERE Id = @permisoId
            SELECT @permisoId AS Id, 'Deleted successful' AS Message;
        `);

		return toOperationResult(recordset[0]);
	};
}
