import { OperationResult } from "../operationResult/operationResult.model"
import { CreatePermisoDto } from "./dtos/create-permiso.dto"
import { Permiso } from "./permiso.model"

export interface IPermisoRepository {
    create: (createDTO: CreatePermisoDto) => Promise<OperationResult>
    update: () => OperationResult
    getAll: () => Promise<Permiso[]>
    getOne: (rolId: Permiso['id']) => Promise<Permiso>
}