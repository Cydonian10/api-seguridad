export interface UpdateUsuarioDTO {
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correo: string;
	password: string;
	imagen: string | null;
	tokenRecuperacion: string | null;
}

export interface UpsertUsuarioRolDTO {
	idUsuario: number,
	idRol: number;
	fechaAsignacion: Date;
	expiracion: Date;
}

export interface UpsertUnidadOrganizativaIdDTO {
  idUsuario: number,
  unidadOrganizativaId: number
}