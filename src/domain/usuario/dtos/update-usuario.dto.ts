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
	idRol: number;
	fechaAsignacion: Date;
	expiracion: Date;
}

export interface UpsertUnidadOrganizativaIdDTO {
  unidadOrganizativaId: number
}