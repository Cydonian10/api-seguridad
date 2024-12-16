import { IUsuarioRepository } from "@src/domain/usuario/usuario.repository";
import { DatabasePool } from "../../data/init";
import { OperationResult } from "@src/domain/operationResult/operationResult.model";
import { CreateUsuarioDTO } from "@src/domain/usuario/dtos/crear-usuario.dto";
import { FiltroUsuarioDTO } from "@src/domain/usuario/dtos/filtro-usuario.dto";
import {
	UpdateUsuarioDTO,
	UpsertUsuarioRolDTO,
	UpsertUnidadOrganizativaIdDTO,
} from "@src/domain/usuario/dtos/update-usuario.dto";
import { Usuario } from "@src/domain/usuario/usuario.model";
interface Inject {
	databasePool: DatabasePool;
}

export class UsuarioRepository implements IUsuarioRepository {
	private databasePool: DatabasePool;

	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}

	create = (createDTO: CreateUsuarioDTO): Promise<OperationResult> => {
		throw new Error("Not implementent");
	};
	update = (updateDTO: UpdateUsuarioDTO): Promise<OperationResult> => {
		throw new Error("Not implementent");
	};
	delete = (idUsuario: Usuario["id"]): Promise<OperationResult> => {
		throw new Error("Not implementent");
	};
	upsertRoles = (upsertDTO: UpsertUsuarioRolDTO): Promise<OperationResult> => {
		throw new Error("Not implementent");
	};
	upsertUnidadesOrganizativas = (upsertDTO: UpsertUnidadOrganizativaIdDTO): Promise<OperationResult> => {
		throw new Error("Not implementent");
	};
	getAll = (filtroDTO: FiltroUsuarioDTO): Promise<Usuario> => {
		throw new Error("Not implementent");
	};
	detalle = (): Promise<Usuario> => {
		throw new Error("Not implementent");
	};
}
