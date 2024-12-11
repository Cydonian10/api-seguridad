import { OperationResult } from "../operationResult/operationResult.model";
import { UnidadOrganizacional } from "../unidadOrganizacional/unidadOrganizacional.model";
import { CreateSistemaDTO } from "./dtos/create-sistema.dto";
import { UpdateSistemaDTO } from "./dtos/update-sistema.dto";
import { SistemaDetalle } from "./models/sistema-detalle.model";
import { Sistema } from "./models/sistema.model";

export interface ISistemaRepository {
	create: (createDTO: CreateSistemaDTO) => Promise<OperationResult>;
	update: (updateDto: UpdateSistemaDTO, sistemaId: Sistema["id"]) => Promise<OperationResult>;
	eliminarUnidadOrganizacionDeSistema: (
		sistemaId: Sistema["id"],
		unidadOrganizacionalId: UnidadOrganizacional["id"]
	) => Promise<OperationResult>;
	addUnidadOrganizativaASistema: (
		sistemaId: Sistema["id"],
		unidadOrganizacionalId: UnidadOrganizacional["id"]
	) => Promise<OperationResult>;
	getAll: () => Promise<Sistema[]>;
	getOne: (rolId: number) => Promise<SistemaDetalle>;
}
