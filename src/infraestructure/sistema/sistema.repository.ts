import { ISistemaRepository } from "@src/domain/sistema/sistema.repository";
import { DatabasePool } from "../../data/init";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { UpdateSistemaDTO } from "@src/domain/sistema/dtos/update-sistema.dto";
import { Sistema } from "@src/domain/sistema/sistema.model";
import { UnidadOrganizacional } from "@src/domain/unidadOrganizacional/unidadOrganizacional.model";
import { CreateSistemaDTO } from "@src/domain/sistema/dtos/create-sistema.dto";
import { Int, MAX, Table, Transaction, VarChar } from "mssql";
interface Inject {
	databasePool: DatabasePool;
}

export class SistemaRepository implements ISistemaRepository {
	private databasePool: DatabasePool;
	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}
	create = async (createDTO: CreateSistemaDTO): Promise<OperationResult> => {
		const { color, descripcion, imagen, titulo, url , unidadOrganizacionalIds } = createDTO;

		try {
      console.log({createDTO});
		  const { transaction, request } = await this.databasePool.beginTransaction();

			try {
				const { recordset } = await
				request
					.input("color", VarChar(50), color)
					.input("descripcion", VarChar(MAX), descripcion)
					.input("imagen", VarChar(MAX), imagen)
					.input("url", VarChar(MAX), url)
					.input("titulo", VarChar(100), titulo).query<OperationResultRaw>(`
            INSERT INTO Sistema (Color, Descripcion, Imagen, Titulo, Url)
              VALUES (@color, @descripcion, @imagen, @titulo ,@url)
            SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;
          `);
				const { id:sistemaId } = toOperationResult(recordset[0]);


				const unidadOrganizacionalTable = new Table("UnidadOrganizacionalTableType");
				unidadOrganizacionalTable.columns.add("unidadOrganizacionalId", Int);
				unidadOrganizacionalIds.forEach((id) => {
					unidadOrganizacionalTable.rows.add(id);
				});

				await request.input("sistemaId", Int, sistemaId).input("unidadOrganizacionalIds", unidadOrganizacionalTable).query(`
					INSERT INTO UnidadOrganizacionalSistema (SistemaId, UnidadOrganizacionalId, Estado)
					SELECT @sistemaId, unidadOrganizacionalId, 1
					FROM @unidadOrganizacionalIds;

					SELECT @sistemaId AS Id, 'Insert menu successful' AS Message;
        `);
				await transaction.commit();
				return toOperationResult(recordset[0]);
			} catch (error) {
				console.log(error);
				await transaction.rollback();
				throw error;
			}
    } catch (error) {
      console.log(error);
      throw error;
    }
	};
	update = async (updateDto: UpdateSistemaDTO, sistemaId: Sistema["id"]): Promise<OperationResult> => {
		const { color = null, descripcion = null, imagen = null, titulo = null, url = null } = updateDto
		try {
			const { transaction, request } = await this.databasePool.beginTransaction();

			try {
				const { recordset } = await
				request
					.input("color", VarChar(50), color)
					.input("descripcion", VarChar(MAX), descripcion)
					.input("imagen", VarChar(MAX), imagen)
					.input("url", VarChar(MAX), url)
					.input("titulo", VarChar(100), titulo)
					.input("sistemaId", Int, sistemaId).query<OperationResultRaw>(`
            UPDATE Sistema SET
							Color = COALESCE(@color, Color),
							Descripcion = COALESCE(@descripcion, Descripcion),
							Imagen = COALESCE(@imagen, Imagen),
							Titulo = COALESCE(@titulo, Titulo),
							Url = COALESCE(@url, Url)
						WHERE Id = @sistemaId

					  SELECT @sistemaId AS Id, 'Update sistema successful' AS Message;
          `);
				await transaction.commit();
				return toOperationResult(recordset[0]);
			} catch (error) {
				console.log(error);
				await transaction.rollback();
				throw error;
			}
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
	eliminarUnidadOrganizacionDeSistema = async (
		sistemaId: Sistema["id"],
		unidadOrganizacionalId: UnidadOrganizacional["id"]
	): Promise<OperationResult> => {
		throw new Error("Not implementation");
	};
	addUnidadOrganizativaASistema = async (
		sistemaId: Sistema["id"],
		unidadOrganizacionalId: UnidadOrganizacional["id"]
	): Promise<OperationResult> => {
		throw new Error("Not implementation");
	};
	getAll = async (): Promise<Sistema[]> => {
		throw new Error("Not implementation");
	};
	getOne = async (rolId: number): Promise<Sistema> => {
		throw new Error("Not implementation");
	};
}
