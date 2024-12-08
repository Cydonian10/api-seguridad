import { IUnidadOrganizacionalRepository } from "@src/domain/unidadOrganizacional/unidadOrganizacional.repository";
import { DatabasePool } from "../../data/init";
import { OperationResult, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { ConfigUnidadOrganizacionalMenu } from "@src/domain/unidadOrganizacional/dtos/config-unidadOrganizacional-menu.dto";
import { CreateUnidadOrganizacionDTO } from "@src/domain/unidadOrganizacional/dtos/create-unidadOrganizacional.dto";
import { UpdateUnidadOrganizacionDTO } from "@src/domain/unidadOrganizacional/dtos/update-unidadOrganizacional.dto";
import { UnidadOrganizacional } from "@src/domain/unidadOrganizacional/unidadOrganizacional.model";
import { VarChar } from "mssql";
interface Inject {
	databasePool: DatabasePool;
}

export class UnidadOrganizacionalRepository implements IUnidadOrganizacionalRepository {
	private databasePool: DatabasePool;

	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}

	create = async (createDTO: CreateUnidadOrganizacionDTO): Promise<OperationResult> => {
		const { abreviatura, nombre } = createDTO;
		const request = await this.databasePool.getPool();

		request.input("nombre", VarChar(50), nombre);
		request.input("abreviatura", VarChar(50), abreviatura);

		const { recordset } = await request.query(`
			INSERT INTO UnidadOrganizacional (cNombre, cAbreviatura)
			VALUES (@nombre, @abreviatura)

			SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;
		`);

		return toOperationResult(recordset[0]);
	};
	update = (updateDto: UpdateUnidadOrganizacionDTO): Promise<OperationResult> => {
		throw new Error("Not implmentent");
	};
	getAll = async (): Promise<UnidadOrganizacional[]> => {
		const request = await this.databasePool.getPool();
		const { recordset } = await request.query<UnidadOrganizacional>(`
			SELECT Id id, cNombre nombre, cAbreviatura abreaviatura FROM UnidadOrganizacional WHERE Estado = 1
		`);
		return recordset;
	};
	getOne = (rolId: UnidadOrganizacional["id"]): Promise<UnidadOrganizacional> => {
		throw new Error("Not implmentent");
	};
	addMenuShow = (configDto: ConfigUnidadOrganizacionalMenu): Promise<OperationResult> => {
		throw new Error("Not implmentent");
	};
}
