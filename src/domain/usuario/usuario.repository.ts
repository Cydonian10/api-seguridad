import { OperationResult } from "../operationResult/operationResult.model";
import { CreateUsuarioDTO } from "./dtos/crear-usuario.dto";
import { FiltroUsuarioDTO } from "./dtos/filtro-usuario.dto";
import { UpdateUsuarioDTO, UpsertUnidadOrganizativaIdDTO, UpsertUsuarioRolDTO } from "./dtos/update-usuario.dto";
import { Usuario } from "./usuario.model";

export interface IUsuarioRepository {
	create: (createDTO: CreateUsuarioDTO) => Promise<OperationResult>;
	update: (updateDTO: UpdateUsuarioDTO, usuarioId: Usuario["id"]) => Promise<OperationResult>;
	delete: (idUsuario: Usuario["id"]) => Promise<OperationResult>;
	upsertRoles: (upsertDTO: UpsertUsuarioRolDTO) => Promise<OperationResult>;
	upsertUnidadesOrganizativas: (upsertDTO: UpsertUnidadOrganizativaIdDTO) => Promise<OperationResult>;
  getAll: (filtroDTO: FiltroUsuarioDTO) => Promise<Usuario[]>
  detalle: () => Promise<Usuario>
}
