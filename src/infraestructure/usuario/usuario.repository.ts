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
import { Int, Table, VarChar } from "mssql";
interface Inject {
	databasePool: DatabasePool;
}

export class UsuarioRepository implements IUsuarioRepository {
	private databasePool: DatabasePool;

	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}

	create = async (createDTO: CreateUsuarioDTO): Promise<OperationResult> => {
		const { apellidoMaterno, apellidoPaterno, correo, imagen, nombre, password, roles, tokenRecuperacion = null, unidadesOrganizacionalesId } = createDTO
		
		const rolesUsuarioTableType = new Table("RolesUsuarioTableType");
		rolesUsuarioTableType.columns.add("idRol", Int);
		rolesUsuarioTableType.columns.add("fechaAsignacion", Int);
		rolesUsuarioTableType.columns.add("expiracion", Int);

		roles.forEach(({idRol, fechaAsignacion, expiracion}) => {
			rolesUsuarioTableType.rows.add(idRol, fechaAsignacion, expiracion);
		});

		const unidadesOrganizativaUsuarioTableType = new Table("UnidadesOrganizativaUsuarioTableType")
		unidadesOrganizativaUsuarioTableType.columns.add("unidadesOrganizacionalesId",Int)
		unidadesOrganizacionalesId.forEach((id) => {
			unidadesOrganizativaUsuarioTableType.rows.add(id)
		})
		const request = await this.databasePool.getPool()

		request.input("apellidoMaterno", VarChar(100), apellidoMaterno)
			.input("apellidoPaterno", VarChar(100), apellidoPaterno)
			.input("correo", VarChar(100), correo)
			.input("imagen", VarChar(100), imagen)
			.input("nombre", VarChar(100), nombre)
			.input("password", VarChar(100), password)
			.input("tokenRecuperacion", VarChar(100), tokenRecuperacion)
			.input("roles", rolesUsuarioTableType)
			.input("unidadesOrganizacionales", unidadesOrganizativaUsuarioTableType)
			.query(`
				
			`)
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
