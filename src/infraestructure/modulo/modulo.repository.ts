import { DatabasePool } from "@src/data/init";
import { CreateModuloDTO } from "@src/domain/modulo/dtos/create-modulo.dto";
import { FilterModuloDTO } from "@src/domain/modulo/dtos/filter-modulo.dto";
import { UpdateModuloDTO } from "@src/domain/modulo/dtos/update-modulo.dto";
import { Modulo, ModuloRawSql, toModuloSimple } from "@src/domain/modulo/modulo.model";
import { IModuloRepository } from "@src/domain/modulo/modulo.repository";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { Sistema, SistemaRawSql } from "@src/domain/sistema/models/sistema.model";
import { Int, MAX, Table, VarChar } from "mssql";

interface Inject {
    databasePool: DatabasePool;
}

export class ModuloRepository implements IModuloRepository {
    public databasePool: DatabasePool;

    constructor({ databasePool }: Inject) {
        this.databasePool = databasePool;
    }

    create = async (createDTO: CreateModuloDTO): Promise<OperationResult> => {
        const { color, menus, descripcion,icon, sistemaId, titulo } = createDTO
        try {
            const { transaction, request } = await this.databasePool.beginTransaction();

            const { recordset } = await
                request
                    .input("color", VarChar(50), color)
                    .input("descripcion", VarChar(MAX), descripcion)
                    .input("icon", VarChar(MAX), icon)
                    .input("sistemaId", VarChar(MAX), sistemaId)
                    .input("titulo", VarChar(100), titulo)
                    .query<OperationResultRaw>(`
						INSERT INTO Modulo (Color, Descripcion, Icon, Titulo, SistemaId)
						VALUES (@color, @descripcion, @icon, @titulo ,@sistemaId)
						SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;
					`);
            const { id: moduloId } = toOperationResult(recordset[0]);

            const menuTableType = new Table("MenuTableType");
            menuTableType.columns.add("unidadOrganizacionalId", Int);
            menus.forEach(({icon,titulo,url}) => {
                menuTableType.rows.add(icon, titulo, url);
            });

            await request.input("moduloId", Int, moduloId).input("menus", menuTableType).query(`
					INSERT INTO UnidadOrganizacionalSistema (ModuloId, Titulo, Icon, Url)
					SELECT @moduloId, titulo, icon, icon, url
					FROM @menus;

					SELECT @moduloId AS Id, 'Insert successful' AS Message;
            `);

            await transaction.commit();
            return toOperationResult(recordset[0]);
        }
        catch(error) {
            throw error;
        }
    };
    update = (updateDTO: UpdateModuloDTO): Promise<OperationResult> => {
        throw new Error("not implement")
    };
    getAll = async (filter:FilterModuloDTO): Promise<Modulo[]> => {
        const { idSistema } = filter
        const request = await this.databasePool.getPool();

        const { recordset } = await request
        .input("idSistema", Int, idSistema)
        .query<ModuloRawSql>(`
            SELECT
                m.Id id,
                m.Titulo titulo,
                m.Descripcion  descripcion,
                m.Color color,
                m.Icon icon,
                count(m2.id) menusTotales
            FROM  Modulo m 
            	inner join	Menu m2 on m2.ModuloId = m.Id 
            WHERE (@idSistema IS NULL OR m.SistemaId = @idSistema)
            GROUP BY m.Id,
                m.Titulo,
                m.Descripcion,
                m.Color,
                m.Icon 
        `);
        return recordset.map((rawSql) => toModuloSimple(rawSql));
    };
    getOne = (rolId: Modulo["id"]): Promise<Modulo> => {
        throw new Error("not implement")
    };

}


