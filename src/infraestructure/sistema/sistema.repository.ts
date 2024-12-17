import { ISistemaRepository } from "@src/domain/sistema/sistema.repository";
import { DatabasePool } from "../../data/init";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { UpdateSistemaDTO } from "@src/domain/sistema/dtos/update-sistema.dto";
import { Sistema, SistemaRawSql, toSistema } from "@src/domain/sistema/models/sistema.model";
import { UnidadOrganizacional } from "@src/domain/unidadOrganizacional/unidadOrganizacional.model";
import { CreateSistemaDTO } from "@src/domain/sistema/dtos/create-sistema.dto";
import { Int, MAX, Table, VarChar } from "mssql";
import { SistemaDetalle, SistemaDetalleRawSql, toSistemaDetalle } from "@src/domain/sistema/models/sistema-detalle.model";
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
		const request = await this.databasePool.getPool()

		const { recordset } = await request.input("sistemaId", Int, sistemaId)
			.input("unidadOrganizacionalId", Int, unidadOrganizacionalId)
				.query<OperationResultRaw>(`
				DECLARE @registroId INT;
				SELECT @registroId = Id FROM UnidadOrganizacionalSistema
						WHERE SistemaId = @sistemaId AND UnidadOrganizacionalId = @unidadOrganizacionalId

				IF @registroId IS NOT NULL	
				BEGIN
					DELETE FROM UnidadOrganizacionalSistema
    				WHERE Id = @RegistroId;
				END	

				SELECT @registroId AS Id, 'Update sistema successful' AS Message;
			`)

		return toOperationResult(recordset[0])
		
	};
	addUnidadOrganizativaASistema = async (
		sistemaId: Sistema["id"],
		unidadOrganizacionalId: UnidadOrganizacional["id"]
	): Promise<OperationResult> => {
		const request = await this.databasePool.getPool()

		const { recordset } = await request.input("sistemaId", Int, sistemaId)
			.input("unidadOrganizacionalId",Int, unidadOrganizacionalId)
			.query(`
				IF NOT EXISTS(
					SELECT 1 FROM UnidadOrganizacionalSistema
						WHERE SistemaId = @sistemaId AND UnidadOrganizacionalId = @unidadOrganizacionalId
				)		
				BEGIN
					INSERT INTO UnidadOrganizacionalSistema (UnidadOrganizacionalId, SistemaId)
						VALUES (@unidadOrganizacionalId, @sistemaId)
					
					SELECT @sistemaId AS Id, 'Insert unidadOrganizacional listo' AS Message;
				END

				SELECT @sistemaId AS Id, 'Unidad organizativa ya existe en sistema' AS Message;

			`)
		return toOperationResult(recordset[0])

	};
	getAll = async (): Promise<Sistema[]> => {
		const request = await this.databasePool.getPool()
		const { recordset } = await request.query<SistemaRawSql>(`
			SELECT 
				s.Id id,
				s.Titulo titulo,
				s.Descripcion descripcion,
				s.Color color,
				s.Url url,
				s.Imagen imagen,
				COUNT(mo.Id) AS totalModulos
			FROM Sistema s
			INNER JOIN Modulo mo on mo.SistemaId = s.Id 
			GROUP BY 
				s.Id, 
				s.Titulo, 
				s.Descripcion, 
				s.Color, 
				s.Url, 
				s.Estado, 
				s.Imagen;
		`)
		return recordset.map((rawSql) => toSistema(rawSql))
	};
	getOne = async (sistemaId: number): Promise<SistemaDetalle> => {
		const request = await this.databasePool.getPool()
		const { recordset } = await request
		.input("sistemaId",Int, sistemaId)
		.query<SistemaDetalleRawSql>(`
			SELECT 
				s.id id,
				s.Titulo titulo,
				s.Descripcion  descripcion,
				s.Imagen imagen,
				s.Url url,
				s.Color color,
				
				uo.Id unidadOrganizacionalId,
				uo.Nombre unidadOrganizacionlNombre,
				uo.Abreviatura unidadOrganizacionalAbreviatura,
				
				m.Id moduloId,
				m.Titulo moduloTitulo,
				m.Descripcion moduloDescripcion,
				m.Color moduloColor,
				m.Icon moduloIcon
			FROM
				Sistema s 
			inner join UnidadOrganizacional uo on uo.Id  = s.Id 
			INNER JOIN Modulo m ON m.SistemaId  = s.Id 
			WHERE s.Id = @sistemaId
	
		`)

		return toSistemaDetalle(recordset[0])
	};
}
