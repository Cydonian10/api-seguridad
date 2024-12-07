import { OperationResult } from "../operationResult/operationResult.model"
import { ConfigUnidadOrganizacionalMenu } from "./dtos/config-unidadOrganizacional-menu.dto"
import { CreateUnidadOrganizacionDTO } from "./dtos/create-unidadOrganizacional.dto"
import { UpdateUnidadOrganizacionDTO } from "./dtos/update-unidadOrganizacional.dto"
import { UnidadOrganizacional } from "./unidadOrganizacional.model"

export interface IUnidadOrganizacionalRepository {
    create: (createDTO: CreateUnidadOrganizacionDTO) => OperationResult
    update: (updateDto: UpdateUnidadOrganizacionDTO) => OperationResult
    getAll: () => UnidadOrganizacional[]
    getOne: (rolId: UnidadOrganizacional['id']) => UnidadOrganizacional
    addMenuShow: ( configDto: ConfigUnidadOrganizacionalMenu ) => OperationResult
}   