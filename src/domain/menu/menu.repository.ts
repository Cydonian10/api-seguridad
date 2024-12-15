import { OperationResult } from "../operationResult/operationResult.model"
import { ConfigurateMenuDTO } from "./dtos/configurate-menu.dto"
import { CreateMenuDTO } from "./dtos/create-menu.dto"
import { FilterMenuDTO } from "./dtos/filter-menu.dto"
import { MostrarMenuDTO } from "./dtos/mostrar-menu.dto"
import { UpdateMenuDTO } from "./dtos/update-menu.dto"
import { Menu } from "./menu.model"

export interface IMenuRepository {
	create: (createDTO: CreateMenuDTO) => Promise<OperationResult>;
	update: (updateDTO: UpdateMenuDTO, moduloId: number) => Promise<OperationResult>;
	getAll: (filterDTO: FilterMenuDTO) => Promise<Menu[]>;
	getOne: (moduloId: Menu["id"]) => Promise<Menu>;

	configurarMenuRol: (configurarDTO: ConfigurateMenuDTO) => Promise<OperationResult>;
	configurarMostrarMenu: (mostrarMenuDTO: MostrarMenuDTO) => Promise<OperationResult>;

	getMenuRol: (moduloId: number, rolId: number) => Promise<Menu[]>;
	getMostrarMenuUnidadOrganizacional: (moduloId: number, unidadOrganizacionalId: number) => Promise<Menu[]>;
}