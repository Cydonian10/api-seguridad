import { DatabasePool } from "@src/data/init";
import { ConfigurateMenuDTO } from "@src/domain/menu/dtos/configurate-menu.dto";
import { CreateMenuDTO } from "@src/domain/menu/dtos/create-menu.dto";
import { FilterMenuDTO } from "@src/domain/menu/dtos/filter-menu.dto";
import { MostrarMenuDTO } from "@src/domain/menu/dtos/mostrar-menu.dto";
import { UpdateMenuDTO } from "@src/domain/menu/dtos/update-menu.dto";
import { Menu } from "@src/domain/menu/menu.model";
import { IMenuRepository } from "@src/domain/menu/menu.repository";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { Int, MAX, VarChar } from "mssql";

interface Inject {
    databasePool:DatabasePool
}

export class MenuRepository implements IMenuRepository {
    private databasePool: DatabasePool;
    constructor({ databasePool }:Inject) {
        this.databasePool = databasePool
    }
    create = async (createDTO: CreateMenuDTO) : Promise<OperationResult> => {
        const { icon, moduloId, titulo, url } = createDTO
        const request = await this.databasePool.getPool();

        const { recordset } = await request
            .input("moduloId", Int, moduloId)
            .input("titulo", VarChar(100), titulo)
            .input("icon", VarChar(50), icon )
            .input("url", VarChar(MAX), url )
            .query(`
                INSERT INTO prueba.dbo.Menu
                    (Titulo, Icon, Url, Estado, ModuloId)
                VALUES(@titulo,@icon,@url,1,@moduloId); 
                SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;               
            `)
        return toOperationResult(recordset[0]);
    };
    update = async (updateDTO: UpdateMenuDTO, menuId: number) : Promise<OperationResult> => {
        const { icon, titulo, url } = updateDTO
        const request = await this.databasePool.getPool();

        const { recordset } = await request
            .input("menuId", Int, menuId)
            .input("titulo", VarChar(100), titulo)
            .input("icon", VarChar(50), icon)
            .input("url", VarChar(MAX), url)
            .query(`
                UPDATE Menu SET
                    Titulo =  COALESCE(@titulo, Titulo)
                    Icon =  COALESCE(@icon, Icon)
                    Url =  COALESCE(@url, Url)
                WHERE Id = @menuId

                SELECT @menuId AS Id, 'Updated successful' AS Message;              
            `)
        return toOperationResult(recordset[0]);

    };
    getAll = (filterDTO: FilterMenuDTO) : Promise<Menu[]> => {
        throw new Error("Not implementation")
    };
    getOne = (moduloId: Menu["id"]) : Promise<Menu> => {
        throw new Error("Not implementation")
    };
    configurarMenu = async (configurarDTO: ConfigurateMenuDTO) : Promise<OperationResult> => {
        const { menuId, rolId } = configurarDTO
        const request = await this.databasePool.getPool();

        const { recordset } = await request
        .input("menuId", Int, menuId)
        .input("rolId", Int, rolId)
        .query<OperationResultRaw>(`
            DECLARE @configId INT

            SELECT @configId = Id  FROM ConfigMenuRol cmr
                WHERE MenuId = 1 and RolId = 1

            IF @configId IS NOT NULL
            BEGIN
                UPDATE ConfigMenuRol SET
                    Estado = CASE Estado WHEN 1 THEN 0 ELSE 1 END
                WHERE Id = @configId;
            END
            ELSE
            BEGIN
                INSERT ConfigMenuRol (MenuId, RolId, Estado)
                    VALUES (1, 1, 1);
            END
        `)
        return toOperationResult(recordset[0]);

    };
    mostrarMenu = async (mostrarMenuDTO: MostrarMenuDTO) : Promise<OperationResult> => {
        const { menuId, unidadOrganizativaId } = mostrarMenuDTO
        const request = await this.databasePool.getPool();

        const { recordset } = await request
            .input("menuId", Int, menuId)
            .input("unidadOrganizativaId", Int, unidadOrganizativaId)
            .query<OperationResultRaw>(`
            DECLARE @mostrarMenuId INT

            SELECT @mostrarMenuId = Id  FROM MostrarMenu mm 
                WHERE MenuId = 1 and UnidadOrganizacionalId = 1

            IF @mostrarMenuId IS NOT NULL
            BEGIN
                UPDATE MostrarMenu SET
                    Estado = CASE Estado WHEN 1 THEN 0 ELSE 1 END
                WHERE Id = @mostrarMenuId;
            END
            ELSE
            BEGIN
                INSERT MostrarMenu (MenuId, UnidadOrganizacionalId, Estado)
                    VALUES (1, 1, 1);
            END
        `)
        return toOperationResult(recordset[0]);
    };
}