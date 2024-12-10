import { IUnidadOrganizacionalRepository } from "@src/domain/unidadOrganizacional/unidadOrganizacional.repository";
import { DatabasePool } from "../../data/init";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { ConfigUnidadOrganizacionalMenu } from "@src/domain/unidadOrganizacional/dtos/config-unidadOrganizacional-menu.dto";
import { CreateUnidadOrganizacionDTO } from "@src/domain/unidadOrganizacional/dtos/create-unidadOrganizacional.dto";
import { UpdateUnidadOrganizacionDTO } from "@src/domain/unidadOrganizacional/dtos/update-unidadOrganizacional.dto";
import { UnidadOrganizacional } from "@src/domain/unidadOrganizacional/unidadOrganizacional.model";
import { Int, VarChar } from "mssql";
interface Inject {
	databasePool: DatabasePool;
}

export class UnidadOrganizacionalRepository implements IUnidadOrganizacionalRepository {
	private databasePool: DatabasePool;

	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}

	create = async (createDTO: CreateUnidadOrganizacionDTO): Promise<OperationResult> => {
		console.log(createDTO);
		const { abreviatura, nombre } = createDTO;
		const request = await this.databasePool.getPool();

		request.input("nombre", VarChar(50), nombre);
		request.input("abreviatura", VarChar(50), abreviatura);

		const { recordset } = await request.query<OperationResultRaw>(`
			INSERT INTO UnidadOrganizacional (Nombre, Abreviatura)
			VALUES (@nombre, @abreviatura)

			SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;
		`);

		return toOperationResult(recordset[0]);
	};

	update = async (updateDto: UpdateUnidadOrganizacionDTO, id: UnidadOrganizacional["id"]): Promise<OperationResult> => {
		const { abreviatura, nombre } = updateDto;
		const request = await this.databasePool.getPool();

		request.input("id", Int, id).input("nombre", VarChar(50), nombre).input("abreviatura", VarChar(50), abreviatura);

		const { recordset } = await request.query<OperationResultRaw>(`
			UPDATE UnidadOrganizacional SET
				Nombre = @nombre,
				Abreviatura =  @abreviatura
				WHERE Id = @id;
			SELECT SCOPE_IDENTITY() AS @id, 'Update successful' AS Message;
		`);

		return toOperationResult(recordset[0]);
	};

	getAll = async (): Promise<UnidadOrganizacional[]> => {
		const request = await this.databasePool.getPool();
		const { recordset } = await request.query<UnidadOrganizacional>(`
			SELECT Id id, Nombre nombre, Abreviatura abreaviatura FROM UnidadOrganizacional WHERE Estado = 1
		`);
		return recordset;
	};

	getOne = async (id: UnidadOrganizacional["id"]): Promise<UnidadOrganizacional> => {
		const request = await this.databasePool.getPool();
		request.input("id", Int, id);

		const { recordset } = await request.query<UnidadOrganizacional>(`
				SELECT Id id, Nombre nombre, Abreviatura abreaviatura FROM UnidadOrganizacional WHERE Estado = 1 AND @Id = id
		`);

		return recordset[0];
	};

	addMenuShow = async (configDto: ConfigUnidadOrganizacionalMenu): Promise<OperationResult> => {
		const { menuId, unidadOrganizacionalId } = configDto;
		const request = await this.databasePool.getPool();

		request.input("menuId", Int, menuId).input("unidadOrganizacionalId", VarChar(50), unidadOrganizacionalId);

		const { recordset } = await request.query<OperationResultRaw>(`
			INSERT INTO MostrarMenu ( UnidadOrganizacionalId, MenuId )
				VALUES (@unidadOrganizacionalId, @menuId)

			SELECT SCOPE_IDENTITY() AS @unidadOrganizacionalId, 'Show menu a Unidad Organizacional successful' AS Message;
		`);
		return toOperationResult(recordset[0]);
	};
}
