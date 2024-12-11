import { OperationResult } from "../operationResult/operationResult.model"
import { CreateModuloDTO } from "./dtos/create-modulo.dto"
import { UpdateModuloDTO } from "./dtos/update-modulo.dto"
import { Modulo } from "./modulo.model"


export interface IModuloRepository {
    create: (createDTO: CreateModuloDTO) => OperationResult
    update: (updateDTO: UpdateModuloDTO) => OperationResult
    getAll: () => Promise<Modulo[]>
    getOne: (moduloId: Modulo['id']) => Modulo
}