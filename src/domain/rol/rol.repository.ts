import { OperationResult } from "../operationResult/operationResult.model";
import { CreateConfigRolDTO, UpdateConfigRolDTO } from "./dtos/config-rol-menu.dto";
import { CreateConfigRolPermisoDTO, UpdateConfigRolPermisoDTO } from "./dtos/config-rol-permiso.dto";
import { CreateRolDTO } from "./dtos/create-rol.dto";
import { UpdateRolDTO } from "./dtos/update-rol.dto";
import { Rol } from "./rol.model";

export interface IRolRepository {
    create: (createDTO: CreateRolDTO) => OperationResult
    update: (updateDto: UpdateRolDTO) => OperationResult
    getAll: () => Rol[]
    getOne: (rolId: number) => Rol
    configurarRolMenu: (createConfig: CreateConfigRolDTO) => OperationResult
    updateConfigurarRolMenu: (updateConfig: UpdateConfigRolDTO) => OperationResult
    configurarRolPermiso: (createConfig: CreateConfigRolPermisoDTO) => OperationResult
    updateconfigurarRolPermiso: (updateConfig: UpdateConfigRolPermisoDTO) => OperationResult
}