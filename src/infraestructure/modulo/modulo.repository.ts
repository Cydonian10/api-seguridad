import { DatabasePool } from "@src/data/init";
import { CreateModuloDTO } from "@src/domain/modulo/dtos/create-modulo.dto";
import { FilterModuloDTO } from "@src/domain/modulo/dtos/filter-modulo.dto";
import { UpdateModuloDTO } from "@src/domain/modulo/dtos/update-modulo.dto";
import { Modulo, ModuloDetalleRawSql, ModuloRawSql, toModuloDetalle, toModuloSimple } from "@src/domain/modulo/modulo.model";
import { IModuloRepository } from "@src/domain/modulo/modulo.repository";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
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
        const { transaction, request } = await this.databasePool.beginTransaction();
        try {
            const { recordset } = await
                request
                    .input("color", VarChar(50), color)
                    .input("descripcion", VarChar(MAX), descripcion)
                    .input("icon", VarChar(50), icon)
                    .input("sistemaId", Int, sistemaId)
                    .input("titulo", VarChar(100), titulo)
                    .query<OperationResultRaw>(`
						INSERT INTO Modulo (Color, Descripcion, Icon, Titulo, SistemaId)
						VALUES (@color, @descripcion, @icon, @titulo ,@sistemaId)
						SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;
					`);
            const { id: moduloId } = toOperationResult(recordset[0]);

            if( menus ) {
                const menuTableType = new Table("MenuTableType");

                menuTableType.columns.add("titulo", VarChar(100));
                menuTableType.columns.add("icon", VarChar(50));
                menuTableType.columns.add("url", VarChar(MAX));

                menus.forEach(({icon,titulo,url}) => {
                    menuTableType.rows.add(titulo, icon, url);
                });
    
                await request.input("moduloId", Int, moduloId).input("menus", menuTableType).query(`
                        INSERT INTO Menu (ModuloId, Titulo, Icon, Url)
                        SELECT @moduloId, titulo, icon, url
                        FROM @menus;
                        SELECT @moduloId AS Id, 'Insert successful' AS Message;
                `);
            }
            await transaction.commit();
            return toOperationResult(recordset[0]);
        }
        catch(error) {
            console.log(error);
            transaction.rollback()
            throw error;
        }
    };
    update = async (updateDTO: UpdateModuloDTO, moduloId: number): Promise<OperationResult> => {
        const { color, descripcion, icon, titulo } = updateDTO

        const request = await this.databasePool.getPool();

        const { recordset} = await request
            .input("color", VarChar(50), color)
            .input("descripcion", VarChar(MAX), descripcion)
            .input("icon", VarChar(50), icon)
            .input("titulo", VarChar(100), titulo)
            .input("moduloId", Int, moduloId)
            .query(`
                UPDATE Modulo SET
                    Titulo =  COALESCE(@titulo, Titulo),
                    Descripcion = COALESCE(@descripcion,Descripcion),
                    Icon = COALESCE(@icon,Icon),
                    Color = COALESCE(@color,Color)
                WHERE Id = @moduloId

                SELECT @moduloId AS Id, 'Updated successful' AS Message;
            `)
        return toOperationResult(recordset[0]);

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
            	left join	Menu m2 on m2.ModuloId = m.Id 
            WHERE (@idSistema IS NULL OR m.SistemaId = @idSistema)
            GROUP BY m.Id,
                m.Titulo,
                m.Descripcion,
                m.Color,
                m.Icon 
        `);
        return recordset.map((rawSql) => toModuloSimple(rawSql));
    };
    getOne = async (moduloId: Modulo["id"]): Promise<Modulo> => {
        const request = await this.databasePool.getPool();

        const { recordset } = await request
            .input("moduloId", Int, moduloId)
            .query<ModuloDetalleRawSql>(`
                SELECT
                    m.Id  id,
                    m.Titulo  titulo,
                    m.Descripcion descripcion,
                    m.Color color,
                    m.Icon icon,   
                    s.Id sistemaId,
                    s.Titulo sistemaTitulo,
                    s.Descripcion sistemaDescipcion,
                    s.Url sistemaUrl,  
                    m2.Id menuId,
                    m2.Titulo menuTitulo,
                    m2.Icon menuIcon,
                    m2.Url menuUrl
                FROM Modulo m
                inner join Menu m2 on m2.ModuloId = m.Id
                inner join Sistema s on s.Id = m.SistemaId 
                WHERE m.Id = @moduloId;
        `);  
        
        return toModuloDetalle(recordset)
    };

}


