import { OperationResult } from "../operationResult/operationResult.model"
import { CreateModuloDTO } from "./dtos/create-modulo.dto"
import { FilterModuloDTO } from "./dtos/filter-modulo.dto"
import { UpdateModuloDTO } from "./dtos/update-modulo.dto"
import { Modulo } from "./modulo.model"


export interface IModuloRepository {
    create: (createDTO: CreateModuloDTO) => Promise<OperationResult>
    update: (updateDTO: UpdateModuloDTO) => Promise<OperationResult>
    getAll: (filterDTO: FilterModuloDTO) => Promise<Modulo[]>
    getOne: (moduloId: Modulo['id']) => Promise<Modulo>
}