import { OperationResult } from "../operationResult/operationResult.model"
import { Sistema } from "../sistema/sistema.model"
import { CreateModuloDTO } from "./dtos/create-modulo.dto"
import { UpdateModuloDTO } from "./dtos/update-modulo.dto"


export interface IModuloRepository {
    create: (createDTO: CreateModuloDTO) => OperationResult
    update: (updateDTO: UpdateModuloDTO) => OperationResult
    getAll: () => Sistema[]
    getOne: (rolId: Sistema['id']) => Sistema
}