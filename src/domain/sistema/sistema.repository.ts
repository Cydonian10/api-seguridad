import { OperationResult } from "../operationResult/operationResult.model"
import { CreateUnidadOrganizacionDTO } from "../unidadOrganizacional/dtos/create-unidadOrganizacional.dto"
import { UnidadOrganizacional } from "../unidadOrganizacional/unidadOrganizacional.model"
import { UpdateSistemaDTO } from "./dtos/update-sistema.dto"
import { Sistema } from "./sistema.model"

export interface IRolRepository {
    create: (createDTO: CreateUnidadOrganizacionDTO) => OperationResult
    update: (updateDto: UpdateSistemaDTO) => OperationResult
    eliminarUnidadOrganizacionDeSistema: (sistemaId: Sistema["id"], unidadOrganizacionalId: UnidadOrganizacional["id"]) => OperationResult
    addUnidadOrganizativaASistema: (sistemaId: Sistema["id"], unidadOrganizacionalId: UnidadOrganizacional["id"]) => OperationResult
    getAll: () => Sistema[]
    getOne: (rolId: number) => Sistema
}