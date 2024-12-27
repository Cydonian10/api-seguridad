import { IUsuarioRepository } from "@src/domain/usuario/usuario.repository";
import { DatabasePool } from "../../data/init";
import { OperationResult, OperationResultRaw, toOperationResult } from "@src/domain/operationResult/operationResult.model";
import { CreateUsuarioDTO } from "@src/domain/usuario/dtos/crear-usuario.dto";
import { FiltroUsuarioDTO } from "@src/domain/usuario/dtos/filtro-usuario.dto";
import {
	UpdateUsuarioDTO,
	UpsertUsuarioRolDTO,
	UpsertUnidadOrganizativaIdDTO,
} from "@src/domain/usuario/dtos/update-usuario.dto";
import { toUsuario, Usuario, UsuarioRawSql } from "@src/domain/usuario/usuario.model";
import { Bit, Date, Int, MAX, Table, VarChar } from "mssql";
interface Inject {
	databasePool: DatabasePool;
}

export class UsuarioRepository implements IUsuarioRepository {
	private databasePool: DatabasePool;

	constructor({ databasePool }: Inject) {
		this.databasePool = databasePool;
	}

	create = async (createDTO: CreateUsuarioDTO): Promise<OperationResult> => {
		console.log(createDTO);
		const { apellidoMaterno, apellidoPaterno, correo, imagen, nombre, password, roles, tokenRecuperacion = null, unidadesOrganizacionalesId } = createDTO
		
		const rolesUsuarioTableType = new Table("RolesUsuarioTableType");
		rolesUsuarioTableType.columns.add("idRol", Int);
		rolesUsuarioTableType.columns.add("fechaAsignacion", Date);
		rolesUsuarioTableType.columns.add("expiracion", Date);

		roles.forEach(({idRol, fechaAsignacion, expiracion}) => {
			rolesUsuarioTableType.rows.add(idRol, fechaAsignacion, expiracion);
		});

		const unidadesOrganizativaUsuarioTableType = new Table("UnidadesOrganizativaUsuarioTableType")
		unidadesOrganizativaUsuarioTableType.columns.add("unidadesOrganizacionalesId",Int)
		unidadesOrganizacionalesId.forEach((id) => {
			unidadesOrganizativaUsuarioTableType.rows.add(id)
		})

		const request = await this.databasePool.getPool()

		const { recordset } = await request.input("ApellidoMaterno", VarChar(50), apellidoMaterno)
			.input("ApellidoPaterno", VarChar(50), apellidoPaterno)
			.input("Correo", VarChar(255), correo)
			.input("Imagen", VarChar(MAX), imagen)
			.input("Nombre", VarChar(50), nombre)
			.input("Password", VarChar(100), password)
			.input("TokenRecuperacion", VarChar(100), tokenRecuperacion)
			.input("Roles", rolesUsuarioTableType)
			.input("Unidades", unidadesOrganizativaUsuarioTableType)
			.query<OperationResultRaw>(`
				-- Declaración de variables
				-- DECLARE @Roles RolesUsuarioTableType;
				-- DECLARE @Unidades UnidadOrganizacionalTableType;
				DECLARE @IdUsuario INT;

				-- Insertar un nuevo usuario
				INSERT INTO prueba.dbo.Usuario
				(Nombre, ApellidoMaterno, ApellidoPaterno, Correo, Password, Imagen, Estado, TokenRecuperacion)
				VALUES (@Nombre, @ApellidoMaterno, @ApellidoPaterno, @Correo, @Password, @Imagen, 1, NULL);

				-- Obtener el ID del usuario recién creado
				SET @IdUsuario = SCOPE_IDENTITY();

				-- Validar si hay roles y asignarlos al usuario
				IF EXISTS (SELECT 1 FROM @Roles)
				BEGIN
					INSERT INTO prueba.dbo.UsuarioRol
					(RolId, UsuarioId, FechaAsigancion, Expiracion, Estado)
					SELECT idRol, @IdUsuario, fechaAsignacion, expiracion, 1
					FROM @Roles;
				END
				-- Validar si hay unidades organizacionales y asignarlas al usuario
				IF EXISTS (SELECT 1 FROM @Unidades)
				BEGIN
					INSERT INTO prueba.dbo.UnidadOrganizacionalUsuario
					(UsuarioId, UnidadOrganizacionalId)
					SELECT @IdUsuario, unidadesOrganizacionalesId
					FROM @Unidades;
				END

				SELECT @IdUsuario as Id, 'Usuario insertado correctamente' AS Message;
			`)
		return toOperationResult(recordset[0])
	};
	update = async (updateDTO: UpdateUsuarioDTO, idUsuario: Usuario["id"]): Promise<OperationResult> => {
		const { apellidoMaterno, apellidoPaterno, correo, imagen, nombre, password, tokenRecuperacion = null } = updateDTO

		const request = await this.databasePool.getPool()

		const { recordset } = await request.input("apellidoMaterno", VarChar(50), apellidoMaterno)
			.input("ApellidoPaterno", VarChar(50), apellidoPaterno)
			.input("Correo", VarChar(255), correo)
			.input("Imagen", VarChar(MAX), imagen)
			.input("Nombre", VarChar(50), nombre)
			.input("Password", VarChar(100), password)
			.input("IdUsuario", Int, idUsuario)
			.input("TokenRecuperacion", VarChar(MAX), tokenRecuperacion)
			.query<OperationResultRaw>(`
				UPDATE prueba.dbo.Usuario
				SET Nombre = COALESCE(@Nombre, Nombre),
					ApellidoMaterno = COALESCE(@ApellidoMaterno, ApellidoMaterno), 
					ApellidoPaterno = COALESCE(@ApellidoPaterno, ApellidoPaterno), 
					Correo = COALESCE(@Correo, Correo), 
					Password = COALESCE(@Password, Password), 
					Imagen = COALESCE(@Imagen, Imagen),  
					TokenRecuperacion = ISNULL(@TokenRecuperacion, TokenRecuperacion)
				WHERE Id=@IdUsuario;

				SELECT @IdUsuario AS Id, 'Updated successful' AS Message;
			`)

		return toOperationResult(recordset[0])
	};
	delete = (idUsuario: Usuario["id"]): Promise<OperationResult> => {
		throw new Error("Not implementent");
	};
	upsertRoles = async (upsertDTO: UpsertUsuarioRolDTO): Promise<OperationResult> => {
		const { expiracion,fechaAsignacion,idRol, idUsuario,estado } = upsertDTO
		
		const request = await this.databasePool.getPool()
		const { recordset } = await request
			.input("Expiracion", Date, expiracion)
			.input("FechaAsignacion", Date, fechaAsignacion)
			.input("IdRol", Int, idRol)
			.input("Estado", Bit, estado)
			.input("IdUsuario", Int, idUsuario)
			.query<OperationResultRaw>(`
				DECLARE @UsuarioRolId INT;

				SELECT * FROM UsuarioRol WHERE UsuarioId = @IdUsuario AND RolId = @IdRol

				IF @UsuarioRolId IS NOT NULL
						begin
					UPDATE prueba.dbo.UsuarioRol
						SET
							FechaAsigancion = COALESCE(@FechaAsignacion, FechaAsigancion),
							Expiracion = COALESCE(@Expiracion, Expiracion),
							Estado = COALESCE(@Estado, Estado)
					WHERE Id = @UsuarioRolId;
						end
				else
					BEGIN
					INSERT INTO prueba.dbo.UsuarioRol
						(RolId, UsuarioId, FechaAsigancion, Expiracion, Estado)
					VALUES(@IdRol, @UsuarioId, @FechaAsignacion, @Expiracion, 1);
					END	
			    SELECT @IdUsuario AS Id, 'Se agrego rol satisfactoriamente' AS Message;
			`)
		
        return toOperationResult(recordset[0])
	};

	upsertUnidadesOrganizativas = async (upsertDTO: UpsertUnidadOrganizativaIdDTO): Promise<OperationResult> => {
		const { idUsuario,unidadOrganizativaId } = upsertDTO
		const request = await this.databasePool.getPool()
		const { recordset } = await request
			.input("IdUsuario", Int, idUsuario)
			.input("IdUnidadOrganizativa", Int, unidadOrganizativaId).query<OperationResultRaw>(`
				DECLARE @UsuarioUnidadId INT;

					SELECT @UsuarioUnidadId = Id FROM UnidadOrganizacionalUsuario 
						WHERE UsuarioId = @IdUsuario AND UnidadOrganizacionalId = @IdUnidadOrganizativa
						
					IF @UsuarioUnidadId IS NOT NULL
					BEGIN
						SELECT 1 AS Result, 'Usuario ya tiene unidad organizativa' AS Message; 
						RETURN;
					END

					INSERT INTO UnidadOrganizacionalUsuario (UsuarioId, UnidadOrganizacionalId)
						VALUES (@IdUsuario , @IdUnidadOrganizativa)

					SELECT SCOPE_IDENTITY() AS Id, 'Unidad Organizativa Agregado correctamente' as Message, 0 as Result 
			`);

			return toOperationResult(recordset[0])

	};
	getAll = async (filtroDTO: FiltroUsuarioDTO): Promise<Usuario[]> => {
		const { unidadOrganizativas , roles } = filtroDTO
		
		const request = await this.databasePool.getPool()

		const unidadesOrganizativaUsuarioTableType = new Table("UnidadOrganizacionalIdTableType");
		unidadesOrganizativaUsuarioTableType.columns.add("Id", Int)
		unidadOrganizativas!.forEach((id) => {
			unidadesOrganizativaUsuarioTableType.rows.add(+id)
		})

		const roleIdUsuarioTableType = new Table("RolesIdTableType");
		roleIdUsuarioTableType.columns.add("Id", Int)
		roles!.forEach((id) => {
			roleIdUsuarioTableType.rows.add(+id)
		})
		

		const { recordset } = await request
			.input("Unidades", unidadesOrganizativaUsuarioTableType)
			.input("Roles", roleIdUsuarioTableType).query<UsuarioRawSql>(`
				SELECT 	
					u.id id,
					u.Nombre nombre,
					u.ApellidoMaterno  apellidoMaterno,
					u.ApellidoPaterno  apellidoPaterno,
					u.Correo  correo,
					u.Password password,
					u.Imagen imagen,
					u.TokenRecuperacion token,
					uo.Id idUnidadOrganizacional,
					uo.Nombre unidadOrganizacional,
					uo.Abreviatura unidadOrganizacionAbreviatura,
					COUNT(r.Id) cantidadRoles
				FROM Usuario u
					inner join UnidadOrganizacionalUsuario uou on uou.UsuarioId = u.Id 
					inner join UnidadOrganizacional uo on uo.Id  = uou.UnidadOrganizacionalId 
					inner join UsuarioRol ur on ur.UsuarioId  = u.Id 
					inner join Rol r on ur.RolId = r.Id 
   				WHERE 
					(NOT EXISTS (SELECT 1 FROM @Unidades) OR uou.UnidadOrganizacionalId IN (SELECT Id FROM @Unidades)) AND
    			(NOT EXISTS (SELECT 1 FROM @Roles) OR r.Id IN (SELECT Id FROM @Roles))
				GROUP BY u.id,
					u.Nombre,
					u.ApellidoMaterno,
					u.ApellidoPaterno,
					u.Correo,
					u.Password,
					u.Imagen,
					u.TokenRecuperacion,
					uo.Id,
					uo.Nombre,
					uo.Abreviatura;
			`);
		return toUsuario(recordset)
	};
	detalle = (): Promise<Usuario> => {
		throw new Error("Not implementent");
	};
}
