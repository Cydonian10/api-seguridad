import { DatabasePool } from "@src/data/init";
import { ConfigurateMenuDTO } from "@src/domain/menu/dtos/configurate-menu.dto";
import { CreateMenuDTO } from "@src/domain/menu/dtos/create-menu.dto";
import { FilterMenuDTO } from "@src/domain/menu/dtos/filter-menu.dto";
import { MostrarMenuDTO } from "@src/domain/menu/dtos/mostrar-menu.dto";
import { UpdateMenuDTO } from "@src/domain/menu/dtos/update-menu.dto";
import { Menu, MenuRawSql, MenuRolRawSql, MenuUnidadOrganizativaRawSql, toMenu, toMenuRol, toMenuUnidadOrganizativa } from "@src/domain/menu/menu.model";
import { IMenuRepository } from "@src/domain/menu/menu.repository";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { Int, MAX, VarChar } from "mssql";

interface Inject {
	databasePool: DatabasePool;
}

export class MenuRepository implements IMenuRepository {
	private databasePool: DatabasePool;
	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}

	create = async (createDTO: CreateMenuDTO): Promise<OperationResult> => {
		const { icon, moduloId, titulo, url } = createDTO;
		const request = await this.databasePool.getPool();

		const { recordset } = await request
			.input("moduloId", Int, moduloId)
			.input("titulo", VarChar(100), titulo)
			.input("icon", VarChar(50), icon)
			.input("url", VarChar(MAX), url).query(`
                INSERT INTO prueba.dbo.Menu
                    (Titulo, Icon, Url, Estado, ModuloId)
                VALUES(@titulo,@icon,@url,1,@moduloId); 
                SELECT SCOPE_IDENTITY() AS Id, 'Insert successful' AS Message;               
            `);
		return toOperationResult(recordset[0]);
	};
	update = async (updateDTO: UpdateMenuDTO, menuId: number): Promise<OperationResult> => {
		console.log(updateDTO);
		const { icon, titulo, url } = updateDTO;
		const request = await this.databasePool.getPool();

		const { recordset } = await request
			.input("menuId", Int, menuId)
			.input("titulo", VarChar(100), titulo)
			.input("icon", VarChar(50), icon)
			.input("url", VarChar(MAX), url).query(`
                UPDATE Menu SET
                    Titulo =  COALESCE(@titulo, Titulo),
                    [Icon] =  COALESCE(@icon, [Icon]),
                    Url =  COALESCE(@url, Url)
                WHERE Id = @menuId

                SELECT @menuId AS Id, 'Updated successful' AS Message;              
            `);
		return toOperationResult(recordset[0]);
	};
	getAll = async (filterDTO: FilterMenuDTO): Promise<Menu[]> => {
		const { icon, moduloId, titulo } = filterDTO
		const request = await this.databasePool.getPool();
		const { recordset } = await request
			.input("icon", VarChar(50), icon)
			.input("titulo", VarChar(100), titulo)
			.input("moduloId", Int, moduloId).query<MenuRawSql>(`
					SELECT Id id, Icon icon, Titulo titulo, Url url FROM	Menu
						WHERE 
							 (@icon IS NULL OR Icon = @icon) AND
							 (@titulo IS NULL OR Titulo = @titulo) AND
							 (@moduloId IS NULL OR ModuloId = @moduloId);
			`);
		return recordset.map((rawSql) => toMenu(rawSql))
	};

	getOne = async (menuId: Menu["id"]): Promise<Menu> => {
		const request = await this.databasePool.getPool();
		const { recordset } = await request
		.input("menuId", Int, menuId).query<MenuRawSql>(`
					SELECT Id id, Icon icon, Titulo titulo, Url url FROM	Menu
						WHERE id = @menuId					 
		`);
		return toMenu(recordset[0]);
	};

	configurarMenuRol = async (configurarDTO: ConfigurateMenuDTO): Promise<OperationResult> => {
		const { menuId, rolId } = configurarDTO;
		const request = await this.databasePool.getPool();

		const { recordset } = await request.input("menuId", Int, menuId).input("rolId", Int, rolId).query<OperationResultRaw>(`
            DECLARE @configId INT

            SELECT @configId = Id  FROM ConfigMenuRol cmr
                WHERE MenuId = @menuId and RolId = @rolId

            IF @configId IS NOT NULL
            BEGIN
                UPDATE ConfigMenuRol SET
                    Activo = CASE Activo WHEN 1 THEN 0 ELSE 1 END
                WHERE Id = @configId;
								SELECT @menuId AS Id, 'Se cambio el estado de menu para rol' AS Message;
            END
            ELSE
            BEGIN
                INSERT ConfigMenuRol (MenuId, RolId, Estado,Activo)
                    VALUES (@menuId, @rolId, 1, 1);
								SELECT @menuId AS Id, 'Se agrego menu para rol' AS Message;
            END
        `);
		return toOperationResult(recordset[0]);
	};

	configurarMostrarMenu = async (mostrarMenuDTO: MostrarMenuDTO): Promise<OperationResult> => {
		const { menuId, unidadOrganizativaId } = mostrarMenuDTO;
		const request = await this.databasePool.getPool();

		const { recordset } = await request.input("menuId", Int, menuId).input("unidadOrganizativaId", Int, unidadOrganizativaId)
			.query<OperationResultRaw>(`
            DECLARE @mostrarMenuId INT

            SELECT @mostrarMenuId = Id  FROM MostrarMenu mm 
                WHERE MenuId = @menuId and UnidadOrganizacionalId = @unidadOrganizativaId

            IF @mostrarMenuId IS NOT NULL
            BEGIN
                UPDATE MostrarMenu SET
                    Estado = CASE Estado WHEN 1 THEN 0 ELSE 1 END
                WHERE Id = @mostrarMenuId;
								SELECT @menuId AS Id, 'Se cambio el estado de menu para Unidad Orga.' AS Message;
            END
            ELSE
            BEGIN
                INSERT MostrarMenu (MenuId, UnidadOrganizacionalId, Estado)
                    VALUES (@menuId, @unidadOrganizativaId, 1);
								SELECT @menuId AS Id, 'Se agrego menu para Unidad Orga.' AS Message;
            END
        `);
		return toOperationResult(recordset[0]);
	};

	getMenuRol = async (moduloId: number, rolId: number): Promise<Menu[]> => {
		const request = await this.databasePool.getPool();
		const { recordset } = await request.input("moduloId", Int, moduloId).input("rolId", Int, rolId).query<MenuRolRawSql>(`
				SELECT 
					m.id id,
					m.titulo titulo,
					m.Icon icon,
					m.url url,
					r.Id rolId

				FROM Menu m 
					inner join Modulo m2 on m.ModuloId  = m2.Id
					left JOIN ConfigMenuRol cmr on cmr.MenuId  = m.Id 
					left JOIN Rol r on r.Id  = cmr.RolId 
				WHERE m2.Id = @moduloId AND (r.Id = @rolId OR r.Id IS NULL);
		`);

		return recordset.map((rawSql) => toMenuRol(rawSql))
	};
	getMostrarMenuUnidadOrganizacional = async (moduloId: number, unidadOrganizacionalId: number): Promise<Menu[]> => {
		const request = await this.databasePool.getPool();
		const { recordset } = await request
			.input("moduloId", Int, moduloId)
			.input("unidadOrganizacionalId", Int, unidadOrganizacionalId).query<MenuUnidadOrganizativaRawSql>(`
				SELECT 
					m.Id id,
					m.Titulo titulo,
					m.Icon icon,
					m.Url url,
					uo.Id unidadOrganizativaId
				FROM  Menu m
					inner join Modulo m2 on m.ModuloId = m2.Id  
					LEFT  JOIN MostrarMenu mm on mm.MenuId = m.Id
					LEFT  JOIN UnidadOrganizacional uo on uo.Id = mm.UnidadOrganizacionalId 
				WHERE m2.Id = @moduloId AND (uo.Id = @unidadOrganizacionalId or uo.Id is NULL)
		`);
		return recordset.map((rawSql) => toMenuUnidadOrganizativa(rawSql));
	};
}
