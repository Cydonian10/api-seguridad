export interface CreateUsuarioDTO {
	nombre: string;
	apellidoMaterno: string;
	apellidoPaterno: string;
	correo: string;
	password: string;
	imagen: string | null;
	tokenRecuperacion: string | null;

	roles: {
		idRol: number;
		fechaAsignacion: Date;
		expiracion: Date;
	}[];
	unidadesOrganizacionalesId: number[];
}
