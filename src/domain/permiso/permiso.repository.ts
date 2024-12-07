import { OperationResult } from "../operationResult/operationResult.model"
import { CreatePermisoDto } from "./dtos/create-permiso.dto"
import { UpdatePermisoDto } from "./dtos/update-permiso.dto"
import { Permiso } from "./permiso.model"

export interface IPermisoRepository {
    create: (createDTO: CreatePermisoDto) => Promise<OperationResult>
    delete: (id: Permiso["id"]) => Promise<OperationResult>
    update: (updateDTO: UpdatePermisoDto,id: Permiso["id"]) => Promise<OperationResult>
    getAll: () => Promise<Permiso[]>
    getOne: (rolId: Permiso['id']) => Promise<Permiso>
}